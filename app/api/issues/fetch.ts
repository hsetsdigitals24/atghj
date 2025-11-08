import { OJSResponse } from "./types";


const baseUrl = process.env.NEXT_PUBLIC_OJS_API_URL;
const apiKey = process.env.NEXT_PUBLIC_OJS_API_KEY;

async function fetchIssuesFromOJS(volume: string, page: number, count: number, isPublished: boolean): Promise<OJSResponse> {
  if (!baseUrl || !apiKey) {
    throw new Error('OJS API configuration is missing');
  }

  const url = new URL(`${baseUrl}/issues`);
  url.searchParams.append('volume', volume); 
  url.searchParams.append('page', page.toString());
  url.searchParams.append('isPublished', isPublished ? 'true' : 'false');
  url.searchParams.append('count', count.toString());
  url.searchParams.append('apiToken', apiKey);

//   console.log(url.toString())

  const response = await fetch(url.toString());

//   console.log(response)  

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const data = await response.json();
  return data as OJSResponse;
}

export { fetchIssuesFromOJS };
