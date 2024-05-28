import { LoadingButton } from "@mui/lab"
import { Button as MuiButton, ThemeProvider } from "@mui/material"
import { ReactNode, useContext } from "react"
import { BiChevronRight } from "react-icons/bi"
import { muiTheme } from "../../theme"
import { AppContext } from "../../contexts/AppContext"

const Button: React.FC<{ children: ReactNode, loading?: boolean, forwardIcon?: boolean, action?: () => void, className?: string, submit?: boolean }> = ({
  children,
  loading,
  forwardIcon,
  action,
  className,
  submit
}) => {
  const { theme } = useContext(AppContext)

  return (
    <>
      <ThemeProvider theme={muiTheme(theme)}>
        {!loading ? (
          <MuiButton type={submit ? "submit" : "button"} className={`!py-[8px] !text-[15px] ${className}`} variant="contained"
            endIcon={!!forwardIcon && <BiChevronRight />}
            onClick={() => !!action && action()}>
            {children}
          </MuiButton>
        ) : (
          <LoadingButton type={submit ? "submit" : "button"} className={`!py-[8px] !text-[15px] ${className}`} variant="contained" endIcon={!!forwardIcon && <BiChevronRight />}
            loading={loading} onClick={() => !!action && action()}>
            {children}
          </LoadingButton>
        )}
      </ThemeProvider>
    </>
  )
}

export default Button