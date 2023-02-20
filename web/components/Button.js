import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export default function Button({ href, children, className = ``, Icon, iconFirst = false }) {
  if (!href) return null;

  return (
    <Link
      href={href}
      className={clsx(
        iconFirst && `flex-row-reverse`,
        `inline-flex items-center gap-x-2 bg-green-500 hover:bg-green-600 border border-green-400 hover:border-green-600 transition-all group-hover:scale-105 hover:scale-105 duration-100 ease-in-out text-white font-bold p-4 rounded-md leading-none group`,
        className
      )}
    >
      {children}
      {Icon && (
        <Icon
          className={clsx(
            `pointer-events-none w-4 h-auto scale-150 text-green-200 transition-transform`,
            iconFirst
              ? `translate-x-1 group-hover:-translate-x-1`
              : `-translate-x-1 group-hover:translate-x-1`
          )}
        />
      )}
    </Link>
  );
}
