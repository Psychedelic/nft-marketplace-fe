import React, { useEffect } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastDescriptionIcon,
  ToastAction,
  ToastActionIcon,
} from './styles';
import warning from '../../../assets/error-icon.svg';
import closeWarning from '../../../assets/close-warning.svg';
import { useErrorsStore } from '../../../store';

export const Error = () => {
  const [open, setOpen] = React.useState(false);
  const { nftsErrorMessage } = useErrorsStore();

  useEffect(() => {
    // eslint-disable-next-line
    nftsErrorMessage && setOpen(true);
  }, []);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {/* eslint-disable-next-line */}
      <Toast open={open} onOpenChange={setOpen} duration={500000000}>
        <ToastDescription asChild>
          <div>
            <ToastDescriptionIcon src={warning} alt="warning-icon" />
            <ToastDescriptionText>
              {nftsErrorMessage}
            </ToastDescriptionText>
          </div>
        </ToastDescription>
        <ToastAction asChild altText="Goto schedule to undo">
          {/* eslint-disable-next-line */}
          <ToastActionIcon src={closeWarning} alt="close-warning" />
        </ToastAction>
      </Toast>
      <ToastViewport />
    </ToastPrimitive.Provider>
  );
};

//  Pass in error message to redux state through the function
// get error from state and use it in respective components
