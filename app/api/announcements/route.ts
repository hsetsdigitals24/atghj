import { NextRequest, NextResponse } from 'next/server';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'news' | 'update' | 'alert' | 'event' | 'deadline';
  priority: 'low' | 'medium' | 'high';
  datePublished: string;
  image?: string;
  link?: string;
  author?: string;
}

interface AnnouncementsResponse {
  items: Announcement[];
  itemsMax: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const priority = searchParams.get('priority');
  const count = searchParams.get('count') || '50';
  const offset = searchParams.get('offset') || '0';

  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Fetch announcements from OJS
    const announcementsUrl = new URL(`${OJS_BASE_URL}/announcements`);
    announcementsUrl.searchParams.append('count', count);
    announcementsUrl.searchParams.append('offset', offset);
    announcementsUrl.searchParams.append('orderBy', 'datePosted');
    announcementsUrl.searchParams.append('orderDirection', 'DESC');
    announcementsUrl.searchParams.append('apiToken', OJS_API_KEY);

    console.log('📢 Fetching announcements from:', announcementsUrl.toString());

    const response = await fetch(announcementsUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    let announcements = data.items || [];

    // Transform OJS announcements to our format
    announcements = announcements.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      type: determineType(item.title, item.content),
      priority: determinePriority(item.title, item.content),
      datePublished: item.datePosted || new Date().toISOString(),
      author: item.author || 'Editorial Team',
    }));

    // Apply client-side filters if needed (backup filtering)
    if (type && type !== 'all') {
      announcements = announcements.filter((a: Announcement) => a.type === type);
    }

    if (priority && priority !== 'all') {
      announcements = announcements.filter((a: Announcement) => a.priority === priority);
    }

    const response_data: AnnouncementsResponse = {
      items: announcements,
      itemsMax: data.itemsMax || announcements.length
    };

    console.log(`✅ Fetched ${announcements.length} announcements`);

    return NextResponse.json(response_data);
  } catch (error) {
    console.error('❌ Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}

/**
 * Determine announcement type based on title and content keywords
 */
function determineType(title: string, content: string): 'news' | 'update' | 'alert' | 'event' | 'deadline' {
  const text = `${title} ${content}`.toLowerCase();

  if (text.includes('deadline') || text.includes('submit by') || text.includes('extended to')) {
    return 'deadline';
  }
  if (text.includes('event') || text.includes('webinar') || text.includes('conference') || text.includes('workshop')) {
    return 'event';
  }
  if (text.includes('alert') || text.includes('maintenance') || text.includes('downtime') || text.includes('issue')) {
    return 'alert';
  }
  if (text.includes('update') || text.includes('updated') || text.includes('new') || text.includes('improved')) {
    return 'update';
  }

  return 'news'; // Default
}

/**
 * Determine announcement priority based on keywords
 */
function determinePriority(title: string, content: string): 'low' | 'medium' | 'high' {
  const text = `${title} ${content}`.toLowerCase();

  if (
    text.includes('urgent') ||
    text.includes('critical') ||
    text.includes('important') ||
    text.includes('deadline') ||
    text.includes('downtime') ||
    text.includes('maintenance')
  ) {
    return 'high';
  }

  if (
    text.includes('alert') ||
    text.includes('notice') ||
    text.includes('update') ||
    text.includes('event')
  ) {
    return 'medium';
  }

  return 'low';
}
