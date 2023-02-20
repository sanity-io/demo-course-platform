import React from "react";
import Button from "./Button";

export default function ExitPreview() {
  return (
    <div className="fixed inset-0 z-50 p-4 w-screen h-screen flex items-end justify-center pointer-events-none">
      <Button className="pointer-events-auto" href="/api/exit-preview">Exit Preview Mode</Button>
    </div>
  );
}
