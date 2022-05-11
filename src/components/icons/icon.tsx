import { Icons } from './index';
import { IconWrapper } from './styles';

export interface IconProps
  extends Omit<React.ComponentProps<typeof IconWrapper>, 'children'> {
  icon: keyof typeof Icons;
  extraIconProps?: any;
}

export const Icon: React.VFC<IconProps> = ({
  icon,
  extraIconProps = {},
  ...spanProps
}: IconProps) => {
  const IconElement = Icons[icon];

  return (
    <IconWrapper {...spanProps}>
      <IconElement {...extraIconProps} />
    </IconWrapper>
  );
};
