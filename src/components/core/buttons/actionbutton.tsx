import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles.js';

interface ActionButtonProps {
  background?;
  outline?;
  text?;
  children?: React.ReactNode;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  background, // background = "filled"
  outline, // outline = "solid"
  text,
  children,
  onClick,
}) => (
  <Button
    onClick={onClick}
    backgroundColor={background}
    outline={outline}
    text={text}
  >
    {children}
  </Button>
);

ActionButton.defaultProps = {
  children: PropTypes.node,
  background: PropTypes.any,
  outline: PropTypes.any,
  text: PropTypes.any,
};
