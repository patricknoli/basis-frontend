import logo from "../../../assets/mock-logo.png";

const Header: React.FC = () => {
  return (
    <div className="flex gap-4 items-center p-5">
      <img src={logo} alt="Logo" className="w-10" />
      <h1 className="font-bold text-2xl">Logo Empresa</h1>
    </div>
  )
}

export default Header