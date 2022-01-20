import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styles.js';

interface LinkButtonProps {
  background?;
  outline?;
  text?;
  children?: React.ReactNode;
  onClick: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  background,
  outline,
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

LinkButton.defaultProps = {
  children: PropTypes.node,
  background: PropTypes.any,
  outline: PropTypes.any,
  text: PropTypes.any,
};
