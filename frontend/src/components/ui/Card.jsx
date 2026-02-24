/**
 * Reusable Card Component with glassmorphism effect
 * @param {Object} props - Component props
 * @param {string} props.variant - Card variant (glass, solid, outline)
 * @param {string} props.padding - Padding size (none, sm, md, lg)
 * @param {boolean} props.hover - Enable hover effects
 * @param {React.ReactNode} props.children - Card content
 */
const Card = ({
  variant = 'glass',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}) => {
  // Base styles
  const baseStyles = 'rounded-2xl transition-all duration-300';

  // Variant styles
  const variants = {
    glass: `
      bg-white/70 dark:bg-dark-800/70
      backdrop-blur-xl
      border border-white/20 dark:border-dark-700/50
      shadow-glass dark:shadow-glass-dark
    `,
    solid: `
      bg-white dark:bg-dark-800
      shadow-soft dark:shadow-glass-dark
    `,
    outline: `
      bg-transparent
      border-2 border-dark-200 dark:border-dark-700
    `,
    gradient: `
      bg-gradient-to-br from-white/80 to-white/40
      dark:from-dark-800/80 dark:to-dark-900/40
      backdrop-blur-xl
      border border-white/30 dark:border-dark-700/50
      shadow-glass dark:shadow-glass-dark
    `,
  };

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  // Hover styles
  const hoverStyles = hover
    ? 'hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

