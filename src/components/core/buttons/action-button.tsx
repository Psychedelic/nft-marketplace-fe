import { Button, Wrapper } from './styles';

export type ActionButtonProps = React.ComponentProps<typeof Button>;

export const ActionButton = (props: any) => (
  <Wrapper disabled={props.disabled}>
    <Button
      {...props}
      onKeyDown={(ev) =>
        // eslint-disable-next-line react/destructuring-assignment
        props.disabled && ev.preventDefault()
      }
    />
  </Wrapper>
);
