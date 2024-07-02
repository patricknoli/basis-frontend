import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Internal";
import Container from "../../../components/Container";
import { AddressType } from "../types";
import { MdArrowBack } from "react-icons/md";
import receiptsOk from "../../../assets/receipts-ok.png";
import historyOk from "../../../assets/history-receipts-ok.png";

const AddressReceipts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address: AddressType = location.state;

  return (
    <>
      <Container>
        <Header back backAction={() => navigate('/receipts')} />

        <Link to="/receipts" className="hidden md:flex items-center gap-2 text-zinc-500">
          <MdArrowBack />
          Voltar
        </Link>

        <h1 className="text-4xl mt-8">{address.nome}</h1>

        <div className="px-8 pt-4 pb-8 bg-[#EAEBF0] shadow-md rounded mt-9">
          <h2 className="text-2xl">Suas faturas</h2>
          <p className="text-sm text-zinc-500">Lembre-se: os boletos podem demorar até 3 dias para serem atualizados aqui</p>

          <div>
            <img className="mx-auto mt-12" src={receiptsOk} alt="" />
            <h3 className="mt-4 text-xl text-center font-medium">Pode ficar tranquilo! Suas contas estão em dia :)</h3>
          </div>
        </div>

        <div className="px-8 pt-4 pb-8 bg-[#EAEBF0] shadow-md rounded mt-9">
          <h2 className="text-2xl">Faturas antigas</h2>

          <div>
            <img className="mx-auto mt-12 w-[190px]" src={historyOk} alt="" />
            <h3 className="mt-4 text-xl text-center font-medium">Você não possui histórico de boletos</h3>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AddressReceipts;