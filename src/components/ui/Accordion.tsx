"use client";

import { useState, ReactNode } from "react";

interface AccordionItemData {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`divide-y divide-border border border-border rounded-lg ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <svg
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-muted">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}