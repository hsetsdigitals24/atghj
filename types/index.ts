export interface LocalizedContent {
    en: string | null;
}

export interface Publication {
    _href?: string;
    id: number;
    submissionId?: number;
    status?: number;
    datePublished?: string;
    version?: number;
    title?: {en: string };
    fullTitle?: {en: string };
    subtitle?: {en: string };
    authorsString?: string;
    authorsStringIncludeInBrowse?: string;
    authorsStringShort?: string;
    categoryIds?: number[];
    coverImage?: {en: string };
    coverImageAltText?:  {en: string };
    doiObject?: unknown | null;
    galleys?: unknown[];
    locale?: string;
    pages?: string | null;
    prefix?: {en: string };
    primaryContactId?: number;
    'pub-id::publisher-id'?: string | null;
    sectionId?: number;
    urlPublished?: string;
    year?: number;
    // any other optional crossref/plugin fields
    [key: string]: unknown;
}

export interface Article {
    id: number;
    status: number;
    statusLabel?: string;
    dateSubmitted?: string;
    dateLastActivity?: string;
    urlPublished?: string;
    publications: Publication[]; // publications are Publication objects
    title?: {en: string };
    authorsString?: string;
    authorsStringShort?: string;
    // additional optional fields
    [key: string]: unknown;
}

export interface Issue {
  id: number;
  title: {en: string };
  description?: {en: string };
  volume?: number;
  number?: string;
  year?: number;
  galleys?: unknown[];
  datePublished?: string;
  published?: boolean;
  identification?: string;
  publishedUrl?: string;
  coverImageUrl?: {en: string };      // matches usage: issue.coverImageUrl.en
  coverImageAltText?: {en: string };  // matches usage: issue.coverImageAltText?.en
  articles?: Article[];                  // matches usage: issue.articles.map(...)
  // additional optional fields
  [key: string]: unknown;
}
