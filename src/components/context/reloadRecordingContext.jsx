import { createContext, useContext, useState } from "react";

const ReloadRecordingContext = createContext();

export function ReloadRecordingProvider({ children }) {
  const [reload, setReload] = useState(false);
  return (
    <ReloadRecordingContext.Provider value={{ reload, setReload }}>
      {children}
    </ReloadRecordingContext.Provider>
  );
}

export function useReloadRecordingContext() {
  return useContext(ReloadRecordingContext);
}
