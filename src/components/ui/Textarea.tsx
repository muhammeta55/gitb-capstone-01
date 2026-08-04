import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={`
            bg-background text-text border rounded-md px-3 py-2 text-base
            focus:outline-none focus:ring-2 focus:ring-primary
            ${error ? "border-error" : "border-border"}
            ${className}
          `}
          {...rest}
        />
        {error && <span className="text-sm text-error">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";