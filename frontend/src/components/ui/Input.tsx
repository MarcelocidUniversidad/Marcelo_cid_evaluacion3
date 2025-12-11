import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({
  className = '',
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;
  return <div className="w-full space-y-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
          {label}
        </label>}
      <input id={inputId} className={`flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>;
}