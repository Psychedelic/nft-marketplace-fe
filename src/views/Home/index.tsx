import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Wrapper, Logo } from './styles';
import logo from '../../assets/logo.png';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <Logo src={logo} className="App-logo" alt="logo" />
        <p>{t('translation:common.title')}</p>
      </Wrapper>
    </Container>
  );
};

export default Home;
