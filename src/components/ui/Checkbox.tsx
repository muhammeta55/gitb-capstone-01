import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = "", ...rest }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`
            h-4 w-4 rounded-sm border border-border accent-primary
            focus:outline-none focus:ring-2 focus:ring-primary
            ${className}
          `}
          {...rest}
        />
        <label htmlFor={id} className="text-sm text-text">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";