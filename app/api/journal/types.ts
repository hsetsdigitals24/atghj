export interface Author {
  name: string;
  orcid?: string;
  affiliation?: string;
  email?: string;
  isCorresponding?: boolean;
}

export interface Issue {
  id: string;
  volume: number;
  issue: number;
  date: string;
  coverImage?: {
    en: string;
  };
  articleCount: number;
  articles: Article[];
  description?: string;
  specialIssue?: boolean;
  specialIssueTitle?: string;
}

export interface Volume {
  volume: number;
  year: number;
  issues: Issue[];
}

export interface EditorialMember {
  name: string;
  role: string;
  affiliation: string;
  country: string;
  orcid?: string;
  profileImage?: string;
  bio?: string;
}

export interface Masthead {
  editorInChief: EditorialMember[];
  associateEditors: EditorialMember[];
  sectionEditors: EditorialMember[];
  editorialBoard: EditorialMember[];
  managingEditor: EditorialMember[];
  technicalEditor: EditorialMember[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  expiryDate?: string;
}

export interface JournalData { 
  latestIssue: Issue | null;
  featuredArticles: Article[];
  // masthead: Masthead;
  // announcements: Announcement[];
  stats: {
    totalVolumes: number;
    totalIssues: number;
    totalArticles: number;
    yearRange: {
      start: number;
      end: number;
    };
  };
}


export interface OJSIssue {
  id: number;
  title: string;
  description: string;
  volume: number;
  number: string;
  year: number;
  datePublished: string;
  coverImageUrl: string | null;
}

export interface OJSResponse<T> {
  items: T[];
  itemsMax: number;
}

export interface CurrentIssueResponse {
  items: OJSIssue[];
  itemsMax: number;
}
export interface OJSSubmission {
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

export interface OJSAnnouncement {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  dateExpire: string | null;
}

export interface OJSUser {
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

export interface LocalizedString {
  en: string;
  [key: string]: string;
}

export interface Article {
  id: number;
  title: LocalizedString;
  authorsString: string;
  datePublished: string;
  urlPublished: string;
  status: number;
  statusLabel: string;
}

export interface Section {
  id: number;
  title: LocalizedString;
  abbrev: LocalizedString;
  sequence: number;
}

export interface LatestIssueProps {
  id: number;
  volume: number;
  number: string;
  year: number;
  title: LocalizedString;
  description: LocalizedString;
  datePublished: string;
  coverImage: LocalizedString;
  coverImageUrl: LocalizedString;
  coverImageAltText: LocalizedString;
  identification: string;
  publishedUrl: string;
  articles: Article[];
  sections: Section[];
  published?: boolean; 
}