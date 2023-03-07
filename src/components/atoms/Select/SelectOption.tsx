import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { joinClasses } from 'utils/classes';
import { SelectOptionProps } from './types';

export const selectOptionVariants = {
  primary: { option: 'bg-primary', checkIcon: 'text-primary' },
} as const;

export default function SelectOption({ option, variant }: SelectOptionProps) {
  return (
    <Listbox.Option
      className={({ active }) =>
        joinClasses(
          active
            ? `text-white ${selectOptionVariants[variant].option}`
            : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-3 pr-9'
        )
      }
      value={option}
    >
      {({ selected, active }) => (
        <>
          <div className="flex items-center">
            <span
              className={joinClasses(
                selected ? 'font-semibold' : 'font-normal',
                'ml-3 block truncate'
              )}
            >
              {option.label}
            </span>
          </div>

          {selected ? (
            <span
              className={joinClasses(
                active ? 'text-white' : selectOptionVariants[variant].checkIcon,
                'absolute inset-y-0 right-0 flex items-center pr-4'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
}
