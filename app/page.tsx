'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Geolocation Demo</h1>
      <div className="p-6 border rounded-lg shadow-md">
        <ClientComponent />
      </div>
    </main>
  );
}

function ClientComponent() {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('/api/geo');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const text = await response.text();
        setLocation(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, []);

  if (loading) return <p>Loading your location...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  return <div dangerouslySetInnerHTML={{ __html: location || '' }} />;
}
