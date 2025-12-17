import { ArrowLeft } from "lucide-react";
import type { pageType } from "../types";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [page, setPage] = useState<pageType>(1);

  const handleBack = () => {
    if (page > 1) setPage((prev: number) => (prev - 1) as pageType);
  };

  return (
    <div className="flex items-center mb-8 relative">
      <button
        onClick={handleBack}
        className="absolute left-0 p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Link href="/">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Link>
      </button>
      <h2 className="w-full text-center text-lg font-bold text-[#003B3B]">
        Recipient details
      </h2>
    </div>
  );
}
