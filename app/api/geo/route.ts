import { geolocation } from '@vercel/functions';

export const runtime = 'edge';

export function GET(request: Request) {
  const { city, country, countryRegion, latitude, longitude, region } = geolocation(request);
  
  return new Response(`
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Your Geolocation Information</h1>
      <div class="space-y-2">
        <p><strong>City:</strong> ${city || 'Unknown'}</p>
        <p><strong>Country:</strong> ${country || 'Unknown'}</p>
        <p><strong>Region:</strong> ${countryRegion || 'Unknown'}</p>
        <p><strong>Coordinates:</strong> ${latitude ? `${latitude}, ${longitude}` : 'Unknown'}</p>
        <p><strong>Vercel Edge Region:</strong> ${region || 'Unknown'}</p>
      </div>
    </div>
  `, {
    headers: { 'content-type': 'text/html' },
  });
}