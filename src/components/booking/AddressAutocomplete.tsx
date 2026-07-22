"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface AddressAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  icon: ReactNode;
  inputClassName: string;
  inputStyle: CSSProperties;
  errorId?: string;
}

export default function AddressAutocomplete({
  id,
  value,
  onChange,
  suggestions,
  placeholder,
  icon,
  inputClassName,
  inputStyle,
  errorId,
}: AddressAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const query = value.trim().toLowerCase();
  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query))
    : suggestions;

  return (
    <div className="relative" ref={containerRef}>
      {icon}
      <input
        id={id}
        type="text"
        autoComplete="off"
        required
        role="combobox"
        aria-expanded={open && filtered.length > 0}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        aria-describedby={errorId}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={inputClassName}
        style={inputStyle}
      />
      {open && filtered.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl py-1"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-line)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.55)",
          }}
        >
          {filtered.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                className="w-full px-4 py-2.5 text-left text-sm text-fg transition-colors hover:bg-fg/5"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(suggestion);
                  setOpen(false);
                }}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
