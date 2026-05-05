// API Response Types
export interface OJSSubmitter {
    fullName: string;
    email: string;
}

export interface OJSResponse {
    items: IssuesItem[];
    itemsMax: number;
}

// Frontend Response Types
export interface Submission {
    manuscriptId: string;
    title: string;
    status: string;
    submissionDate: string;
   
    currentStage: string;
    reviewStatus: string;
    decision?: string;
    volume: string;
    issue?: string;
}


export interface ApiResponse {
    issues: Submission[];
    metadata: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        volume: string;
        // issue: string;
    };
}

export interface Issues {
    coverImage: {
        [key: string]: string;
    };
    coverImageAltText: {
        [key: string]: string;
    };
    coverImageUrl: {
        [key: string]: string;
    };
    datePublished: string;
    description: {
        [key: string]: string;
    };
    id: number;
    identification: string;
    journalId: number;
    publishedUrl: string;
    title: string;
    status: string;
    year: number;
    submissionDate: string;  
    volume: number;
    issue: string;
}
export interface IssuesResponse {
    issues: Issues[];
    metadata: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        volume: string;
        // issue: string;
    };
}

export interface IssuesItem {
    coverImage: {
        [key: string]: string;
    };
    coverImageAltText: {
        [key: string]: string;
    };
    coverImageUrl: {
        [key: string]: string;
    };
    datePublished: string;
    description: {
        [key: string]: string;
    };
    id: number;
    identification: string;
    journalId: number;
    publishedUrl: string;
    title: {
        en: string;
        [key: string]: string;
    };
    status: string;
    year: number;
    submissionDate: string;  
    volume: number;
    issue: string;
    number?: string;
    published?: boolean; 
}   
export interface SubmissionItem {
    id: string;
    title: string;
    status: string;
    year: string;
    submissionDate: string;
    submitter: OJSSubmitter;
    stageId: string;
    reviewStatus: string;
    decisions?: Array<{ decision: string }>;
    volume: string;
    issue: string;
}
