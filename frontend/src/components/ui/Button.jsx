/**
 * Reusable Button Component with multiple variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.fullWidth - Full width button
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transform transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  // Variant styles
  const variants = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600
      hover:from-primary-600 hover:to-primary-700
      text-white
      shadow-soft hover:shadow-glow
      hover:-translate-y-0.5
      focus:ring-primary-500
      dark:from-primary-600 dark:to-primary-700
      dark:hover:from-primary-500 dark:hover:to-primary-600
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600
      hover:from-secondary-600 hover:to-secondary-700
      text-white
      shadow-soft hover:shadow-glow-purple
      hover:-translate-y-0.5
      focus:ring-secondary-500
    `,
    outline: `
      bg-transparent
      border-2 border-primary-500 dark:border-primary-400
      text-primary-600 dark:text-primary-400
      hover:bg-primary-50 dark:hover:bg-primary-900/20
      hover:-translate-y-0.5
      focus:ring-primary-500
    `,
    ghost: `
      bg-transparent
      text-dark-600 dark:text-dark-300
      hover:bg-dark-100 dark:hover:bg-dark-800
      hover:text-dark-800 dark:hover:text-dark-100
      focus:ring-dark-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white
      shadow-soft
      hover:-translate-y-0.5
      focus:ring-red-500
    `,
  };

  // Size styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;

