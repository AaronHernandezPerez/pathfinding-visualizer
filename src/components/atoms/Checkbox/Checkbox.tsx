import { ChangeEvent } from 'react';

import CheckboxProps from './types';

export default function Button({ onChange, ...rest }: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return <input type="checkbox" onChange={handleChange} {...rest} />;
}
