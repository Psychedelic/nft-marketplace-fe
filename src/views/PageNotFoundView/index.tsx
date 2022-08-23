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
        <NotFoundIcon>404</NotFoundIcon>
        <NotFoundText>
          We can't find the page that you're looking for
        </NotFoundText>
        <ButtonWrapper>
          <ActionButton
            type="primary"
            onClick={handleViewCollections}
          >
            Take me home
          </ActionButton>
        </ButtonWrapper>
      </NotFoundWrapper>
    </Container>
  );
};

export default PageNotFoundView;
