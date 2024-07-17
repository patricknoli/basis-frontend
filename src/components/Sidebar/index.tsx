import { ButtonGroup } from "@mui/material";
import { MdFileDownload, MdFolder, MdHelp, MdList } from "react-icons/md";
import NavItem from "./NavItem";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { i18n } from "../../i18n";

const Sidebar: React.FC = () => {
  const { profile, dataId, company, lang } = useContext(AppContext);

  return (
    <nav className="hidden md:block w-[300px] h-full shadow-md z-50 fixed left-0 top-0">
      <div className="px-6 py-2 flex bg-white justify-center items-center gap-3">
        <img src={`https://images.locacaonet.basissistemas.com.br/${dataId}/logo.jpg`} alt="" className="w-[70px]" />
        <h1 className="font-extrabold text-2xl">{company?.nome}</h1>
      </div>
      <div className="p-6 bg-[#F5F6FA] flex flex-col jusitify-center">
        {profile == "owner" && (
          <ButtonGroup orientation="vertical" className="w-full"
            style={{
              backgroundColor: "#f0f0f0"
            }}>
            <NavItem pathname="/real-estates"
              icon={<MdList />}>
              {i18n[lang].sidebar_owner_properties}
            </NavItem>
            <NavItem pathname="/income-reports"
              icon={<MdFileDownload />}>
              {i18n[lang].sidebar_owner_income_reports}
            </NavItem>
            <NavItem pathname="/documents"
              icon={<MdFolder />}>
              {i18n[lang].sidebar_owner_documents}
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
              {i18n[lang].sidebar_tenant_receipts}
            </NavItem>
            <NavItem pathname="/documents/tenant"
              icon={<MdFolder />}>
              {i18n[lang].sidebar_tenant_documents}
            </NavItem>
          </ButtonGroup>
        )}

        <p className="mt-6 text-sm text-[#A1A7C4]">{i18n[lang].sidebar_other_label}</p>
        <ButtonGroup orientation="vertical" className="w-full mt-3"
          style={{
            backgroundColor: "#f0f0f0"
          }}>
          <NavItem pathname="/videos"
            icon={<MdHelp />}>
            {i18n[lang].sidebar_videos}
          </NavItem>
        </ButtonGroup>
      </div>
    </nav>
  )
}

export default Sidebar