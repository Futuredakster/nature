import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={error ? 'border-[var(--error)]' : ''}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--error)]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-[var(--foreground)] opacity-60">{helperText}</span>
      )}
    </div>
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={error ? 'border-[var(--error)]' : ''}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--error)]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-[var(--foreground)] opacity-60">{helperText}</span>
      )}
    </div>
  );
}
