import { AllowedStyles } from '../../buttons';

export enum ToolbarActionKind {
  updateFormat = 'UPDATE_FORMAT',
  updateBoolean = 'UPDATE_BOOLEAN',
  reset = 'RESET',
}

export type ToolbarAction =
  | { type: ToolbarActionKind.reset; payload?: ToolbarState }
  | {
      type: ToolbarActionKind.updateBoolean;
      field: keyof Omit<ToolbarState, 'format'>;
      payload: boolean;
    }
  | {
      type: ToolbarActionKind.updateFormat;
      field: AllowedStyles;
      payload: boolean;
    };

export interface ToolbarState {
  isText: boolean;
  format: Set<AllowedStyles>;
}

export const ToolbarInitialState: ToolbarState = {
  isText: false,
  format: new Set(),
};

const modifySet = (
  set: Set<AllowedStyles>,
  toModify: AllowedStyles,
  add: boolean,
): Set<AllowedStyles> => {
  if (add) {
    return set.add(toModify);
  } else {
    set.delete(toModify);
    return set;
  }
};

// This is a local state reducer
export function ToolbarReducer(state: ToolbarState, action: ToolbarAction) {
  switch (action.type) {
    case ToolbarActionKind.reset:
      return action.payload ? { ...action.payload } : ToolbarInitialState;
    case ToolbarActionKind.updateBoolean:
      return { ...state, [action.field]: action.payload };
    case ToolbarActionKind.updateFormat:
      return {
        ...state,
        format: modifySet(state.format, action.field, action.payload),
      };
    default:
      return state;
  }
}
