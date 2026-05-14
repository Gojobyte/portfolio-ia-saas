"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-indigo-500 hover:bg-indigo-400 text-white transition-colors cursor-pointer"
    >
      <Download size={16} />
      Telecharger en PDF
    </button>
  );
}
