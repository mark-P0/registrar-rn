import React, { createContext, useState } from 'react';

const ScheduleCodeContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(null!);
export default ScheduleCodeContext;

export const ScheduleCodeProvider = ({ children }: any) => {
  const ScheduleCodeState = useState<string>(null!);

  return (
    <ScheduleCodeContext.Provider value={ScheduleCodeState}>
      {children}
    </ScheduleCodeContext.Provider>
  );
};
