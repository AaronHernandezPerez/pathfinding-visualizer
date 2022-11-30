import ButtonProps from './types';

export default function Button({
  children,
  color = '#0ea5e9',
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`text-white bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 focus:ring-4 focus:outline-none focus:ring-[#0ea5e9]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#0ea5e9]/55 mr-2 mb-2`}
      {...rest}
    >
      {children}
    </button>
  );
}
