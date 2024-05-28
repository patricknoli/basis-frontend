import { createTheme } from "@mui/material";
import { ThemeType } from "../contexts/types";

export const muiTheme: any = (theme: ThemeType) => createTheme(
  {
    palette: {
      primary: { main: theme.primary },
      secondary: { main: theme.secondary },
      ...(theme.error && { error: { main: theme.error } }),
      ...(theme.warning && { warning: { main: theme.warning } }),
      ...(theme.info && { info: { main: theme.info } }),
      ...(theme.success && { success: { main: theme.success } })
    }
  })