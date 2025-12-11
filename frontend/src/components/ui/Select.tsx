import React from 'react';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: string[];
}
export function Select({
  className = '',
  label,
  error,
  options,
  id,
  placeholder,
  ...props
}: SelectProps) {
  const selectId = id || props.name;
  return <div className="w-full space-y-1.5">
      {label && <label htmlFor={selectId} className="text-sm font-medium text-stone-700">
          {label}
        </label>}
      <select id={selectId} className={`flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`} {...props}>
        {placeholder && <option value="" disabled>
            {placeholder}
          </option>}
        {options.map(option => <option key={option} value={option}>
            {option}
          </option>)}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>;
}