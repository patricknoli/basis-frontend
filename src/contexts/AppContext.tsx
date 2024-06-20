import { createContext, useEffect, useState } from "react";
import { AppContextInitialValues, AppContextType, AppProviderProps, ThemeType, UserType } from "./types";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext<AppContextType>(
  // @ts-ignore
  AppContextInitialValues
);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<"pt-br" | "en-us">("pt-br");
  const [user, setUser] = useState<UserType[] | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<"owner" | "tenant" | null>(null);
  const [userName, setUserName] = useState<string | undefined>("");
  const [theme, setTheme] = useState<ThemeType>(AppContextInitialValues.theme);
  const [dataId, setDataId] = useState<string | null>(null);
  const navigate = useNavigate();

  async function getTheme() {
    setTheme(theme);
  }

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
    if (!!user && user.length > 0) {
      setAuthenticated(true);
      setUserName(
        profile == "owner" ? user?.find((item) => item.correntista[0].tipocorrentista == "P")?.nome
          : user?.find((item) => item.correntista[0].tipocorrentista == "L")?.nome
      )
    } else {
      setAuthenticated(false);
    }
  }, [user])

  useEffect(() => {
    getTheme();
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    setDataId(urlParams.get("res"));
  }, [])

  return (
    <AppContext.Provider value={{
      updateUser,
      changeLanguage,
      changeProfile,
      lang,
      user,
      authenticated,
      profile,
      userName,
      theme,
      dataId
    }}>
      {children}
    </AppContext.Provider>
  )
}