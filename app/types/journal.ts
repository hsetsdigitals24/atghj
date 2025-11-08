export interface LocalizedString {
    en: string;
    [key: string]: string;
}

export interface ArticlePublication {
    title: LocalizedString;
    authorsString: string;
    datePublished: string;
    urlPublished: string;
}

export interface Article {
    id: number;
    publications: ArticlePublication[];
    statusLabel: string;
    urlPublished: string;
}

export interface OJSIssue {
    id: number;
    articles: Article[];
    coverImage: LocalizedString;
    coverImageAltText: LocalizedString;
    coverImageUrl: LocalizedString;
    datePublished: string;
    description: LocalizedString;
    identification: string;
    number: string;
    publishedUrl: string;
    title: LocalizedString;
    volume: number;
    year: number;
}