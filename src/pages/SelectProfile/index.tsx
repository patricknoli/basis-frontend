import { useContext } from "react"
import { i18n } from "../../i18n"
import { AppContext } from "../../contexts/AppContext"
import Header from "../../components/Header/External";
import Hero from "../../components/Hero";
import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SelectProfile: React.FC = () => {
  const { lang, changeProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  function handleProfile(profile: "owner" | "tenant") {
    changeProfile(profile);
    localStorage.setItem('profile', profile);
    if (profile == "owner") {
      navigate(isMobile ? "/home" : "/real-estates")
    } else {
      navigate(isMobile ? "/receipts" : "/receipts");
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
            <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].select_profile_title}</h1>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md" onClick={() => handleProfile("owner")}>
                <CiHome size={45} />
                {i18n[lang].select_profile_owner_label}
              </button>
              <button className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md" onClick={() => handleProfile("tenant")}>
                <CiHome size={45} />
                {i18n[lang].select_profile_tenant_label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectProfile