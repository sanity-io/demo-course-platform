import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 p-4 w-screen h-screen flex items-center justify-center">
      <h2 className="font-display text-3xl text-cyan-500 animate-pulse">
        Loading...
      </h2>
    </div>
  );
}
