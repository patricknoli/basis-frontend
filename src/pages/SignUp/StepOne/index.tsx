import { useContext, useState } from "react"
import { i18n } from "../../../i18n"
import { StepOneProps } from "./types"
import { AppContext } from "../../../contexts/AppContext"
import { FieldValues, useForm } from "react-hook-form"
import { InputAdornment, Snackbar, TextField } from "@mui/material"
import { MdArrowForward, MdEmail } from "react-icons/md"
import { validateEmail } from "../../../support/validateEmail"
import { LoadingButton } from "@mui/lab"
import { api } from "../../../services/api"
import { Link } from "react-router-dom"

const StepOne: React.FC<StepOneProps> = ({ next, saveEmail }) => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);

  async function verifyEmail(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      if (invalidEmail || fields.email == "") {
        setSnackText("Insira um email válido");
        setOpenSnack(true);
        setIsSubmitting(false);
        return
      }

      const response = await api.get('/usuario/emailValidar', {
        headers: {
          email: fields.email
        }
      });
      if (response.status == 200) {
        next();
        saveEmail(fields.email);
      } else {
        setSnackText(response.data.message);
        setOpenSnack(true);
      }

    } catch (error) {
      setSnackText("Erro ao enviar o código!");
      setTimeout(() => {
        setOpenSnack(true);
        setIsSubmitting(false);
      }, 1500)
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].sign_up_first_step_title}</h1>
      <p className="mt-3 text-xs md:text-base w-[90%] md:w-full">{i18n[lang].sign_up_first_step_subtitle}</p>

      <form onSubmit={handleSubmit(verifyEmail)} className="flex flex-col gap-3 my-6">
        <div className="mb-6 flex flex-col gap-3">
          <TextField {...register('email', {
            onBlur: () => setInvalidEmail(!validateEmail(watch('email')))
          })}
            error={invalidEmail}
            helperText={invalidEmail && i18n[lang].global_invalid_email_error}
            label={i18n[lang].sign_up_first_step_input_email} variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <LoadingButton variant="contained" startIcon={<MdArrowForward />}
          loading={isSubmitting} type="submit">
          Próximo
        </LoadingButton>
      </form>

      <hr />

      <div className="flex items-center justify-between mt-6">
        <span className="text-xs md:text-base text-zinc-500 font-semibold">{i18n[lang].sign_up_first_step_login_cta}</span>
        <Link className="text-xs md:text-base font-semibold" to="/login">
          {i18n[lang].sign_up_first_step_login_link}
        </Link>
      </div>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={snackText}
      />
    </>
  )
}

export default StepOne