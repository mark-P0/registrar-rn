import React, { createContext, useState } from 'react';

const SettingsContext = createContext<
  [{}, React.Dispatch<React.SetStateAction<{}>>]
>(null!);
export default SettingsContext;

export const SettingsProvider = ({ children }: any) => {
  const SettingsState = useState({});

  return (
    <SettingsContext.Provider value={SettingsState}>
      {children}
    </SettingsContext.Provider>
  );
};
