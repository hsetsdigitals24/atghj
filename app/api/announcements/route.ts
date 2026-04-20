import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsFetch } from '@/app/lib/ojs';

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

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Call for Papers - Volume 2025',
    content: 'We are now accepting submissions for our upcoming volume. Please ensure all submissions follow our guidelines and are submitted before the deadline.',
    type: 'deadline',
    priority: 'high',
    datePublished: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Editorial Team',
    link: '/submissions'
  },
  {
    id: 2,
    title: 'System Maintenance Scheduled',
    content: 'Our platform will undergo scheduled maintenance on Saturday. The site may be temporarily unavailable during this period.',
    type: 'alert',
    priority: 'medium',
    datePublished: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Technical Team'
  },
  {
    id: 3,
    title: 'New Editorial Guidelines Released',
    content: 'We have updated our editorial guidelines to improve the quality and consistency of published articles. All authors should review the updated guidelines.',
    type: 'update',
    priority: 'medium',
    datePublished: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Editorial Team'
  },
  {
    id: 4,
    title: 'Annual Conference 2025',
    content: 'Join us for our annual conference featuring keynote speakers and panel discussions on current topics in the field.',
    type: 'event',
    priority: 'low',
    datePublished: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Conference Team',
    link: '#'
  },
  {
    id: 5,
    title: 'Volume 2024 Now Available',
    content: 'The complete archive of Volume 2024 is now available online. Access all published articles and special issues from the past year.',
    type: 'news',
    priority: 'low',
    datePublished: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Editorial Team',
    link: '/archive'
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const priority = searchParams.get('priority');
  const count = parseInt(searchParams.get('count') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');
  const useMock = searchParams.get('mock') === 'true';

  try {
    let announcements: Announcement[] = [];

    if (useMock || !isOjsConfigured()) {
      announcements = [...MOCK_ANNOUNCEMENTS];
    } else {
      try {
        const response = await ojsFetch('/announcements', {
          params: {
            count: count.toString(),
            offset: offset.toString(),
            orderBy: 'datePosted',
            orderDirection: 'DESC',
          },
        });

        if (!response.ok) {
          throw new Error(`OJS API error: ${response.status}`);
        }

        const data = await response.json();
        const items = data.items || [];

        announcements = items.map((item: Record<string, unknown>) => ({
          id: item.id as number,
          title: item.title as string,
          content: item.content as string,
          type: determineType(item.title as string, item.content as string),
          priority: determinePriority(item.title as string, item.content as string),
          datePublished: (item.datePosted as string) || new Date().toISOString(),
          author: (item.author as string) || 'Editorial Team',
        }));
      } catch (ojsError) {
        console.warn('Failed to fetch from OJS, falling back to mock data:', ojsError);
        announcements = [...MOCK_ANNOUNCEMENTS];
      }
    }

    if (type && type !== 'all') {
      announcements = announcements.filter((a) => a.type === type);
    }

    if (priority && priority !== 'all') {
      announcements = announcements.filter((a) => a.priority === priority);
    }

    const paginatedAnnouncements = announcements.slice(offset, offset + count);

    const response_data: AnnouncementsResponse = {
      items: paginatedAnnouncements,
      itemsMax: announcements.length,
    };

    return NextResponse.json(response_data);
  } catch (error) {
    console.error('Error processing announcements:', error);
    return NextResponse.json({
      items: MOCK_ANNOUNCEMENTS.slice(0, 3),
      itemsMax: MOCK_ANNOUNCEMENTS.length,
    });
  }
}

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

  return 'news';
}

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
