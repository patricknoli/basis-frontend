export type AppProviderProps = {
  children: React.ReactNode;
}

export type AppContextType = {
  updateUser: (auth_user: UserType[]) => void;
  changeLanguage: (lang: "pt-br" | "en-us") => void;
  authenticated: boolean;
  lang: "pt-br" | "en-us";
  user: UserType[] | null
}

export type UserType = {
  nome: string;
  correntista: AccountHolderType[]
}

export type AccountHolderType = {
  idcorrentista: number;
  codigopesquisa: string;
  tipocorrentista: "P" | "L";
}

export const AppContextInitialValues = {
  lang: "pt-br",
  user: [],
  authenticated: false
}