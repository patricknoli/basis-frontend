import { useLocation, useNavigate } from "react-router-dom";
import { NavItemProps } from "./types";

const NavItem: React.FC<NavItemProps> = ({pathname, children, icon}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button className={`py-2 px-4 flex items-center gap-2 rounded hover:opacity-[0.75]
      ${pathname == location.pathname && 'bg-black text-white'}
    `} onClick={() => navigate(pathname)}>
      <div className={`${pathname == location.pathname ? 'text-white' : 'text-[#7E84A3]'}`}>{icon}</div>
      {children}
    </button>
  )
}

export default NavItem;