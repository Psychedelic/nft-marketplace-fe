import React, { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  StyledContent,
  StyledCloseIconWrapper,
  StyledCloseIcon,
  Header,
  Title,
  PopoverContent,
  ButtonContainer,
  Flex,
  ButtonWrapper,
} from './style';
import { removePortalZIndexGlobals } from '../../../utils/styles';
import { ActionButton } from '../buttons';
import { useTranslation } from 'react-i18next';

export type PopoverProps = {
  trigger?: React.ReactNode;
  text?: React.ReactNode;
  setShowOverlay: (value: boolean) => void;
};

const Popover = ({ trigger, text, setShowOverlay }: PopoverProps) => {
  const { t } = useTranslation();
  const [popoverOpened, setPopoverOpened] = useState(false);

  removePortalZIndexGlobals();

  const handlePopoverOpen = (status: boolean) => {
    setShowOverlay(status);
    setPopoverOpened(status);
  };

  return (
    <PopoverPrimitive.Root
      open={popoverOpened}
      onOpenChange={handlePopoverOpen}
    >
      <PopoverPrimitive.Trigger
        asChild
        onClick={() => setShowOverlay(true)}
      >
        <div>{trigger}</div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Anchor />
      <StyledContent portalled>
        <Header>
          <Title>{t('translation:traits.popover.title')}</Title>
          <StyledCloseIconWrapper asChild>
            <StyledCloseIcon
              icon="close"
              colorType="developerMode"
              size="md"
            />
          </StyledCloseIconWrapper>
        </Header>
        <PopoverContent>{text}</PopoverContent>
        <ButtonContainer>
          <Flex>
            <ButtonWrapper margin="right">
              <ActionButton
                type="outline"
                onClick={() => handlePopoverOpen(false)}
              >
                {t('translation:traits.popover.buttons.cancel')}
              </ActionButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <ActionButton
                type="primary"
                onClick={() => handlePopoverOpen(false)}
              >
                {t('translation:traits.popover.buttons.confirm')}
              </ActionButton>
            </ButtonWrapper>
          </Flex>
        </ButtonContainer>
      </StyledContent>
    </PopoverPrimitive.Root>
  );
};

export default Popover;
