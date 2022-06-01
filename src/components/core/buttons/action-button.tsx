import { Button } from './styles';

export type ActionButtonProps = React.ComponentProps<typeof Button>;

export const ActionButton = (props: any) => (
  <Button
    {...props}
    onKeyDown={(ev) =>
      // eslint-disable-next-line react/destructuring-assignment
      props.disabled && ev.preventDefault()
    }
  />
);
