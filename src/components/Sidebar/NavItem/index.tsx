import { useLocation, useNavigate } from "react-router-dom";
import { NavItemProps } from "./types";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";

const NavItem: React.FC<NavItemProps> = ({ pathname, children, icon }) => {
  const { theme } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button className={`py-2 px-4 flex items-center gap-2 rounded hover:opacity-[0.75]`}
      onClick={() => navigate(pathname)}
      style={{
        backgroundColor: pathname == location.pathname ? theme.primary : '',
        color: pathname == location.pathname ? theme.secondary : ''
      }}
    >
      <div className={`${pathname == location.pathname ? 'text-white' : 'text-[#7E84A3]'}`}>{icon}</div>
      {children}
    </button>
  )
}

export default NavItem;