'use client';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, leftIcon, rightIcon, children, className = '', disabled, ...props }, ref) => {
    const classes = [
      'btn',
      `btn--${variant}`,
      size !== 'md' ? `btn--${size}` : '',
      fullWidth ? 'btn--full' : '',
      loading ? 'btn--loading' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <Loader2 size={16} style={{ animation: 'btn-spin 0.7s linear infinite' }} />
        ) : leftIcon ? (
          <span className="btn__icon">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !loading && <span className="btn__icon">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
