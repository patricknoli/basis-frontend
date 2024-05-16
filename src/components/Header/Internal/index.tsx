import { Avatar } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";

const Header: React.FC<{ home?: boolean }> = ({ home }) => {
  const { userName } = useContext(AppContext);

  return (
    <>
      <div className="py-2 px-4 w-full z-50 fixed top-0 left-0 bg-white shadow-md flex items-center">
        {home && (
          <Link to="/home" className="md:hidden">
            <CiHome size={24} />
          </Link>
        )}
        <Avatar className="ml-auto">{userName?.slice(0, 1)}</Avatar>
      </div>
    </>
  )
}

export default Header;