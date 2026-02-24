import { useState } from 'react';

/**
 * Reusable Input Component with floating label and validation
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.icon - Icon component to display
 * @param {boolean} props.required - Whether input is required
 */
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={name}
        className={`
          block text-sm font-medium mb-2
          transition-colors duration-200
          ${error 
            ? 'text-red-500 dark:text-red-400' 
            : isFocused 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-dark-600 dark:text-dark-300'
          }
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className={`
            absolute left-4 top-1/2 -translate-y-1/2
            transition-colors duration-200
            ${error 
              ? 'text-red-400' 
              : isFocused 
                ? 'text-primary-500' 
                : 'text-dark-400 dark:text-dark-500'
            }
          `}>
            {Icon}
          </div>
        )}

        {/* Input field */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || label}
          className={`
            w-full py-3.5 rounded-xl
            bg-white/50 dark:bg-dark-800/50
            border-2 transition-all duration-300
            text-dark-800 dark:text-dark-100
            placeholder:text-dark-400 dark:placeholder:text-dark-500
            focus:outline-none
            ${Icon ? 'pl-12 pr-4' : 'px-4'}
            ${isPassword ? 'pr-12' : ''}
            ${error 
              ? 'border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : 'border-dark-200 dark:border-dark-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
          `}
          {...props}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:text-dark-500 dark:hover:text-dark-300 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slide-down">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

