import { DesignTokensDefinition } from '@contentful/experience-builder-core';

export const designTokens: DesignTokensDefinition = {
  colors: {
    White: '#fff',
    Black: '#000',
    Gray: '#555',
    Red: '#f00',
    Green: '#0f0',
    Blue: '#00f',
  },
  spacing: {
    None: '0',
    Xs: '4px',
    Sm: '8px',
    Md: '16px',
    Lg: '32px',
    Xl: '64px',
    '2Xl': '96px',
    '3Xl': '128px',
  },
  borders: {
    White: { size: '1px', color: '#fff' },
    Black: { size: '1px', color: '#000' },
    Gray: { size: '1px', color: '#555' },
    Red: { size: '1px', color: '#f00' },
    Green: { size: '1px', color: '#0f0' },
    Blue: { size: '1px', color: '#00f' },
  },
  // This is a custom example token that is not used in the app
  // but demonstrates the type of tokens that can be defined
  unusedCustomExampleTokens: {
    Key: 'value',
    Object: {
      Key: 'value',
    },
    Nested: {
      Object: {
        Key: 'value',
      },
    },
  },
};
