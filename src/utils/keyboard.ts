import React from 'react';
import { Key } from '../assets/keycodeEnum';

export const onActivation =
  (cb: (ev: React.KeyboardEvent) => void) => (ev: React.KeyboardEvent) => {
    switch (ev.key) {
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
