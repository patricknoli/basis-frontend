import { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { i18n } from "../../../i18n";
import { MuiOtpInput } from "mui-one-time-password-input";
import "./styles.css";
import { Button, Snackbar } from "@mui/material";
import { MdArrowForward } from "react-icons/md";
import { StepTwoProps } from "./types";

const StepTwo: React.FC<StepTwoProps> = ({saveCode, next}) => {
  const { lang } = useContext(AppContext);
  const [ code, setCode ] = useState<string>("");
  const [ openSnack, setOpenSnack ] = useState<boolean>(false);

  function handleNext() {
    if(code.length < 6) {
      setTimeout(() => {
        setOpenSnack(true);
      }, 1500)
    } else {
      saveCode(code);
      setTimeout(() => {
        next();
      }, 1500)
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].reset_pass_second_step_title}</h1>
      <p className="mt-3 text-xs md:text-base">{i18n[lang].reset_pass_second_step_subtitle}</p>

      <MuiOtpInput className="my-6" length={6} 
      onChange={(value) => setCode(value)} value={code} />
      
      <Button onClick={() => handleNext()} 
      variant="contained" startIcon={<MdArrowForward />}
      className="w-full">
        Próximo
      </Button>

      <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={() => setOpenSnack(false)}
      message="Insira o código para continuar"
      />
    </>
  )
}

export default StepTwo