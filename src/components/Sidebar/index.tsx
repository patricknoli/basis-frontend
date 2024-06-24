import { ButtonGroup } from "@mui/material";
import { MdFileDownload, MdFolder, MdHelp, MdList } from "react-icons/md";
import NavItem from "./NavItem";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const Sidebar: React.FC = () => {
  const { profile, dataId } = useContext(AppContext);

  return (
    <nav className="hidden md:block w-[300px] h-full shadow-md z-50 fixed left-0 top-0">
      <div className="px-6 py-2 flex bg-white justify-center items-center gap-3">
        <img src={`https://images.locacaonet.basissistemas.com.br/${dataId}/logo.jpg`} alt="" className="w-[70px]" />
        <h1 className="font-extrabold text-2xl">Logo Empresa</h1>
      </div>
      <div className="p-6 bg-[#F5F6FA] flex flex-col jusitify-center">
        {profile == "owner" && (
          <ButtonGroup orientation="vertical" className="w-full"
            style={{
              backgroundColor: "#f0f0f0"
            }}>
            <NavItem pathname="/real-estates"
              icon={<MdList />}>
              Imóveis
            </NavItem>
            <NavItem pathname="/income-reports"
              icon={<MdFileDownload />}>
              Informes
            </NavItem>
            <NavItem pathname="/documents"
              icon={<MdFolder />}>
              Documentos
            </NavItem>
          </ButtonGroup>
        )}
        {profile == "tenant" && (
          <ButtonGroup orientation="vertical" className="w-full"
            style={{
              backgroundColor: "#f0f0f0"
            }}>
            <NavItem pathname="/receipts"
              icon={<MdList />}>
              Boletos
            </NavItem>
            <NavItem pathname="/documents/tenant"
              icon={<MdFolder />}>
              Documentos
            </NavItem>
          </ButtonGroup>
        )}

        <p className="mt-6 text-sm text-[#A1A7C4]">Outras informações</p>
        <ButtonGroup orientation="vertical" className="w-full mt-3"
          style={{
            backgroundColor: "#f0f0f0"
          }}>
          <NavItem pathname="/videos"
            icon={<MdHelp />}>
            Vídeos
          </NavItem>
        </ButtonGroup>
      </div>
    </nav>
  )
}

export default Sidebar