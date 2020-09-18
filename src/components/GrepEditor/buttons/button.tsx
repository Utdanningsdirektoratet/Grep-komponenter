import React from 'react';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';

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
        children: <FormatBold />,
      };
    case 'italic':
      return {
        type: ButtonType[style],
        children: <FormatItalic />,
      };
  }
};
