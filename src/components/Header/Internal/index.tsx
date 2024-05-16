import { Avatar } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";

const Header: React.FC = () => {
  const { userName } = useContext(AppContext);

  return (
    <>
      <div className="py-2 px-4 w-full z-50 fixed top-0 left-0 shadow-md">
        <Avatar className="ml-auto">{userName?.slice(0, 1)}</Avatar>
      </div>
    </>
  )
}

export default Header;