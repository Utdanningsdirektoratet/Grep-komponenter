import React from 'react';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';

export type InlineStyle = 'bold' | 'italic' | 'strikethrough' | string;

export interface Button {
  type: ButtonType;
  children: React.ReactNode;
}

export enum ButtonType {
  bold = 'bold',
  italic = 'italic',
}

export type Style = keyof typeof ButtonType;

export const createButton = (style: Style): Button => {
  switch (style) {
    case 'bold':
      return {
        type: ButtonType[style],
        children: <FormatBold fontSize="small" />,
      };
    case 'italic':
      return {
        type: ButtonType[style],
        children: <FormatItalic fontSize="small" />,
      };
  }
};
