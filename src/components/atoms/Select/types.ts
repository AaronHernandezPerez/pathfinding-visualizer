import { selectVariants } from './Select';
import { selectOptionVariants } from './SelectOption';
import { selectSeparatorVariants } from './SelectSeparator';

export interface SelectOptions<T = unknown> {
  label: string;
  type?: 'separator';
  value?: T;
  disabled?: boolean;
}

export default interface SelectProps<T> {
  options: Array<SelectOptions<T>>;
  disabled?: boolean;
  value?: SelectOptions<T> | null;
  variant?: keyof typeof selectVariants;
  onChange?: (arg: SelectOptions<T>) => void;
}

export interface SelectSeparatorProps {
  option: SelectOptions;
  variant: keyof typeof selectSeparatorVariants;
}

export interface SelectOptionProps {
  option: SelectOptions;
  disabled: boolean;
  variant: keyof typeof selectOptionVariants;
}
