import { Article } from '@/types';

export interface ArticlesResponse {
  items: Article[];
  metadata: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ArticlesError {
  error: string;
}