import { useContext, useState } from "react"
import { i18n } from "../../i18n"
import { AppContext } from "../../contexts/AppContext"
import Header from "../../components/Header/External";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { BiChevronRight, BiLock, BiUser } from "react-icons/bi";
import { FieldValues, useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import { LoadingButton } from "@mui/lab";
import { api } from "../../services/api";

const Login: React.FC = () => {
  const { lang } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);

  async function loginUser(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      const params = {
        login: fields.login,
        senha: fields.password,
        idBanco: ""
      }
      let { data } = await api.get('/login/usuario', {params});
      console.log(data);
      setIsSubmitting(false);
    } catch(error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-3xl font-bold">{i18n[lang].login_title}</h1>
        <p className="mt-3">{i18n[lang].login_subtitle}</p>

        <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-3 my-6">
          <TextField label={i18n[lang].login_input_document} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiUser />
              </InputAdornment>
            ),
          }}
          inputProps={<input ref={withMask('cpf')} />}
          {...register('login')} />
          <TextField type="password" {...register('password')} 
          label={i18n[lang].login_input_password} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock />
              </InputAdornment>
            ),
          }}
          />

          <Link className="text-sm font-semibold mb-6" to="/login/reset">
            {i18n[lang].login_forgot_password}
          </Link>

          <LoadingButton variant="contained" endIcon={<BiChevronRight />}
          loading={isSubmitting} type="submit"> 
            Login
          </LoadingButton>
        </form>

        <hr />

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-zinc-500 font-semibold">{i18n[lang].login_create_account_cta}</span>
          <Link className="text-sm font-semibold" to="/register">
            {i18n[lang].login_create_account_link}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login