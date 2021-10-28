import React from 'react';
import { ConfirmationDialog, ConfirmationOptions } from './components/dialog';

const ConfirmationServiceContext = React.createContext<
  (options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

export const ConfirmationServiceProvider: React.FC = ({ children }) => {
  const [
    confirmationState,
    setConfirmationState,
  ] = React.useState<ConfirmationOptions | null>(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openDialog = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    setDialogOpen(true);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    awaitingPromiseRef.current?.resolve();
    setDialogOpen(false);
  };

  return (
    <ConfirmationServiceContext.Provider value={openDialog}>
      <ConfirmationDialog
        open={dialogOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...confirmationState}
      />
      {children}
    </ConfirmationServiceContext.Provider>
  );
};

export const useConfirmation = () =>
  React.useContext(ConfirmationServiceContext);
