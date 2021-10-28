import React from 'react';
import { GrepDialog, GrepDialogOptions } from './dialog';

const GrepDialogServiceContext = React.createContext<
  (options: GrepDialogOptions) => void
>(() => null);

export const GrepDialogServiceProvider: React.FC = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogState, setDialogState] = React.useState<GrepDialogOptions>(
    {} as GrepDialogOptions,
  );

  const openDialog = (options: GrepDialogOptions) => {
    setDialogState(options);
    setDialogOpen(true);
  };

  return (
    <GrepDialogServiceContext.Provider value={openDialog}>
      <GrepDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        {...dialogState}
      />
      {children}
    </GrepDialogServiceContext.Provider>
  );
};

export const useGrepDialog = () => React.useContext(GrepDialogServiceContext);
