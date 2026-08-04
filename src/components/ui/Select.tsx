import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, children, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`
            bg-background text-text border rounded-md px-3 py-2 text-base
            focus:outline-none focus:ring-2 focus:ring-primary
            ${error ? "border-error" : "border-border"}
            ${className}
          `}
          {...rest}
        >
          {children}
        </select>
        {error && <span className="text-sm text-error">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";