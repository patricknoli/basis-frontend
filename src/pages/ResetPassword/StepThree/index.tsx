import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { AppContext } from "../../../contexts/AppContext";
import { FieldValues, useForm } from "react-hook-form";
import { InputAdornment, Snackbar, TextField } from "@mui/material";
import { BiLock } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward } from "react-icons/md";
import { api } from "../../../services/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { StepThreeProps } from "./types";

const StepThree: React.FC<StepThreeProps> = ({code, document, next}) => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [ openSnack, setOpenSnack ] = useState<boolean>(false);
  const [ snackText, setSnackText ] = useState<string>("");
  const [ passwordShow, setPasswordShow ] = useState<boolean>(false);
  const [ confirmPasswordShow, setConfirmPasswordShow ] = useState<boolean>(false);

  async function createNewPassword(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      if(fields.password != fields.password_confirm) {
        setSnackText("As senhas não conferem");
        setOpenSnack(true);
        setIsSubmitting(false);
        return
      }

      let response = await api.get('/usuario/atualizarSenha', {
        headers: {
          "cpfcnpj": document,
          "codigo": code,
          "idBanco": 5,
          "senha": fields.password
        }
      })

      if(response.status == 200) {
        next();
      } else {
        setSnackText("Erro ao atualizar a senha");
        setOpenSnack(true);
      }
      setIsSubmitting(false);
    } catch(error) {
      setSnackText("Erro ao atualizar a senha");
      setOpenSnack(true);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].reset_pass_third_step_title}</h1>
      <p className="mt-3 text-xs md:text-base w-[55%]">{i18n[lang].reset_pass_third_step_subtitle}</p>

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

        <TextField type={passwordShow ? "text" : "password"} {...register('password_confirm')} 
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

        <LoadingButton variant="contained" startIcon={<MdArrowForward />}
        loading={isSubmitting} type="submit"> 
          Próximo
        </LoadingButton>
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