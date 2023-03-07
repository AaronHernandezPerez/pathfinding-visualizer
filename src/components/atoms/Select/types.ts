import { selectVariants } from './Select';
import { selectOptionVariants } from './SelectOption';
import { selectSeparatorVariants } from './SelectSeparator';

export interface SelectOptions {
  label: string;
  type?: 'separator';
  value?: unknown;
}

export default interface SelectProps {
  options: SelectOptions[];
  disabled?: boolean;
  value?: SelectOptions | null;
  variant?: keyof typeof selectVariants;
  onChange?: (arg: SelectOptions) => void;
}

export interface SelectSeparatorProps {
  option: SelectOptions;
  variant: keyof typeof selectSeparatorVariants;
}

export interface SelectOptionProps {
  option: SelectOptions;
  variant: keyof typeof selectOptionVariants;
}
