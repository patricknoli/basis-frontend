import { createContext, useEffect, useState } from "react";
import { AppContextInitialValues, AppContextType, AppProviderProps, UserType } from "./types";

export const AppContext = createContext<AppContextType>(
  // @ts-ignore
  AppContextInitialValues
);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<"pt-br" | "en-us">("pt-br");
  const [user, setUser] = useState<UserType[] | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<"owner" | "tenant" | null>(null);

  function updateUser(auth_user: UserType[]) {
    setUser(auth_user);
  }

  function changeLanguage(lang: "pt-br" | "en-us") {
    setLang(lang);
  }

  function changeProfile(selected_profile: "owner" | "tenant") {
    setProfile(selected_profile)
  }

  useEffect(() => {
    if(!!user && user.length > 0) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user])

  return (
    <AppContext.Provider value={{
      updateUser,
      changeLanguage,
      changeProfile,
      lang,
      user,
      authenticated,
      profile
    }}>
      {children}
    </AppContext.Provider>
  )
}