// 'error.tsx' needs to be a Client Component.
'use client';

import { useEffect } from 'react';

// It accepts two props: 'error' and 'reset'.
// 'error' is a JavaScript's native Error object.
// 'reset' is a function to reet the error boundary. It will attempt to re-render the route segment.

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
