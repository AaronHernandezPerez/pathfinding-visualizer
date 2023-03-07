import { Listbox } from '@headlessui/react';
import { joinClasses } from 'utils/classes';
import { SelectSeparatorProps } from './types';

export const selectSeparatorVariants = {
  primary: 'bg-primary',
} as const;

export default function SelectSeparator({
  option,
  variant,
}: SelectSeparatorProps) {
  return (
    <Listbox.Option
      className={({ active }) =>
        joinClasses(
          active
            ? `text-white ${selectSeparatorVariants[variant]}`
            : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      disabled={true}
      value={option}
    >
      <hr />
    </Listbox.Option>
  );
}
