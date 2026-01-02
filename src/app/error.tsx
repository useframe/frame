"use client";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
