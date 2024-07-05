import { LoadingButton } from "@mui/lab"
import { Button as MuiButton } from "@mui/material"
import { ReactNode } from "react"
import { BiChevronRight } from "react-icons/bi"

const Button: React.FC<{ children: ReactNode, loading?: boolean, forwardIcon?: boolean, action?: () => void, className?: string, submit?: boolean }> = ({
  children,
  loading,
  forwardIcon,
  action,
  className,
  submit
}) => {

  return (
    <>
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
    </>
  )
}

export default Button