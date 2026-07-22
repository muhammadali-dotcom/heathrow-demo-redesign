import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full px-4 py-3 text-sm text-fg placeholder-muted rounded-xl outline-none transition-colors"
        style={{
          background: 'var(--color-surface-soft)',
          border: '1px solid var(--color-line)',
        }}
        {...props}
      />
    </div>
  );
}
