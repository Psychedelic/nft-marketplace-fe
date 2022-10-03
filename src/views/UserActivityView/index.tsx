import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserActivityTable } from '../../components/tables';
import { Container, TitleWrapper, Title } from './styles';
import { useSettingsStore, usePlugStore } from '../../store';
import { NftMetadataBackground } from '../../components/collection-overview/styles';
import { verifyConnectedOwner } from '../../integrations/kyasshu/utils';

/* --------------------------------------------------------------------------
 * User Activity View Component
 * --------------------------------------------------------------------------*/

const UserActivityView = () => {
  const { t } = useTranslation();

  const { showAlerts } = useSettingsStore();

  const { isConnected, principalId: connectedPlugUser } =
    usePlugStore();

  const { id: plugPrincipal } = useParams();

  const isConnectedOwner = verifyConnectedOwner({
    isConnected,
    owner: connectedPlugUser,
    principalId: plugPrincipal,
  });

  return (
    <Container showAlerts={showAlerts}>
      <NftMetadataBackground />
      <TitleWrapper>
        <Title>
          {isConnectedOwner
            ? t('translation:activity.myActivity')
            : t('translation:activity.userActivity')}
        </Title>
      </TitleWrapper>
      <UserActivityTable />
    </Container>
  );
};

export default UserActivityView;
