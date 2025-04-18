'use client';

import React, { useEffect, useState } from 'react';

export type Option = {
  label: string;
  value: string;
};

type SearchableSelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options: Option[];
  onOptionSelect: (value: Option) => void;
  value?: string;
  className?: string;
};

const Select: React.FC<SearchableSelectProps> = ({
  options,
  onOptionSelect,
  value = '',
  className,
  ...rest
}) => {
  const [search, setSearch] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSearch(option.label);
    setShowDropdown(false);
    onOptionSelect(option);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring text-sm bg-slate-900/50 ${className || ''}`}
        {...rest}
      />

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-slate-900 border border-border rounded-xl shadow-xl max-h-48 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onMouseDown={() => handleSelect(option)}
              className="px-4 py-2 mx-2 my-2 hover:bg-[rgba(34,211,238,0.1)] cursor-pointer text-sm rounded-lg hover:text-cyan-300"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
