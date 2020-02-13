import React, { ReactNode, useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

interface Properties {
  show: boolean;
  overlay?: string;
  children?: ReactNode;
  minHeight?: number | string;
  minTime?: number;
}

export const LoadingOverlay: React.FC<Properties> = ({
  overlay = 'rgba(255,255,255, .5)',
  show,
  children,
  minTime,
  ...box
}: Properties) => {
  const [enabled, setEnabled] = useState(show);
  useEffect(() => {
    setTimeout(
      () => {
        setEnabled && setEnabled(show);
      },
      show ? 0 : minTime,
    );
  }, [show, minTime, setEnabled]);
  return (
    <Box position="relative" display="block" overflow={show ? 'hidden' : ''}>
      {children}
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        top={0}
        left={0}
        height="100%"
        width="100%"
        zIndex={enabled ? 999 : -999}
        style={{
          backgroundColor: overlay,
          opacity: show ? 1 : 0,
          transition: `opacity ${show ? 0 : minTime}ms ease`,
        }}
        {...box}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
