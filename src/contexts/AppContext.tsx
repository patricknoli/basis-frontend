import { createContext } from "react";
import { AppContextInitialValues, AppContextType, AppProviderProps } from "./types";

export const AppContext = createContext<AppContextType>(
  // @ts-ignore
  AppContextInitialValues
);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AppContext.Provider value={{
      lang: "pt-br"
    }}>
      {children}
    </AppContext.Provider>
  )
}