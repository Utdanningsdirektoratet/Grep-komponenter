import { Editor } from 'draft-js';
import { Button } from '../buttons';

export interface ToolbarPropperties {
  editor: React.MutableRefObject<Editor>;
  buttons: Button[];
}
