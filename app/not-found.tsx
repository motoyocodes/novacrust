import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-120 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#003B3B] mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="w-full bg-[#003B3B] text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
