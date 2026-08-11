"use client";

import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CustomSelect({ value, options, onChange, className = "" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ border: "1.5px solid #E2E8F0", borderRadius: "12px" }}
        className="flex items-center gap-2 bg-white pl-4 pr-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <span>{selected?.label}</span>
        <span className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 z-30 mt-2 min-w-full overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg shadow-slate-900/10"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-emerald-50 font-medium text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.label}
                {isSelected && <CheckIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}