import { LatestIssueProps } from '../journal/types';

export async function fetchCurrentIssue(): Promise<LatestIssueProps | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_OJS_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_OJS_API_KEY;

    if (!baseUrl || !apiKey) {
      console.error('OJS API configuration is missing');
      return null;
    }

  const url = new URL(`${baseUrl}/issues/current`);  
  url.searchParams.append('apiToken', apiKey);

//   console.log(url.toString())

  const response = await fetch(url.toString());

  console.log(response)  

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

    const data = await response.json();
    return data as LatestIssueProps;
  } catch (error) {
    console.error('Error fetching current issue:', error);
    return null;
  }
}
