import { buttonVariants } from 'components/atoms/Buttons/Button';

export default interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof buttonVariants;
}
