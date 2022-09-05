import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
  ModalContent,
  EditIconWrapper,
  EditIcon,
  ModalHeaderWrapper,
  Divider,
} from './styles';
import {
  TabContentHeader,
  TabContentHeaderItem,
  TabContentContainer,
  TabContentWrapper,
  ActionIconsContainer,
  IconWrapper,
  StyledIcon,
  TabsInnerContentWrapper,
  BottomGradient,
  DeveloperModeText,
} from '../tabs/styles';
import { ModalOverlay } from './modal-overlay';
import { Icon } from '../icons';
import { ActionButton, Tooltip } from '../core';
import Popover from '../core/popover/popover';
import NewCategoryField from '../core/input-field-set/new-category-field';

/* --------------------------------------------------------------------------
 * Edit Non Indexable Traits
 * --------------------------------------------------------------------------*/

export const EditNonIndexableTraitsModal = () => {
  const { t } = useTranslation();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [addNewCategory, setAddNewCategory] =
    useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  return (
    <>
      <DialogPrimitive.Root
        open={modalOpened}
        onOpenChange={handleModalOpen}
      >
        <DialogPrimitive.Trigger asChild>
          <EditIconWrapper>
            <EditIcon icon="pen" size="md" />
          </EditIconWrapper>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <ModalOverlay type="dark" />
          <ModalContent type="traits">
            {showOverlay && <ModalOverlay radius={true} />}
            <ModalHeader type="traits">
              <ModalHeaderWrapper type="trait">
                <ModalTitle fontSize="small">
                  {t('translation:modals.title.nonIndexableTraits')}
                </ModalTitle>
                <Icon
                  icon="close"
                  onClick={() => handleModalOpen(false)}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </ModalHeaderWrapper>
              <ModalDescription fontSize="small">
                {t(
                  'translation:modals.description.nonIndexableTraits',
                )}
              </ModalDescription>
              <div>
                <TabsInnerContentWrapper>
                  <TabContentHeader>
                    <TabContentHeaderItem width="sm" padding="leftSm">
                      {t('translation:tabs.action')}
                    </TabContentHeaderItem>
                    <TabContentHeaderItem width="lg">
                      {t('translation:tabs.category')}
                    </TabContentHeaderItem>
                    <TabContentHeaderItem width="lg">
                      {t('translation:tabs.variants')}
                    </TabContentHeaderItem>
                  </TabContentHeader>
                  {numerical.map((item) => (
                    <TabContentContainer>
                      <TabContentWrapper padding="rightSm" width="sm">
                        <ActionIconsContainer>
                          <IconWrapper delete={true}>
                            <StyledIcon icon="delete" />
                          </IconWrapper>
                          <Popover
                            trigger={
                              <Tooltip
                                type="traits"
                                children={
                                  <IconWrapper code={true}>
                                    <StyledIcon icon="code" />
                                  </IconWrapper>
                                }
                                text="Access developer mode"
                                width={176}
                              />
                            }
                            text={
                              <DeveloperModeText>
                                &#123;
                                <br />
                                traitbackground: valueGradient R-Y,
                                traitbackground: valueGradient B-G,
                                traitbackground, valueGradient G-W
                                traitbackground: valueGradient B-R
                                <br />
                                &#125;
                              </DeveloperModeText>
                            }
                            setShowOverlay={setShowOverlay}
                          />
                        </ActionIconsContainer>
                      </TabContentWrapper>
                      <TabContentWrapper width="lg" border="sides">
                        {item.category}
                      </TabContentWrapper>
                      <TabContentWrapper width="lg" flex={true}>
                        <TabContentWrapper>
                          {item.variants}
                        </TabContentWrapper>
                      </TabContentWrapper>
                    </TabContentContainer>
                  ))}
                  {addNewCategory && <NewCategoryField />}
                  <BottomGradient />
                </TabsInnerContentWrapper>
              </div>
            </ModalHeader>
            <Divider />
            <ModalButtonsList justifyContent="flexEnd" noMargin="top">
              <ModalButtonWrapper type="trait">
                <ActionButton
                  type="outline"
                  size="small"
                  onClick={() => setAddNewCategory(true)}
                >
                  {t('translation:modals.buttons.addCategory')}
                </ActionButton>
              </ModalButtonWrapper>
              <ModalButtonWrapper type="trait">
                <ActionButton
                  type="primary"
                  size="small"
                  onClick={() => handleModalOpen(false)}
                >
                  {t('translation:modals.buttons.confirm')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </ModalContent>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

const numerical = [
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '1',
  },
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '2',
  },
];
