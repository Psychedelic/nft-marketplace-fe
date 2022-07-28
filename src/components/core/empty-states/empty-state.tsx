import { useTranslation } from 'react-i18next';
import { filterActions, useAppDispatch } from '../../../store';
import { ButtonType } from '../../../constants/empty-states';
import { Plug } from '../../plug';
import { ActionButton } from '../buttons';
import {
  EmptyStateWrapper,
  EmptyStateMessage,
  ButtonWrapper,
} from './styles';
import useMediaQuery from '../../../hooks/use-media-query';

export type EmptyStateProps = {
  message: string;
  buttonType?: string;
  buttonText?: string;
};

export const EmptyState = ({
  message,
  buttonType,
  buttonText,
}: EmptyStateProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  return (
    <EmptyStateWrapper>
      <EmptyStateMessage>{message}</EmptyStateMessage>
      <ButtonWrapper>
        {buttonType === ButtonType.plug ? (
          // eslint-disable-next-line
          <div
            role="button"
            onClick={() => {
              dispatch(
                filterActions.removeFilter(
                  `${t('translation:buttons.action.myNfts')}`,
                ),
              );
              dispatch(filterActions.setMyNfts(false));
            }}
          >
            <Plug isMobileScreen={isMobileScreen} />
          </div>
        ) : (
          <ActionButton
            size="wide"
            type="primary"
            onClick={() => {
              dispatch(
                filterActions.removeFilter(
                  `${t('translation:buttons.action.myNfts')}`,
                ),
              );
              dispatch(filterActions.setMyNfts(false));
              dispatch(filterActions.clearAllFilters());
            }}
          >
            {buttonText}
          </ActionButton>
        )}
      </ButtonWrapper>
    </EmptyStateWrapper>
  );
};
