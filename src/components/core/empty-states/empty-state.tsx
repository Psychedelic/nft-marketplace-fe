import { useTranslation } from 'react-i18next';
import {
  filterActions,
  nftsActions,
  useAppDispatch,
} from '../../../store';
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

  return (
    <EmptyStateWrapper>
      <EmptyStateMessage>{message}</EmptyStateMessage>
      <ButtonWrapper>
        {buttonType === ButtonType.plug ? (
          // eslint-disable-next-line
          <div
            role="button"
            onClick={() => {
              dispatch(nftsActions.setLastIndex(undefined));
              dispatch(
                filterActions.removeFilter(
                  `${t('translation:buttons.action.myNfts')}`,
                ),
              );
              dispatch(filterActions.setMyNfts(false));
            }}
          >
            <Plug />
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
              dispatch(nftsActions.setLastIndex(undefined));
              dispatch(filterActions.setMyNfts(false));
              dispatch(filterActions.clearAllFilters());
              dispatch(
                filterActions.setSortingFilter(
                  `${t(
                    'translation:dropdown.priceFilter.all',
                  )}`,
                ),
              );
            }}
          >
            {buttonText}
          </ActionButton>
        )}
      </ButtonWrapper>
    </EmptyStateWrapper>
  );
};
