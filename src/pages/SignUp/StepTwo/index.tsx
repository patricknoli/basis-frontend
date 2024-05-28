import { useContext, useState } from "react";
import { i18n } from "../../../i18n";
import { AppContext } from "../../../contexts/AppContext";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Snackbar } from "@mui/material";
import { StepTwoProps } from "./types";
import { api } from "../../../services/api";
import Button from "../../../components/Button";

const StepTwo: React.FC<StepTwoProps> = ({ next, email }) => {
  const { lang } = useContext(AppContext);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  async function validateCode() {
    setLoading(true);
    try {
      if (code.length < 6) {
        setSnackText("Insira o código para continuar");
        setTimeout(() => {
          setOpenSnack(true);
        }, 1500)
        return
      }
      const response = await api.get('/usuario/validar', {
        headers: {
          "email": email,
          "codigo": code,
        }
      });
      if (response.status == 200) {
        setTimeout(() => {
          next();
        }, 1500)
      } else {
        setSnackText(response.data.message);
        setTimeout(() => {
          setOpenSnack(true);
        }, 1500)
      }
    } catch (error) { }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].sign_up_second_step_title}</h1>
      <p className="mt-3 text-xs md:text-base">{i18n[lang].sign_up_second_step_subtitle}</p>

      <MuiOtpInput className="my-6" length={6}
        onChange={(value) => setCode(value)} value={code} />

      <Button className="w-full" loading={loading} forwardIcon action={() => validateCode()}>
        Próximo
      </Button>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={snackText}
      />
    </>
  )
}

export default StepTwo