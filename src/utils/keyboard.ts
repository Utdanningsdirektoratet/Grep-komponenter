import { Key } from 'ts-keycode-enum';
import React from 'react';

export const onActivation = (cb: () => void) => (ev: React.KeyboardEvent) => {
  switch (ev.which) {
    case Key.Space:
      cb();
      break;
    default:
      break;
  }
};

export default {
  onActivation,
};
