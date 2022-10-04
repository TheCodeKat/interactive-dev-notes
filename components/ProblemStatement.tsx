export default function ProblemStatement({ problem }: { problem: string }) {
  return (
    <div className="p-4 bg-rose-50/50">
      <div className="text-rose-600 flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <span className="font-bold ml-2">Problema</span>
      </div>

      <div>
        <span>{problem}</span>
      </div>
    </div>
  );
}
