import { joinClasses } from 'utils/classes';
import ButtonProps from './types';

export const buttonVariants = {
  primary:
    'dark:focus:ring-primary/55 bg-primary hover:bg-primary/90 focus:ring-primary/50 disabled:hover:bg-primary',
  secondary:
    'dark:focus:ring-secondary/55 bg-secondary hover:bg-secondary/90 focus:ring-secondary/50 disabled:hover:bg-secondary',
};

function Button({ children, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={joinClasses(
        'inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 disabled:opacity-70',
        buttonVariants[variant]
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
