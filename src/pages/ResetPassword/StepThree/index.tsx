import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { AppContext } from "../../../contexts/AppContext";
import { FieldValues, useForm } from "react-hook-form";
import { InputAdornment, Snackbar, TextField } from "@mui/material";
import { BiLock } from "react-icons/bi";
import { api } from "../../../services/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { StepThreeProps } from "./types";
import PasswordStrengthBar from "react-password-strength-bar";
import Button from "../../../components/Button";

const StepThree: React.FC<StepThreeProps> = ({ code, document, next }) => {
  const { lang, dataId } = useContext(AppContext);
  const { register, handleSubmit, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false);

  async function createNewPassword(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      if (fields.password != fields.password_confirm) {
        setSnackText("As senhas não conferem");
        setOpenSnack(true);
        setIsSubmitting(false);
        return
      }

      let response = await api.get('/usuario/atualizarSenha', {
        headers: {
          "cpfcnpj": document,
          "codigo": code,
          "idBanco": dataId,
          "senha": fields.password
        }
      })

      if (response.status == 200) {
        next();
      } else {
        setSnackText("Erro ao atualizar a senha");
        setTimeout(() => {
          setOpenSnack(true);
        }, 1500);
      }
      setIsSubmitting(false);
    } catch (error) {
      setSnackText("Erro ao atualizar a senha");
      setTimeout(() => {
        setOpenSnack(true);
        setIsSubmitting(false);
      }, 1500)
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-regular text-[#2F3367]">{i18n[lang].reset_pass_third_step_title}</h1>
      <p className="mt-3 text-xs md:text-base">{i18n[lang].reset_pass_third_step_subtitle}</p>

      <form onSubmit={handleSubmit(createNewPassword)} className="flex flex-col gap-3 my-6">
        <TextField type={passwordShow ? "text" : "password"} {...register('password')}
          label={i18n[lang].reset_pass_third_step_input_password} variant="outlined"
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
          label={i18n[lang].reset_pass_third_step_input_password_confirm} variant="outlined"
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

        <Button forwardIcon loading={isSubmitting} submit>
          Próximo
        </Button>
      </form>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={snackText}
      />
    </>
  )
}

export default StepThree