import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { joinClasses } from 'utils/classes';
import { SelectOptionProps } from './types';

export const selectOptionVariants = {
  primary: { option: 'bg-primary', checkIcon: 'text-primary' },
} as const;

function SelectOption({
  option,
  variant,
  disabled = false,
}: SelectOptionProps) {
  return (
    <Listbox.Option
      disabled={disabled}
      className={({ active }) =>
        joinClasses(
          active
            ? `text-white ${selectOptionVariants[variant].option}`
            : 'text-gray-900',
          'relative cursor-default select-none py-2 px-4'
        )
      }
      value={option}
    >
      {({ selected, active }) => (
        <div
          className={joinClasses(
            'flex',
            disabled ? 'justify-center' : 'justify-between'
          )}
        >
          <div
            className="flex items-center"
            style={{ maxWidth: 'calc(100% - 20px)' }}
          >
            <span
              className={joinClasses(
                selected ? 'font-semibold' : 'font-normal',
                ' block truncate'
              )}
            >
              {option.label}
            </span>
          </div>

          {selected ? (
            <span
              className={joinClasses(
                active ? 'text-white' : selectOptionVariants[variant].checkIcon,
                'inset-y-0 right-0 flex items-center'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </div>
      )}
    </Listbox.Option>
  );
}

export default SelectOption;
