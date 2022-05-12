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

export const Error = () => {
  const [open, setOpen] = React.useState(false);
  const { errorMessages } = useErrorsStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessages) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastProvider swipeDirection="right">
      {errorMessages.map((error) => (
        <Toast
          key={error.id}
          open={open}
          onOpenChange={setOpen}
          duration={5000}
          state="error"
        >
          <ToastDescription asChild>
            <div>
              <Icon icon="warning" size="md" paddingRight />
              <ToastDescriptionText>
                {error.message}
              </ToastDescriptionText>
            </div>
          </ToastDescription>

          <Icon
            size="md"
            icon="close-circle"
            onClick={() =>
              dispatch(
                notificationActions.removeErrorMessage(error.id),
              )
            }
          />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
