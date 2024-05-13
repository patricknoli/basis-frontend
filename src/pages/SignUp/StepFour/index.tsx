import { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { i18n } from "../../../i18n";
import { Button, Checkbox, Drawer, FormControlLabel, InputAdornment, Snackbar, TextField } from "@mui/material";
import { BiLock } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import PasswordStrengthBar from "react-password-strength-bar";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward } from "react-icons/md";
import { StepFourProps } from "./types";
import Terms from "./Terms";

const StepFour: React.FC<StepFourProps> = ({ next, email, document }) => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  async function createNewPassword(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      if (fields.password != fields.password_confirm) {
        setSnackText("As senhas não conferem");
        setOpenSnack(true);
        setIsSubmitting(false);
        return
      }

      let response = await api.post('/usuario/cadastro', {}, {
        headers: {
          cpfcnpj: document,
          email: email,
          idBanco: 5,
          senha: fields.password
        }
      })

      if (response.status == 200) {
        setTimeout(() => {
          next();
        }, 1500)
      } else {
        setSnackText("Erro ao realizar cadastro");
        setTimeout(() => {
          setOpenSnack(true);
        }, 1500);
      }
      setIsSubmitting(false);
    } catch (error) {
      setSnackText("Erro ao realizar cadastro");
      setTimeout(() => {
        setOpenSnack(true);
        setIsSubmitting(false);
      }, 1500)
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].sign_up_fourth_step_title}</h1>
      <p className="mt-3 text-xs md:text-base w-[75%]">{i18n[lang].sign_up_fourth_step_subtitle}</p>

      <form onSubmit={handleSubmit(createNewPassword)} className="flex flex-col gap-3 my-6">
        <TextField type={passwordShow ? "text" : "password"} {...register('password')}
          label={i18n[lang].sign_up_fourth_step_input_password} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment className="cursor-pointer" position="end"
                onClick={() => setPasswordShow(!passwordShow)}>
                {!passwordShow ? (
                  <IoMdEye />
                ) : (
                  <IoMdEyeOff />
                )}
              </InputAdornment>
            )
          }}
        />
        <PasswordStrengthBar password={watch('password')}
          scoreWords={i18n[lang].global_password_strength_words}
          shortScoreWord={i18n[lang].global_password_too_short}
        />

        <TextField type={confirmPasswordShow ? "text" : "password"} {...register('password_confirm')}
          label={i18n[lang].sign_up_fourth_step_input_password_confirm} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment className="cursor-pointer" position="end"
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}>
                {!confirmPasswordShow ? (
                  <IoMdEye />
                ) : (
                  <IoMdEyeOff />
                )}
              </InputAdornment>
            )
          }}
        />

        <FormControlLabel control={<Checkbox {...register('terms_accept')} onChange={(e) => setOpenDrawer(e.target.checked)} />}
          label={
            <span className="text-xs">Li e aceito <b>termos de uso</b></span>
          } />

        <LoadingButton variant="contained" startIcon={<MdArrowForward />}
          loading={isSubmitting} type="submit">
          Próximo
        </LoadingButton>
      </form>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}
        anchor="bottom">
        <div className="relative">
          <div className="pb-[90px]">
            <Terms />
          </div>
          <div className="fixed bottom-0 left-0 p-6 bg-white w-full flex justify-center">
            <Button className="w-[200px]" variant="contained" onClick={() => setOpenDrawer(false)}>
              Aceitar
            </Button>
          </div>
        </div>
      </Drawer>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={snackText}
      />
    </>
  )
}

export default StepFour