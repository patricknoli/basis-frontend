import { useContext } from "react"
import { i18n } from "../../i18n"
import { AppContext } from "../../contexts/AppContext"

const Login: React.FC = () => {
  const { lang } = useContext(AppContext);

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl font-bold">{i18n[lang].login_title}</h1>
      </div>
    </>
  )
}

export default Login