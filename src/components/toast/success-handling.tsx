import React, { useEffect } from 'react';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastProvider,
} from './styles';
import {
  notificationActions,
  useAppDispatch,
  useErrorsStore,
} from '../../store';
import { Icon } from '../icons';

const SuccessHandling = () => {
  const [open, setOpen] = React.useState(false);
  const { successMessages } = useErrorsStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (successMessages) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastProvider swipeDirection="right">
      {successMessages.map((successMessage) => (
        <Toast
          state="success"
          key={successMessage.id}
          open={open}
          onOpenChange={setOpen}
          duration={5000}
        >
          <ToastDescription asChild>
            <div>
              <Icon icon="check" size="md" paddingRight />
              <ToastDescriptionText>
                {successMessage.message}
              </ToastDescriptionText>
            </div>
          </ToastDescription>

          <Icon
            icon="close-circle"
            size="md"
            onClick={() =>
              dispatch(
                notificationActions.removeSuccessMessage(
                  successMessage.id,
                ),
              )
            }
          />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export default SuccessHandling;
