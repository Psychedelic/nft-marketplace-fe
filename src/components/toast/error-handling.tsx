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
  errorActions,
  useAppDispatch,
  useErrorsStore,
} from '../../store';

export const Error = () => {
  const [open, setOpen] = React.useState(false);
  const { errorMessages } = useErrorsStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessages) setOpen(true);
  }, []);

  return (
    <>
      <ToastProvider swipeDirection="right">
        {errorMessages.map((error) => (
          <Toast
            open={open}
            onOpenChange={setOpen}
            duration={500000000}
          >
            <ToastDescription asChild>
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
              onClick={() => dispatch(errorActions.removeErrorMessage(error.id))}
            />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </>
  );
};
