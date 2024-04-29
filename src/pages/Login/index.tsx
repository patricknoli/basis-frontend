import { useContext } from "react"
import { i18n } from "../../i18n"
import { AppContext } from "../../contexts/AppContext"
import Header from "../../components/Header/External";
import Button from "../../components/Button";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { lang } = useContext(AppContext);

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-3xl font-bold">{i18n[lang].login_title}</h1>
        <p className="mt-3">{i18n[lang].login_subtitle}</p>

        <form className="flex flex-col gap-3 my-6">
          <input type="text" placeholder={i18n[lang].login_input_document} />
          <input type="text" placeholder={i18n[lang].login_input_password} />

          <Link className="text-sm font-semibold mb-6" to="/login/reset">
            {i18n[lang].login_forgot_password}
          </Link>

          <Button width="full" icon={<BiChevronRight />}> 
            Login
          </Button>
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