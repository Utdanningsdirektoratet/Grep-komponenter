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

export const createButton = (type: ButtonType): Button => {
  switch (type) {
    case ButtonType.bold:
      return {
        type,
        children: <FormatBold />,
      };
    case ButtonType.italic:
      return {
        type,
        children: <FormatItalic />,
      };
  }
};
