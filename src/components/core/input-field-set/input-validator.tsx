import React, { forwardRef, useCallback } from 'react';
import { AppLog } from '../../../utils/log';
import { Input } from './styles';

export type InputValidatorProps = React.ComponentProps<
  typeof Input
> & {
  validator?: 'wicp';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * Currently the validator going to stop the
 * change event if the new value is invalid.
 * New validators can be added here in the future.
 */
const useValidatorCallback = (
  validator: InputValidatorProps['validator'],
  onChange: InputValidatorProps['onChange'],
) =>
  useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      try {
        switch (validator) {
          case 'wicp':
            if (!e.currentTarget.value.match(/^\d*((.\d{0,8})|)$/))
              throw new Error('ValidatorError');
            break;
          default:
        }

        if (onChange) onChange(e);
      } catch (error) {
        // Log only if is a unknown error
        if (
          error instanceof Error &&
          error.message !== 'ValidatorError'
        ) {
          AppLog.error(
            'Invalid input typing',
            `[validator: ${validator}]`,
            error,
          );
        }

        e.stopPropagation();
      }
    },
    [validator, onChange],
  );

export const InputValidator: React.VFC<InputValidatorProps> =
  forwardRef<HTMLInputElement, InputValidatorProps>(
    ({ validator, onChange, ...inputProps }, ref) => {
      const changeValidation = useValidatorCallback(
        validator,
        onChange,
      );

      return (
        <Input
          ref={ref}
          {...inputProps}
          onChange={changeValidation}
        />
      );
    },
  );
