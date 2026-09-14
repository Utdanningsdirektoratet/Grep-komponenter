import React from 'react';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatSuperscript from '@mui/icons-material/Superscript';
import FormatSubscript from '@mui/icons-material/Subscript';
export interface Button {
  type: ButtonType;
  children: React.ReactNode;
}

export enum ButtonType {
  bold = 'bold',
  italic = 'italic',
  superscript = 'superscript',
  subscript = 'subscript',
}

export type AllowedStyles = keyof typeof ButtonType;

export const createButton = (style: AllowedStyles = 'bold'): Button => {
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
    case 'superscript':
      return {
        type: ButtonType[style],
        children: <FormatSuperscript fontSize="small" />,
      };
    case 'subscript':
      return {
        type: ButtonType[style],
        children: <FormatSubscript fontSize="small" />,
      };
  }
};
