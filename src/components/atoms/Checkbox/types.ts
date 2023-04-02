export default interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
  color?: string;
  label?: string;
  onChange: (args: boolean) => void;
}
