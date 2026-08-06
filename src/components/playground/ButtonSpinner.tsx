type ButtonSpinnerProps = {
  className?: string;
};

/** Inline spinner for buttons during async actions */
export function ButtonSpinner({ className = "h-4 w-4" }: ButtonSpinnerProps) {
  return (
    <span
      className={`inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      aria-hidden
    />
  );
}
