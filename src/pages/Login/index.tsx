import { useContext, useState } from "react"
import { i18n } from "../../i18n"
import { AppContext } from "../../contexts/AppContext"
import Header from "../../components/Header/External";
import { Link, useNavigate } from "react-router-dom";
import { InputAdornment, Snackbar, TextField } from "@mui/material";
import { BiChevronRight, BiLock, BiUser } from "react-icons/bi";
import { FieldValues, useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import { LoadingButton } from "@mui/lab";
import { api } from "../../services/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { validateDocument } from "../../support/validateDocument";
import Hero from "../../components/Hero";

const Login: React.FC = () => {
  const { lang, updateUser } = useContext(AppContext);
  const { register, handleSubmit, watch } = useForm();
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const [ openSnack, setOpenSnak ] = useState<boolean>(false);
  const [ invalidDocument, setInvalidDocument ] = useState<boolean>(false);
  const [ passwordShow, setPasswordShow ] = useState<boolean>(false);
  const navigate = useNavigate();

  async function loginUser(fields: FieldValues) {
    setIsSubmitting(true);
    try {
      let response = await api.get('/login/usuario', {
        headers: {
          login: fields.login,
          senha: fields.password,
          idBanco: "5"
        }
      });
      if(response.status == 200) {
        updateUser(response.data);
        setTimeout(() => {
          setIsSubmitting(false);
          navigate('/real-estates');
        }, 1500)
      }
      
    } catch(error) {
      console.log(error);
      setTimeout(() => {
        setIsSubmitting(false);
        setOpenSnak(true);
      }, 1500);
    }
  }

  return (
    <>
      <div className="md:hidden">
        <Header />
      </div>
      <div className="flex h-[100vh]">
        <div className="hero hidden md:block basis-[45%]">
          <Hero />
        </div>
        <div className="p-5 flex items-start md:items-center justify-center basis-full md:basis-[55%]">
          <div className="max-w-[500px] w-full">
            <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].login_title}</h1>
            <p className="mt-3 text-xs md:text-base w-[55%] md:w-full">{i18n[lang].login_subtitle}</p>

            <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-3 my-6">
              <TextField label={i18n[lang].login_input_document} variant="outlined"
              error={invalidDocument}
              helperText={invalidDocument && i18n[lang].global_invalid_document_error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiUser />
                  </InputAdornment>
                ),
              }}
              inputProps={<input ref={withMask('cpf')}
              />}
              {...register('login', {
                onBlur: () => setInvalidDocument(!validateDocument(watch('login')))
              })} />
              <TextField type={passwordShow ? "text" : "password"} {...register('password')} 
              label={i18n[lang].login_input_password} variant="outlined"
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

              <Link className="text-xs md:text-sm font-semibold mb-6" to="/login/reset">
                {i18n[lang].login_forgot_password}
              </Link>

              <LoadingButton variant="contained" endIcon={<BiChevronRight />}
              loading={isSubmitting} type="submit"> 
                Login
              </LoadingButton>
            </form>

            <hr />

            <div className="flex items-center justify-between mt-6">
              <span className="text-xs md:text-base text-zinc-500 font-semibold">{i18n[lang].login_create_account_cta}</span>
              <Link className="text-xs md:text-base font-semibold" to="/sign-up">
                {i18n[lang].login_create_account_link}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={() => setOpenSnak(false)}
      message="Erro ao efetuar login"
      />
    </>
  )
}

export default Login