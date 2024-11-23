import { createContext, useContext, useEffect, useState } from "react";

const AutoAssignContext = createContext();

export function AutoAssignProvider({ children }) {
    // dung chung id-fullnam vơi powerMeters
  const [idAndFullName, setIdAndFullName] = useState(null);
  const [powerMeters, setPowerMeters] = useState([]);
  const [autoAssignData, setAutoAssignData] = useState([]);
  useEffect(() => {
      console.log(`powermeter: `, powerMeters);
  }, [powerMeters])
  return (
    <AutoAssignContext.Provider value={{  idAndFullName, setIdAndFullName, powerMeters, setPowerMeters, autoAssignData, setAutoAssignData}}>
      {children}
    </AutoAssignContext.Provider>
  );
}

export function useAutoAssignContext() {
  return useContext(AutoAssignContext);
}
