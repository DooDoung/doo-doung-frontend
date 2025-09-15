import React from "react";

function ProphetCard({ featName }: { featName: string }) {
  return (
    <div className="flex flex-col items-center">
      <h2>{featName}</h2>
      <div className="flex w-full rounded-md border p-4 shadow-md">
        <div className="h-32"> content here... </div>
      </div>
    </div>
  );
}

export default ProphetCard;
