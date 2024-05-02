import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { AppContext } from "../../../contexts/AppContext";
import { InputAdornment, Snackbar, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { withMask } from "use-mask-input";
import { api } from "../../../services/api";
import { StepOneProps } from "./types";

const StepOne: React.FC<StepOneProps> = ({next}) => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [ openSnack, setOpenSnack ] = useState<boolean>(false);

  async function requestReset(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      let response = await api.get('usuario/recuperarSenha', {
        headers: {
          "cpfcnpj": fields.document,
          "idBanco": 5
        }
      });
      if(response.status == 200) {
        next();
      } else {
        setOpenSnack(true);
      }
      setIsSubmitting(false);
    } catch(error) {
      console.log(error);
      setIsSubmitting(false);
      setOpenSnack(true);
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold text-[#2F3367]">{i18n[lang].reset_pass_title}</h1>
      <p className="mt-3 text-xs w-[55%]">{i18n[lang].reset_pass_subtitle}</p>

      <form onSubmit={handleSubmit(requestReset)} className="flex flex-col gap-3 my-6">
        <div className="mb-6 flex flex-col gap-3">
          <TextField {...register('document')}
          label={i18n[lang].reset_pass_input_email} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdPerson />
              </InputAdornment>
            ),
          }}
          inputProps={<input ref={withMask('cpf')} />}
          />
        </div>

        <LoadingButton variant="contained" startIcon={<MdArrowForward />}
        loading={isSubmitting} type="submit"> 
          Próximo
        </LoadingButton>
      </form>

      <hr />

      <div className="flex items-center justify-between mt-6">
        <span className="text-xs text-zinc-500 font-semibold">{i18n[lang].reset_pass_remember_cta}</span>
        <Link className="text-xs font-semibold" to="/login">
          {i18n[lang].reset_pass_remember_link}
        </Link>
      </div>

      <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={() => setOpenSnack(false)}
      message="Erro ao solicitar a recuperação"
      />
    </>
  )
}

export default StepOne