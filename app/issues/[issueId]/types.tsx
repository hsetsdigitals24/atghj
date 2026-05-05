
export interface Author {
  name: string;
  email: string;
}

export interface Submission {
  manuscriptId: string;
  title: string;
  status: string;
  submissionDate: string;
  author: Author;
  currentStage: string;
  reviewStatus: string;
  decision?: string;
}

export interface ApiResponse {
  submissions: Submission[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
