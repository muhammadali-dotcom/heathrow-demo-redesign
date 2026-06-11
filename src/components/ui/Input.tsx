import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full px-4 py-3 text-sm text-white placeholder-[#A1A1AA] rounded-xl outline-none transition-colors"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        {...props}
      />
    </div>
  );
}
