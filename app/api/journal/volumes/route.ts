import { NextResponse } from 'next/server';
import { Volume } from '../types';

export async function GET() {
  try {
    // Sample data - replace with actual OJS API call
    const volumes: Volume[] = [
      {
        volume: 5,
        year: 2025,
        issues: [
          {
            id: '2025-q4',
            volume: 5,
            issue: 4,
            date: '2025-10-01',
            articles: [
              {
                id: '2025-001',
                title: 'Novel Approaches to Malaria Prevention',
                authors: [
                  { name: 'John Doe', orcid: '0000-0002-1825-0097' }
                ],
                abstract: 'This study explores innovative strategies...',
                doi: '10.1234/atghj.2025.001',
                publicationDate: '2025-10-01',
                manuscriptType: 'Original Research',
                volume: 5,
                issue: 4
              }
            ],
            articleCount: 1
          }
        ]
      }
    ];

    return NextResponse.json(volumes);
  } catch (error) {
    console.error('Error fetching volumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch volumes' },
      { status: 500 }
    );
  }
}