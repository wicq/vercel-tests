import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';

export const runtime = 'experimental-edge';

export function middleware(request: NextRequest) {
  const { country } = geolocation(request);
  
  // Only allow traffic from Turkey (TR is the country code for Turkey)
  if (country !== 'TR') {
    return new NextResponse(
      `<html>
        <head>
          <title>Access Denied</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              padding: 1rem;
              text-align: center;
              color: #333;
            }
            h1 { margin-bottom: 1rem; color: #e53e3e; }
            p { margin-bottom: 0.5rem; max-width: 500px; }
          </style>
        </head>
        <body>
          <h1>Access Denied</h1>
          <p>This website is only available in Turkey.</p>
          <p>Your current location: ${country || 'Unknown'}</p>
        </body>
      </html>`,
      {
        status: 403,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
  
  return NextResponse.next();
}

// Run the middleware on all routes
export const config = {
  matcher: '/((?!api/health|_next/static|_next/image|favicon.ico).*)',
}; 