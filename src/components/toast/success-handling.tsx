import React, { useEffect } from 'react';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastActionIcon,
  ToastProvider,
} from './styles';
import closeWarning from '../../assets/close-warning.svg';
import {
  notificationActions,
  useAppDispatch,
  useErrorsStore,
} from '../../store';

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
          key={successMessage.id}
          open={open}
          onOpenChange={setOpen}
          duration={500000000}
        >
          <ToastDescription state="success" asChild>
            <div>
              <ToastDescriptionText>
                {successMessage.message}
              </ToastDescriptionText>
            </div>
          </ToastDescription>
          <ToastActionIcon
            src={closeWarning}
            alt="close-warning"
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
