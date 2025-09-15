"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  imageSrc: string;
  text: string;
  selected: boolean;
  onClick: () => void;
}

export function RoleSelector({
  imageSrc,
  text,
  selected,
  onClick,
}: RoleSelectorProps) {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-lg p-0.5",
        "from-accent-pink to-accent-violet bg-gradient-to-r",
        "shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]",
        "transition-all duration-200 ease-in-out",
        "hover:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]",
        {
          "p-1 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.35)]": selected,
        },
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "bg-neutral-white flex h-full w-full flex-col items-center justify-center gap-4 rounded-md p-4",
        )}
      >
        <Image
          src={imageSrc}
          alt={text}
          width={200}
          height={200}
          className="h-32 w-32 object-contain"
        />
        <span className="text-lg font-semibold">{text}</span>
      </div>
    </div>
  );
}
