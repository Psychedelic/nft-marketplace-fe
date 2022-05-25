import { useTranslation } from 'react-i18next';
import {
  AlertsContainer,
  AlertsWrapper,
  MessageContainer,
  Message,
} from './styles';
import { Icon } from '../icons';

/* --------------------------------------------------------------------------
 * Alerts Component
 * --------------------------------------------------------------------------*/

export const Alerts = () => {
  const { t } = useTranslation();

  return (
    <AlertsContainer>
      <AlertsWrapper>
        <MessageContainer>
          <Icon icon="warningOutline" />
          <Message>
            {t('translation:alerts.transactionsMessage')}
          </Message>
          <Message clickable>
            {t('translation:alerts.retryMessage')}
          </Message>
        </MessageContainer>
      </AlertsWrapper>
    </AlertsContainer>
  );
};
