import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  EditIconWrapper,
  EditIcon,
  ModalHeaderWrapper,
} from './styles';
import { ModalOverlay } from './modal-overlay';
import { EditTraitsTab } from '../tabs/edit-traits-tab';
import { Icon } from '../icons';

/* --------------------------------------------------------------------------
 * Edit Indexable Traits
 * --------------------------------------------------------------------------*/

export const EditIndexableTraitsModal = () => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  return (
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
        <ModalContent
          type="traits"
          onClick={() => showOverlay && setShowOverlay(false)}
        >
          {showOverlay && <ModalOverlay radius={true} />}
          <ModalHeader type="traits">
            <ModalHeaderWrapper type="trait">
              <ModalTitle fontSize="small">
                {t('translation:modals.title.indexableTrait')}
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
              {t('translation:modals.description.indexableTrait')}
            </ModalDescription>
            <EditTraitsTab
              setShowOverlay={setShowOverlay}
              handleModalOpen={handleModalOpen}
            />
          </ModalHeader>
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
