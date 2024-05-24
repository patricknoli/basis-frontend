import { Avatar } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { BiChevronLeft } from "react-icons/bi";

const Header: React.FC<{ home?: boolean; back?: boolean; backAction?: () => void }> = ({ home, back, backAction }) => {
  const { userName } = useContext(AppContext);

  return (
    <>
      <div className="py-2 px-4 w-full z-40 fixed top-0 left-0 bg-white shadow-md flex items-center">
        {home && (
          <Link to="/home" className="md:hidden">
            <CiHome size={24} />
          </Link>
        )}
        {back && backAction && (
          <button onClick={() => backAction()}>
            <BiChevronLeft size={24} />
          </button>
        )}
        <Avatar className="ml-auto">{userName?.slice(0, 1)}</Avatar>
      </div>
    </>
  )
}

export default Header;