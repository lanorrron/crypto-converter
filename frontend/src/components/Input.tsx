import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-foreground">{label}</label>}
      <input
        {...props}
        className={`w-full px-4 h-12 py-2 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring text-sm bg-slate-900/50 ${className}`}
      />
    </div>
  );
};

export default Input;
