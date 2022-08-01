import React, { useCallback } from 'react';
import {
  ToastViewport,
  Toast,
  ToastDescription,
  ToastDescriptionText,
  ToastProvider,
  StyledIcon,
  StyledIconWrapper,
} from './styles';
import {
  notificationActions,
  NotificationMessage,
  useAppDispatch,
  useErrorsStore,
} from '../../store';
import { Icon, Icons } from '../icons';

const ToastIcons: {
  [key in NotificationMessage['type']]: keyof typeof Icons;
} = {
  success: 'check',
  error: 'warning',
};

export const ToastHandler = () => {
  const { messages } = useErrorsStore();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (id: number) => {
      dispatch(notificationActions.removeMessage(id));
    },
    [dispatch],
  );

  return (
    <ToastProvider swipeDirection="right">
      {messages.map((message) => (
        <Toast
          key={message.id}
          onOpenChange={() => handleClose(message.id)}
          duration={5000}
          state={message.type}
        >
          <ToastDescription asChild>
            <div>
              <Icon
                icon={ToastIcons[message.type]}
                size="md"
                paddingRight
              />
              <ToastDescriptionText>
                {message.message}
              </ToastDescriptionText>
            </div>
          </ToastDescription>

          <StyledIconWrapper state={message.type}>
            <StyledIcon
              size="md"
              icon="close-circle"
              onClick={() => handleClose(message.id)}
            />
          </StyledIconWrapper>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
