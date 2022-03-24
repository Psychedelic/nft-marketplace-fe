import React from 'react';
import { useTranslation } from 'react-i18next';
import { filterActions, useAppDispatch } from '../../../store';
import { Plug } from '../../plug';
import { ActionButton } from '../buttons';
import {
  EmptyStateWrapper,
  EmptyStateMessage,
  ButtonWrapper,
} from './styles';

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
        {buttonType === 'plug' ? (
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
            <Plug />
          </div>
        ) : (
          <ActionButton
            type="primary"
            text={buttonText}
            handleClick={() => {
              dispatch(
                filterActions.removeFilter(
                  `${t('translation:buttons.action.myNfts')}`,
                ),
              );
              dispatch(filterActions.setMyNfts(false));
            }}
          />
        )}
      </ButtonWrapper>
    </EmptyStateWrapper>
  );
};
