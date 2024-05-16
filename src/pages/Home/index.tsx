import { useContext, useState } from "react"
import Container from "../../components/Container"
import Header from "../../components/Header/Internal"
import { AppContext } from "../../contexts/AppContext"
import { i18n } from "../../i18n"
import { CiHome } from "react-icons/ci"
import { Link } from "react-router-dom"
import { BiHelpCircle } from "react-icons/bi"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { IoShareOutline } from "react-icons/io5"
import { MdMoreVert } from "react-icons/md"

const Home: React.FC = () => {
  const { userName, lang } = useContext(AppContext);
  const [openInstall, setOpenInstall] = useState<boolean>(false);

  return (
    <Container>
      <Header />
      <div>
        <h1 className="font-semibold text-3xl mt-4 text-[#3A3541]">{i18n[lang].home_title} {userName}</h1>
        <p className="font-light text-lg mt-2">{i18n[lang].home_subtitle}</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link to="/real-states" className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md">
            <CiHome size={45} />
            <span className="text-sm">{i18n[lang].home_nav_real_state}</span>
          </Link>
          <Link to="/reports" className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md">
            <CiHome size={45} />
            <span className="text-sm">{i18n[lang].home_nav_reports}</span>
          </Link>
          <Link to="/documents" className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md">
            <CiHome size={45} />
            <span className="text-sm">{i18n[lang].home_nav_documents}</span>
          </Link>
          <Link to="/videos" className="px-4 py-6 flex flex-col gap-2 items-center rounded shadow-md">
            <CiHome size={45} />
            <span className="text-sm">{i18n[lang].home_nav_videos}</span>
          </Link>
        </div>

        <div className="mt-5">
          <p className="text-xs text-[#A1A7C4]">{i18n[lang].home_other_nav_cta}</p>
          <button className="p-4 w-full mt-2 flex gap-2 items-center rounded shadow-md"
            onClick={() => setOpenInstall(true)}>
            <BiHelpCircle size={20} color="#7E84A3" />
            <span className="text-sm">{i18n[lang].home_nav_pwa}</span>
          </button>
        </div>
      </div>

      <Dialog open={openInstall} onClose={() => setOpenInstall(false)}>
        <DialogTitle>
          {i18n[lang].home_pwa_dialog_title}
        </DialogTitle>
        <DialogContent>
          <p className="flex items-center gap-1 flex-wrap">
            <span>{i18n[lang].home_pwa_dialog_text_piece_one}</span> <IoShareOutline /> {i18n[lang].home_pwa_dialog_text_piece_two} <MdMoreVert />
            <span>{i18n[lang].home_pwa_dialog_text_piece_three}</span>
            <span>{i18n[lang].home_pwa_dialog_text_piece_four}</span>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInstall(false)}>
            {i18n[lang].home_pwa_dialog_close}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Home