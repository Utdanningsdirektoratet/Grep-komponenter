/**
 * UNCOMPLETE!!
 */
import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';

interface LinkProperties {
  contentState: ContentState;
  entityKey: string;
  children: import('react').ReactNode;
}

export const component = ({
  contentState,
  entityKey,
  children,
}: LinkProperties): JSX.Element => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} style={{ margin: 50 }}>
      {children}
    </a>
  );
};

export function strategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
): void {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

export default {
  strategy,
  component,
};
