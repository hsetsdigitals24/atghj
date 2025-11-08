
// Usage in the GET handler
import { fetchIssuesFromOJS } from './fetch';
import { NextRequest, NextResponse } from 'next/server';
import { IssuesResponse } from './types';

export async function GET(request: NextRequest): Promise<NextResponse<IssuesResponse | { error: string }>> {
    try {
        
        const { searchParams } = new URL(request.url);
        const volume = searchParams.get('volume') || ''; 
        const page = parseInt(searchParams.get('page') || '1', 10);
        const count = parseInt(searchParams.get('count') || '20', 10);
        const isPublished = true; // Always fetch published issues

        const ojsData = await fetchIssuesFromOJS(volume, page, count, isPublished);

        console.log({"ojsData": ojsData.items})
        // Transform OJSResponse to ApiResponse
        const apiResponse: IssuesResponse = {
            issues: ojsData.items.map((item) => ({ 
                coverImage: item.coverImage,
                coverImageAltText: item.coverImageAltText,
                coverImageUrl: item.coverImageUrl,
                datePublished: item.datePublished,
                description: item.description,
                id: item.id,
                identification: item.identification,
                journalId: item.journalId,
                publishedUrl: item.publishedUrl,
                title: item.title.en,
                status: item.status,
                year: item.year,
                submissionDate: item.submissionDate, 
                volume: item.volume,
                issue: item.issue || ''
            })),
            metadata: {
                total: ojsData.itemsMax,
                page,
                pageSize: count,
                totalPages: Math.ceil(ojsData.itemsMax / count),
                volume
            }
       }; 


        return NextResponse.json(apiResponse);
    } catch (error) {
        console.error('Error in issues route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch issues data' },
            { status: 500 }
        );
    }
}