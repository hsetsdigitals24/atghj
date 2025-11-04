export interface Author {
  name: string;
  orcid?: string;
  affiliation?: string;
  email?: string;
  isCorresponding?: boolean;
}

export interface Article {
  id: string;
  title: string;
  authors: Author[];
  abstract: string;
  doi: string;
  publicationDate: string;
  manuscriptType: string;
  keywords?: string[];
  volume: number;
  issue: number;
  pageRange?: string;
  imageUrl?: string;
  pdfUrl?: string;
  fundingInfo?: string;
  conflictOfInterest?: string;
  ethicalApproval?: string;
}

export interface Issue {
  id: string;
  volume: number;
  issue: number;
  date: string;
  coverImage?: string;
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
  volumes: Volume[];
  latestIssue: Issue | null;
  featuredArticles: Article[];
  masthead: Masthead;
  announcements: Announcement[];
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