import React from 'react';

import styled from 'styled-components/native';

import { sizing, styling } from '@styles/fonts';

import { TextProps, Styled } from '@core/types';

const Text = ({ children, type, ...props }: TextProps) => {
  const renderComponent = (style: TextProps = {}) => (
    <StyledText {...style} {...props}>
      {children}
    </StyledText>
  );

  switch (type) {
    case 'label':
      return renderComponent({
        color: 'DARK',
        weight: 'LIGHT',
        size: 'SMALL',
      });
    case 'title':
      return renderComponent({
        color: 'DARKEST',
        weight: 'REGULAR',
        size: 'LARGE',
      });

    default:
      return renderComponent();
  }
};

const StyledText = styled.Text<Styled<TextProps>>`
  color: ${({ theme, color }) => theme[color || 'DARKEST']};
  font-size: ${({ size }) =>
    (typeof size === 'string' ? sizing[size] : size) || sizing.MEDIUM}px;
  font-family: ${({ weight }) => styling[weight || 'LIGHT']};
`;

export default Text;
