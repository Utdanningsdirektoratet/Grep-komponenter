import React from 'react';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';

export type InlineStyle = 'BOLD' | 'ITALIC' | 'STRIKETHROUGH' | string;

export interface Button {
  type: string;
  children: React.ReactNode;
}

export enum ButtonType {
  bold = 'BOLD',
  italic = 'ITALIC',
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
