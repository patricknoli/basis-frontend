import { BiChevronLeft } from "react-icons/bi";
import logo from "../../../assets/mock-logo.png";
import { Link } from "react-router-dom";

const Header: React.FC<{ backButton?: boolean }> = ({backButton}) => {
  return (
    <div className="p-5 relative">
      {backButton && (
        <Link className="absolute left-5" to="/login">
         <BiChevronLeft size={24} />
        </Link>
      )}
      <div className="flex gap-4 items-center justify-center">
        <img src={logo} alt="Logo" className="w-[30px]" />
        <h1 className="font-bold text-md">Logo Empresa</h1>
      </div>
    </div>
  )
}

export default Header