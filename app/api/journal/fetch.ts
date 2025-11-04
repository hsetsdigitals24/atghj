import { JournalData, Masthead, Article, Author } from './types';

interface OJSResponse<T> {
  items: T[];
  itemsMax: number;
}

// Exported wrapper used by other modules
export async function fetchJournalData(): Promise<JournalData> {
  return await fetchOJSData();
}

interface OJSIssue {
  id: number;
  title: string;
  description: string;
  volume: number;
  number: string;
  year: number;
  datePublished: string;
  coverImageUrl: string | null;
}

interface OJSSubmission {
  id: number;
  title: string;
  abstract: string;
  publications?: {
    authors?: Array<{
      fullName: string;
      orcid: string | null;
      affiliation: string;
    }>;
  };
  doi: string;
  datePublished: string;
  issue?: {
    id: number;
    volume: number;
    number: string;
  };
  sectionId?: number;
}

interface OJSAnnouncement {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  dateExpire: string | null;
}

interface OJSUser {
  id: number;
  fullName: string;
  email: string;
  userGroups?: Array<{
    id: number;
    name: string;
    roleId: number;
  }>;
  affiliation: string;
  country: string;
  orcid: string | null;
}

// Helper function to transform OJS issue and submission data to our volume format
function transformToVolumes(issues: OJSIssue[], submissions: OJSSubmission[]) {
  const volumeMap = new Map();

  // Group issues by volume
  issues.forEach(issue => {
    if (!volumeMap.has(issue.volume)) {
      volumeMap.set(issue.volume, {
        volume: issue.volume,
        year: issue.year,
        issues: []
      });
    }

    const issueArticles = submissions.filter(sub => sub.issue?.id === issue.id);
    
    volumeMap.get(issue.volume).issues.push({
      id: issue.id.toString(),
      volume: issue.volume,
      issue: parseInt(issue.number),
      date: issue.datePublished,
      coverImage: issue.coverImageUrl || '/images/default-cover.jpg',
      articleCount: issueArticles.length,
      articles: issueArticles.map(transformSubmissionToArticle)
    });
  });

  return Array.from(volumeMap.values());
}

function transformSubmissionToArticle(submission: OJSSubmission): Article {
  return {
    id: submission.id.toString(),
    title: submission.title,
    authors: submission.publications?.authors?.map(author => ({
      name: author.fullName,
      orcid: author.orcid || undefined,
      affiliation: author.affiliation,
      email: undefined,
      isCorresponding: false
    })) || [],
    abstract: submission.abstract,
    doi: submission.doi,
    publicationDate: submission.datePublished,
    manuscriptType: submission.sectionId?.toString() || 'undefined',
    volume: submission.issue?.volume || 0,
    issue: submission.issue ? parseInt(submission.issue.number) : 0,
    pageRange: undefined,
    imageUrl: undefined,
    pdfUrl: undefined,
    fundingInfo: undefined,
    conflictOfInterest: undefined,
    ethicalApproval: undefined
  };
}

function transformToMasthead(users: OJSUser[]): Masthead {
  const masthead: Masthead = {
    editorInChief: [],
    associateEditors: [],
    sectionEditors: [],
    editorialBoard: [],
    managingEditor: [],
    technicalEditor: []
  };

  const roleMap: { [key: number]: keyof Masthead } = {
    14: 'editorInChief',
    15: 'associateEditors',
    16: 'editorialBoard'
  };

  users.forEach(user => {
    if (!user.userGroups || user.userGroups.length === 0) return;
    
    const userRole = user.userGroups[0].roleId;
    const role = roleMap[userRole];
    
    if (role) {
      masthead[role].push({
        name: user.fullName,
        role: user.userGroups[0].name,
        affiliation: user.affiliation,
        country: user.country,
        orcid: user.orcid || undefined
      });
    }
  });

  return masthead;
}

/**
 * Fetches journal data from the OJS backend
 * @returns Promise<JournalData>
 */
// Direct OJS API calls
async function fetchOJSData() {
  const baseUrl = process.env.NEXT_PUBLIC_OJS_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('OJS API configuration is missing');
  }

  // Add apiToken to all URLs
  const apiUrls = {
    issues: `${baseUrl}/issues?isPublished=true&count=100&apiToken=${apiKey}`,
    submissions: `${baseUrl}/submissions?status=3&count=100&apiToken=${apiKey}`,
    announcements: `${baseUrl}/announcements?apiToken=${apiKey}`,
    users: `${baseUrl}/users?userGroupIds[]=14,15,16&apiToken=${apiKey}`
  };

  try {
    // Fetch data in parallel
    const [issuesRes, submissionsRes, announcementsRes, usersRes] = await Promise.all([
      fetch(apiUrls.issues, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }),
      fetch(apiUrls.submissions, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }),
      fetch(apiUrls.announcements, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }),
      fetch(apiUrls.users, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } })
    ]);

    if (!issuesRes.ok || !submissionsRes.ok || !announcementsRes.ok || !usersRes.ok) {
      throw new Error('One or more API requests failed');
    }

    // Parse responses as OJS-style objects { items: [...], itemsMax: number }
    const issuesJson = await issuesRes.json() as OJSResponse<OJSIssue>;
    const submissionsJson = await submissionsRes.json() as OJSResponse<OJSSubmission>;
    const announcementsJson = await announcementsRes.json() as OJSResponse<OJSAnnouncement>;
    const usersJson = await usersRes.json() as OJSResponse<OJSUser>;

    const issues: OJSIssue[] = issuesJson.items;
    const submissions: OJSSubmission[] = submissionsJson.items;
    const announcements: OJSAnnouncement[] = announcementsJson.items;
    const users: OJSUser[] = usersJson.items;

    // console.log({"issues": issues, "submissions": submissions, "announcements": announcements, "users": users});
    // Transform the data
    const volumes = transformToVolumes(issues, submissions);
    const latestIssue = volumes[0]?.issues[0] || null;
    const featuredArticles = submissions
      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
      .slice(0, 3)
      .map(transformSubmissionToArticle);

    // Get unique years from issues
    const years = [...new Set(issues.map(issue => issue.year))];

    return {
      volumes,
      latestIssue,
      featuredArticles,
      masthead: transformToMasthead(users),
      announcements: announcements.map(a => ({
        id: a.id.toString(),
        title: a.title,
        content: a.description,
        date: a.datePosted,
        expiryDate: a.dateExpire || undefined
      })),
      stats: {
        totalVolumes: volumes.length,
        totalIssues: issues.length,
        totalArticles: submissions.length,
        yearRange: {
          start: Math.min(...years),
          end: Math.max(...years)
        }
      }
    };

  } catch (error) {
    console.error('Error fetching journal data:', error);
    throw error;
  }
}