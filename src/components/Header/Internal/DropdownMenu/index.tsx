import { Avatar } from "@mui/material"
import { useContext } from "react";
import { MdLogout, MdOutlineChatBubbleOutline, MdOutlineGroup, MdOutlineSettings } from "react-icons/md"
import { AppContext } from "../../../../contexts/AppContext";
import { i18n } from "../../../../i18n";
import { useNavigate } from "react-router-dom";

const DropdownMenu: React.FC = () => {
  const { userName, user, lang, changeLanguage, changeProfile, profile, updateUser } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    updateUser([]);
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-2">
        <Avatar className="">{userName?.slice(0, 1)}</Avatar>
        <div className="">
          <p className="text-sm font-bold">{userName}</p>
          <p className="text-zinc-300">{i18n[lang].dropdown_menu_user_code_label}: {user && user[0].correntista[0].codigopesquisa}</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm" onClick={() => changeLanguage(lang == "pt-br" ? "en-us" : "pt-br")}>
        <MdOutlineChatBubbleOutline size={20} />
        {i18n[lang].dropdown_menu_change_lang_label}: {i18n[lang].dropdown_menu_change_lang_cta}
      </div>
      <hr />
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm" onClick={() => changeProfile(profile == "owner" ? "tenant" : "owner")}>
        <MdOutlineGroup size={20} />
        {i18n[lang].dropdown_menu_change_profile_label}
      </div>
      <hr />
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm" onClick={() => navigate('/login/reset')}>
        <MdOutlineSettings size={20} />
        {i18n[lang].dropdown_menu_change_password_label}
      </div>
      <hr />
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm" onClick={() => handleLogout()}>
        <MdLogout size={20} />
        {i18n[lang].dropdown_menu_logout_label}
      </div>
    </>
  )
}

export default DropdownMenu