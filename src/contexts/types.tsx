export type AppProviderProps = {
  children: React.ReactNode;
}

export type AppContextType = {
  lang: "pt-br" | "en-us"
}

export const AppContextInitialValues = {
  lang: "pt-br"
}