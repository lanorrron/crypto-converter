import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary', // Valor por defecto
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 rounded-xl';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white focus:ring-cyan-500',
    secondary:
      'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white focus:ring-purple-500',
    outline:
      'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 focus:ring-cyan-500',
    ghost: 'text-cyan-500 hover:bg-cyan-500/10 focus:ring-cyan-500',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white focus:ring-red-500',
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
