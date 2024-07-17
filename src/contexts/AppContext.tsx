import { createContext, useEffect, useState } from "react";
import { AppContextInitialValues, AppContextType, AppProviderProps, CompanyType, ContactInfoType, ThemeType, UserType } from "./types";
import { api } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "../theme";
import { Helmet } from "react-helmet";

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
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [contact, setContact] = useState<ContactInfoType | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function getTheme() {
    try {
      const response = await api.get('/empresas/listarCores', {
        headers: {
          idBanco: dataId
        }
      })

      if (response.status == 200) {
        setTheme({
          primary: `#${response.data[0].corPrimaria}`,
          secondary: `#${response.data[0].corSecundaria}`
        });
        setContact({
          phone_1_view: `(${response.data[0].dd1}) ${response.data[0].telefone1}`,
          phone_1: `${response.data[0].dd1}${response.data[0].telefone1}`,
          phone_2_view: `(${response.data[0].dd2}) ${response.data[0].telefone2}`,
          phone_2: `${response.data[0].dd2}${response.data[0].telefone2}`,
          whatsapp: response.data[0].whatsapp,
          email: response.data[0].email
        })
      }
    } catch (error) {
    }
  }

  function updateUser(auth_user: UserType[]) {
    setUser(auth_user);
  }

  function changeLanguage(lang: "pt-br" | "en-us") {
    setLang(lang);
  }

  function changeProfile(selected_profile: "owner" | "tenant") {
    setProfile(selected_profile)
    setUserName(user?.find((item) => item.correntista[0].tipocorrentista == "L")?.nome)
    localStorage.setItem('profile', selected_profile)
  }

  function saveToken(token: string) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }

  async function verifyToken() {
    try {
      const token = localStorage.getItem('token');
      const savedProfile = localStorage.getItem('profile');
      if (token) {
        const response = await api.get('/login/validarToken', {
          headers: {
            token: token
          }
        });

        if (response.status == 200) {
          savedProfile == ("owner" || "tenant") && setProfile(savedProfile);
          updateUser(response.data);
          saveToken(token);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('profile');
          navigate('/');
        }
      }
    } catch (error) { }
  }

  async function getCompany() {
    try {
      const response = await api.get('/empresas/listar', {
        headers: {
          idBanco: dataId
        }
      });
      if (response.status == 200) {
        setCompany(response.data[0]);
      }
    } catch (error) { }
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
    getCompany();
    getTheme();
  }, [dataId])

  useEffect(() => {
    const url = new URL(window.location.href);
    const savedRes = localStorage.getItem('res');
    const res = url.searchParams.get('res');
    res && url.searchParams.set('res', res);
    savedRes && (!res || res == savedRes) && url.searchParams.set('res', savedRes);
    window.history.replaceState(null, "", url);
  }, [location.pathname]);

  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const res = urlParams.get("res");
    const savedRes = localStorage.getItem('res');
    const savedProfile = localStorage.getItem('profile');
    if (res && !savedRes) {
      res && localStorage.setItem('res', res);
      setDataId(res);
    } else {
      if (res !== savedRes) {
        res && localStorage.setItem('res', res);
        setDataId(res);
      } else {
        savedRes && setDataId(savedRes);
      }
    }
    if (savedProfile == ("tenant" || "owner")) {
      setProfile(savedProfile);
    }
    verifyToken();
  }, [])

  return (
    <AppContext.Provider value={{
      saveToken,
      updateUser,
      changeLanguage,
      changeProfile,
      lang,
      user,
      authenticated,
      profile,
      userName,
      theme,
      dataId,
      company,
      contact
    }}>
      <Helmet>
        <title>{company?.nome}</title>

        <link
          rel="shortcut icon"
          href={`https://images.locacaonet.basissistemas.com.br/${dataId}/logo.jpg`}
          type="image/jpeg"
        />

        <link rel="manifest" href={company?.url_manifest} />
      </Helmet>
      <ThemeProvider theme={muiTheme(theme)}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}