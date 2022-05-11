import { Icons } from './index';
import { IconWrapper } from './styles';

export type IconName = keyof typeof Icons;

export type IconType<Name extends IconName> = typeof Icons[Name];

export interface IconProps<Name extends IconName>
  extends Omit<React.ComponentProps<typeof IconWrapper>, 'children'> {
  icon: Name;
  extraIconProps?: React.ComponentProps<IconType<Name>>;
}

export const Icon = <Name extends IconName>({
  icon,
  extraIconProps,
  ...spanProps
}: IconProps<Name>) => {
  const IconElement: IconType<Name> = Icons[icon];

  return (
    <IconWrapper {...spanProps}>
      <IconElement {...(extraIconProps as any)} />
    </IconWrapper>
  );
};
