import React, { useEffect } from 'react';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastDescriptionIcon,
  ToastActionIcon,
  ToastProvider,
} from './styles';
import warning from '../../assets/error-icon.svg';
import closeWarning from '../../assets/close-warning.svg';
import {
  notificationActions,
  useAppDispatch,
  useErrorsStore,
} from '../../store';

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
        >
          <ToastDescription state="error" asChild>
            <div>
              <ToastDescriptionIcon
                src={warning}
                alt="warning-icon"
              />
              <ToastDescriptionText>
                {error.message}
              </ToastDescriptionText>
            </div>
          </ToastDescription>
          <ToastActionIcon
            src={closeWarning}
            alt="close-warning"
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
