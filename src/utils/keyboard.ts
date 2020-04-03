import { Key } from 'ts-keycode-enum';
import React from 'react';

export const onActivation = (cb: (ev: React.KeyboardEvent) => void) => (
  ev: React.KeyboardEvent,
) => {
  switch (ev.which) {
    case Key.Space:
    case Key.Enter:
      cb(ev);
      break;
    default:
      break;
  }
};

export default {
  onActivation,
};
