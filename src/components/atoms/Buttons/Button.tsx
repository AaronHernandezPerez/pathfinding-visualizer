import { joinClasses } from 'utils/classes';
import ButtonProps from './types';

export const buttonVariants = {
  primary:
    'dark:focus:ring-primary/55 bg-primary hover:bg-primary/90 focus:ring-primary/50 disabled:hover:bg-primary',
};

export default function Button({
  children,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={joinClasses(
        'mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 disabled:opacity-70',
        buttonVariants[variant]
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
