import React, { useState } from 'react';

import Text from './_text';

import { GrepTableOfContent } from '..';

const Standard = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [scrollTarget, setScrollTarget] = useState<HTMLElement>();
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        overflow: 'scroll',
        height: '100vh',
      }}
      ref={(el) => setScrollTarget(el as HTMLElement)}
    >
      <GrepTableOfContent
        container={container as HTMLElement}
        scrollTarget={scrollTarget}
        onSelected={console.log}
        style={{
          flex: '0 0 300px',
          overflow: 'hidden',
          padding: 20,
          position: 'sticky',
          top: 0,
        }}
        percentageRendered={100}
        setSelectedValue={() => {
          console.log('selected value');
        }}
      />
      <div style={{ flex: '1 1 auto' }}>
        <div
          style={{ margin: '0 auto' }}
          ref={(el) => setContainer(el as HTMLElement)}
        >
          <Text />
        </div>
      </div>
    </div>
  );
};

export default Standard;
