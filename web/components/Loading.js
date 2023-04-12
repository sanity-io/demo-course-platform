import React from "react";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-50 p-4 w-screen h-screen flex items-center justify-center">
      <h1 className="font-display text-3xl text-cyan-500 animate-pulse">
        Loading...
      </h1>
    </main>
  );
}
