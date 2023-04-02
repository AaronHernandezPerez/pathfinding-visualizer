import { ChangeEvent } from 'react';

import CheckboxProps from './types';

export default function Checkbox({
  onChange,
  label,
  id,
  ...rest
}: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <span className="flex shrink items-center">
      {label && (
        <label className="mr-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input type="checkbox" id={id} onChange={handleChange} {...rest} />
    </span>
  );
}
