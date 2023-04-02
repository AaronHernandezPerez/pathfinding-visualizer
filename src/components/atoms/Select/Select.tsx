import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { joinClasses } from 'utils/classes';
import SelectOption from './SelectOption';
import SelectSeparator from './SelectSeparator';
import SelectProps, { SelectOptions } from './types';

export const selectVariants = {
  primary: 'focus:border-primary focus:ring-primary',
} as const;

export default function Select<T>({
  options,
  variant = 'primary',
  value = null,
  onChange = () => {},
  ...rest
}: SelectProps<T>) {
  const [selected, setSelected] = useState(value);
  const handleChange = (value: SelectOptions<T>) => {
    onChange(value);
    setSelected(value);
  };

  return (
    <Listbox {...rest} value={selected} onChange={handleChange}>
      {({ open, disabled }) => (
        <>
          <Listbox.Button
            className={joinClasses(
              'w-full h-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1',
              selectVariants[variant]
            )}
          >
            <span className="flex items-center justify-between">
              <span
                className={joinClasses(
                  'ml-3 truncate',
                  disabled ? 'text-gray-400' : 'text-black'
                )}
              >
                {selected.label}
              </span>
              <span className="pointer-events-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="ring-opacity/5 w-inherit absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
              {options.map((option) => {
                if (option.type === 'separator') {
                  return (
                    <SelectSeparator
                      variant={variant}
                      key={option.label}
                      option={option}
                    />
                  );
                } else {
                  return (
                    <SelectOption
                      variant={variant}
                      key={option.label}
                      option={option}
                      disabled={option.disabled}
                    />
                  );
                }
              })}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
