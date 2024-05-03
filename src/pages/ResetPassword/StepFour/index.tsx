import { useContext } from "react"
import icon from "../../../assets/award-icon.png"
import { AppContext } from "../../../contexts/AppContext"
import { i18n } from "../../../i18n";
import { Button } from "@mui/material";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StepFour: React.FC = () => {
  const { lang } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={icon} alt="" />

        <h1 className="text-[#2F3367] text-[22px] text-center font-bold w-[70%] mt-4">{i18n[lang].reset_pass_fourth_step_title}</h1>
        <p className="text[#303468] text-[14px] mt-2 mb-6">{i18n[lang].reset_pass_fourth_step_subtitle}</p>

        <Button className="w-full" variant="contained" endIcon={<MdArrowForward />}
        onClick={() => navigate('/login')}>
          {i18n[lang].reset_pass_fourth_step_cta_label}
        </Button>
      </div>
    </>
  )
}

export default StepFour