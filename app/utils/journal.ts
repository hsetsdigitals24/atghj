import { JournalData, Article, Volume, Issue, Masthead, Announcement } from '../api/journal/types';
import { fetchJournalData } from '../api/journal/fetch';

/**
 * Fetches all journal data from the API
 * @returns Promise<JournalData>
 * @throws Error if the fetch fails
 */
export async function getJournalData(): Promise<JournalData> {
  try {
    return await fetchJournalData();
  } catch (error) {
    console.error('Error fetching journal data:', error);
    throw new Error('Failed to fetch journal data');
  }
}

/**
 * Gets featured articles for the home page
 * @returns Promise<Article[]>
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  const data = await getJournalData();
  return data.featuredArticles;
}

/**
 * Gets all volumes with their issues and articles
 * @returns Promise<Volume[]>
 */
export async function getVolumes(): Promise<Volume[]> {
  const data = await getJournalData();
  return data.volumes;
}

/**
 * Gets the latest issue
 * @returns Promise<Issue | null>
 */
export async function getLatestIssue(): Promise<Issue | null> {
  const data = await getJournalData();
  return data.latestIssue;
}

/**
 * Gets the editorial masthead information
 * @returns Promise<Masthead>
 */
export async function getMasthead(): Promise<Masthead> {
  const data = await getJournalData();
  return data.masthead;
}

/**
 * Gets journal statistics
 * @returns Promise<JournalData['stats']>
 */
export async function getJournalStats(): Promise<JournalData['stats']> {
  const data = await getJournalData();
  return data.stats;
}

/**
 * Gets journal announcements
 * @returns Promise<Announcement[]>
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  const data = await getJournalData();
  return data.announcements;
}

/**
 * Gets a specific volume by number
 * @param volumeNumber The volume number to retrieve
 * @returns Promise<Volume | undefined>
 */
export async function getVolumeByNumber(volumeNumber: number): Promise<Volume | undefined> {
  const data = await getJournalData();
  return data.volumes.find(volume => volume.volume === volumeNumber);
}

/**
 * Gets a specific issue by volume and issue number
 * @param volumeNumber The volume number
 * @param issueNumber The issue number
 * @returns Promise<Issue | undefined>
 */
export async function getIssueByNumber(
  volumeNumber: number, 
  issueNumber: number
): Promise<Issue | undefined> {
  const volume = await getVolumeByNumber(volumeNumber);
  return volume?.issues.find(issue => issue.issue === issueNumber);
}

/**
 * Gets all articles from a specific issue
 * @param volumeNumber The volume number
 * @param issueNumber The issue number
 * @returns Promise<Article[]>
 */
export async function getArticlesByIssue(
  volumeNumber: number,
  issueNumber: number
): Promise<Article[]> {
  const issue = await getIssueByNumber(volumeNumber, issueNumber);
  return issue?.articles || [];
}