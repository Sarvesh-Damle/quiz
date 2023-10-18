import { createContext, useState } from "react";

export const GamestateContext = createContext(null);

export const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};
