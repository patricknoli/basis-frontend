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
import { validateDocument } from "../../../support/validateDocument";

const StepOne: React.FC<StepOneProps> = ({next, saveDocument}) => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit, watch } = useForm();
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [ openSnack, setOpenSnack ] = useState<boolean>(false);
  const [ invalidDocument, setInvalidDocument ] = useState<boolean>(false);

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
        saveDocument(fields.document);
      } else {
        setTimeout(() => {
          setOpenSnack(true);
        }, 1500);
      }
      setIsSubmitting(false);
    } catch(error) {
      console.log(error);
      setTimeout(() => {
        setIsSubmitting(false);
        setOpenSnack(true);
      }, 1500);
    }
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].reset_pass_title}</h1>
      <p className="mt-3 text-xs md:text-base w-[55%] md:w-full">{i18n[lang].reset_pass_subtitle}</p>

      <form onSubmit={handleSubmit(requestReset)} className="flex flex-col gap-3 my-6">
        <div className="mb-6 flex flex-col gap-3">
          <TextField {...register('document', {
            onBlur: () => setInvalidDocument(!validateDocument(watch('document')))
          })}
          error={invalidDocument}
          helperText={invalidDocument && i18n[lang].global_invalid_document_error}
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
        <span className="text-xs md:text-base text-zinc-500 font-semibold">{i18n[lang].reset_pass_remember_cta}</span>
        <Link className="text-xs md:text-base font-semibold" to="/login">
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