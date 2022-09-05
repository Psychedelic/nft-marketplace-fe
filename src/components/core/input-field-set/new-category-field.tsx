import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TabContentContainer,
  TabContentWrapper,
  ActionIconsContainer,
  IconWrapper,
  StyledIcon,
} from '../../tabs/styles';
import { NewCategoryInput } from './styles';
import { Tooltip } from '../tooltip';

const NewCategoryField = () => {
  const { t } = useTranslation();

  return (
    <TabContentContainer>
      <TabContentWrapper padding="rightSm" width="md">
        <ActionIconsContainer>
          <Tooltip
            type="traits"
            children={
              <IconWrapper delete={true}>
                <StyledIcon icon="delete" />
              </IconWrapper>
            }
            text={t('translation:tooltip.delete')}
            width={200}
          />

          <Tooltip
            type="traits"
            children={
              <IconWrapper code={true}>
                <StyledIcon icon="code" />
              </IconWrapper>
            }
            text={t('translation:tooltip.code')}
            width={176}
          />
          <Tooltip
            type="traits"
            children={
              <IconWrapper>
                <StyledIcon icon="disable" />
              </IconWrapper>
            }
            text={t('translation:tooltip.disable')}
            width={220}
          />
        </ActionIconsContainer>
      </TabContentWrapper>
      <TabContentWrapper width="lg" border="sides">
        <NewCategoryInput type="text" />
      </TabContentWrapper>
      <TabContentWrapper width="lg">
        <NewCategoryInput type="text" />
      </TabContentWrapper>
    </TabContentContainer>
  );
};

export default NewCategoryField;
