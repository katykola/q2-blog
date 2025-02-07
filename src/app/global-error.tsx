"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
            <h1>Něco se pokazilo...</h1>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Zkusit znovu</button>
        </div>
      </body>
    </html>
  );
}
