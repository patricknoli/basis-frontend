export type AppProviderProps = {
  children: React.ReactNode;
}

export type AppContextType = {
  updateUser: (auth_user: UserType[]) => void;
  changeLanguage: (lang: "pt-br" | "en-us") => void;
  changeProfile: (profile: "owner" | "tenant") => void;
  saveToken: (token: string) => void;
  authenticated: boolean;
  lang: "pt-br" | "en-us";
  user: UserType[] | null;
  userName: string | undefined;
  profile: "owner" | "tenant" | null;
  theme: ThemeType;
  dataId: string | null;
  company: CompanyType | null;
}

export type CompanyType = {
  nome: string;
  url_facebook: string;
  url_instagram: string;
  url_x: string;
}

export type UserType = {
  nome: string;
  correntista: AccountHolderType[]
}

export type AccountHolderType = {
  idcorrentista: number;
  codigopesquisa: string;
  tipocorrentista: "P" | "L";
  idPerfil: number;
}

export type ThemeType = {
  primary: string;
  secondary: string;
  error?: string;
  warning?: string;
  info?: string;
  success?: string;
}

export const AppContextInitialValues = {
  lang: "pt-br",
  user: [],
  authenticated: false,
  theme: {
    primary: "#2196F3",
    secondary: "#1ff3da"
  }
}