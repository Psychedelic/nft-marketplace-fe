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
import closeWarning from '../../assets/close-warning.svg';
import { notificationActions, useAppDispatch, useErrorsStore } from '../../store';

const SuccessHandling = () => {
  const [open, setOpen] = React.useState(false);
  const { sucessMessages } = useErrorsStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sucessMessages) setOpen(true);
  }, []);

  return (
    <>
      <ToastProvider swipeDirection="right">
        {sucessMessages.map((sucessMessage) => (
          <Toast open={open} onOpenChange={setOpen} duration={500000000}>
            <ToastDescription state="success" asChild>
              <div>
                <ToastDescriptionText>{sucessMessage.message}</ToastDescriptionText>
              </div>
            </ToastDescription>
            <ToastActionIcon
              src={closeWarning}
              alt="close-warning"
              onClick={() => dispatch(notificationActions.removeSuccessMessage(sucessMessage.id))}
            />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </>
  );
};

export default SuccessHandling;
