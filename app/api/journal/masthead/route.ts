import { NextResponse } from 'next/server';
import { Masthead } from '../types';

export async function GET() {
  try {
    // Sample data - replace with actual OJS API call
    const masthead: Masthead = {
      editorInChief: [
        {
          name: 'Dr. Sarah Johnson',
          role: 'Editor-in-Chief',
          affiliation: 'University of Cape Town',
          country: 'South Africa',
          orcid: '0000-0002-1825-0099',
          bio: 'Expert in Global Health and Epidemiology'
        }
      ],
      associateEditors: [
        {
          name: 'Dr. Michael Okonjo',
          role: 'Associate Editor',
          affiliation: 'University of Nairobi',
          country: 'Kenya',
          orcid: '0000-0002-1825-0100',
          bio: 'Specialist in Tropical Diseases'
        }
      ],
      sectionEditors: [],
      editorialBoard: [],
      managingEditor: [
        {
          name: 'Dr. Alice Mwangi',
          role: 'Managing Editor',
          affiliation: 'ATGHJ Editorial Office',
          country: 'Kenya'
        }
      ],
      technicalEditor: [
        {
          name: 'John Smith',
          role: 'Technical Editor',
          affiliation: 'ATGHJ Editorial Office',
          country: 'South Africa'
        }
      ]
    };

    return NextResponse.json(masthead);
  } catch (error) {
    console.error('Error fetching masthead:', error);
    return NextResponse.json(
      { error: 'Failed to fetch masthead' },
      { status: 500 }
    );
  }
}