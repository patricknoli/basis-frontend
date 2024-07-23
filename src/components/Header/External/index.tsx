import { useContext } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext";

const Header: React.FC<{ backButton?: boolean }> = ({ backButton }) => {
  const { dataId, company } = useContext(AppContext);

  return (
    <div className="p-5 relative">
      {backButton && (
        <Link className="absolute left-5" to="/login">
          <BiChevronLeft size={24} />
        </Link>
      )}
      <div className={`flex gap-2 items-center ${backButton ? "justify-center" : "justify-start"}`}>
        <img src={`https://images.locacaonet.basissistemas.com.br/${dataId}/logo.jpg`} alt="Logo" className="w-[30px]" />
        <h1 className="font-bold text-md">{company?.nome}</h1>
      </div>
    </div>
  )
}

export default Header