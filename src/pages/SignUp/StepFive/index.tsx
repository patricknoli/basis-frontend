import { useContext } from "react"
import icon from "../../../assets/award-icon.png"
import { AppContext } from "../../../contexts/AppContext"
import { i18n } from "../../../i18n";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const StepFive: React.FC = () => {
  const { lang } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={icon} alt="" />

        <h1 className="text-[#2F3367] text-[22px] text-center font-bold w-[70%] mt-4">{i18n[lang].sign_up_fifth_step_title}</h1>
        <p className="text[#303468] text-[14px] mt-2 mb-6">{i18n[lang].sign_up_fifth_step_subtitle}</p>

        <Button className="w-full" forwardIcon
          action={() => navigate('/')}>
          {i18n[lang].sign_up_fifth_step_cta}
        </Button>
      </div>
    </>
  )
}

export default StepFive