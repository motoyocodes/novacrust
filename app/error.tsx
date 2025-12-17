"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-120 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCcw className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#003B3B] mb-2">
          Something went wrong!
        </h2>
        <p className="text-slate-500 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#003B3B] text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
