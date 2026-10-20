import type { SVGProps } from "react";

/** Leaf sprig ornament. Decorative by default; pass a title only when it carries meaning. */
export function Leaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 40c6-16 16-26 32-32" />
      <path d="M14 30c-4-5-4-11-1-16 5 2 8 7 8 13" />
      <path d="M22 21c-2-6 0-11 4-14 4 3 5 8 3 14" />
      <path d="M31 14c0-5 3-9 8-10 1 5-1 9-5 12" />
      <path d="M12 36c-6-1-9-5-9-10 5 0 9 3 11 8" />
      <path d="M21 27c-6 0-10-3-11-8 5-1 9 1 12 6" />
    </svg>
  );
}
