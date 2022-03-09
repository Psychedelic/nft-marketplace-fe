import React, { useEffect } from 'react';
// import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastDescriptionIcon,
  // ToastAction,
  ToastActionIcon,
  ToastProvider,
} from './styles';
import warning from '../../../assets/error-icon.svg';
import closeWarning from '../../../assets/close-warning.svg';
import {
  errorActions,
  useAppDispatch,
  useErrorsStore,
} from '../../../store';

export const Error = () => {
  const [open, setOpen] = React.useState(false);
  const { errorMessages } = useErrorsStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line
    errorMessages && setOpen(true);
  }, []);

  return (
    <>
      <ToastProvider swipeDirection="right">
        {/* eslint-disable-next-line */}
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
            {/* eslint-disable-next-line */}
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
