import { Avatar, Drawer, Popover } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { BiChevronLeft } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";

const Header: React.FC<{ home?: boolean; back?: boolean; backAction?: () => void }> = ({ home, back, backAction }) => {
  const { userName, profile } = useContext(AppContext);
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <div className="py-2 px-4 w-full z-40 fixed top-0 left-0 bg-white shadow-md flex items-center">
        {home && (
          <Link to={profile == "owner" ? "/home" : "/home/tenant"} className="md:hidden">
            <CiHome size={24} />
          </Link>
        )}
        {back && backAction && (
          <button onClick={() => backAction()}>
            <BiChevronLeft size={24} />
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto cursor-pointer" onClick={() => setOpenDropDown(true)}>
          <Avatar className="">{userName?.slice(0, 1)}</Avatar>
          <span className="hidden md:block text-sm">{userName}</span>
          <MdExpandMore className="hidden md:block" />
        </div>

        {isMobile ? (
          <Drawer open={openDropdown} onClose={() => setOpenDropDown(false)}
            anchor="bottom">
            <div className="flex flex-col gap-1 py-2">
              <DropdownMenu />
            </div>
          </Drawer>
        ) : (
          <Popover
            id="profile-dropdown"
            open={openDropdown}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 60, left: 2000 }}
            onClose={() => setOpenDropDown(false)}
          >
            <div className="bg-white shadow-md w-[300px] flex flex-col gap-1 py-2">
              <DropdownMenu />
            </div>
          </Popover>
        )}
      </div>
    </>
  )
}

export default Header;