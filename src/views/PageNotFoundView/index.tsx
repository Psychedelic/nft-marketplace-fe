import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../../components/core';
import {
  Container,
  NotFoundWrapper,
  NotFoundIcon,
  NotFoundText,
  ButtonWrapper,
} from './styles';

/* --------------------------------------------------------------------------
 * Page Not Found View
 * --------------------------------------------------------------------------*/

const PageNotFoundView = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleViewCollections = () => {
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <NotFoundWrapper>
        <NotFoundIcon>
          {t('translation:emptyStates.notFoundTitle')}
        </NotFoundIcon>
        <NotFoundText>
          {t('translation:emptyStates.notFoundDescription')}
        </NotFoundText>
        <ButtonWrapper>
          <ActionButton
            type="primary"
            onClick={handleViewCollections}
          >
            {t('translation:emptyStates.homeButton')}
          </ActionButton>
        </ButtonWrapper>
      </NotFoundWrapper>
    </Container>
  );
};

export default PageNotFoundView;
