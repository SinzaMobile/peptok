export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-bg shadow-sm">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 4c-3 0-5 2-5 5 0 2 1 3 2 4-1 1-2 2-2 4 0 3 2 4 5 4M9 4v16M9 9h4M9 15h6M13 9V6M15 15v-3" />
        </svg>
      </span>
      <span className="text-lg font-medium tracking-tight">PAMHA</span>
    </span>
  );
}
export default Logo;
