import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Internal";
import Container from "../../../components/Container";
import { AddressType, ReceiptHistoryItemType, ReceiptType } from "../types";
import { MdArrowBack, MdKeyboardArrowDown } from "react-icons/md";
import receiptsOk from "../../../assets/receipts-ok.png";
import historyOk from "../../../assets/history-receipts-ok.png";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { i18n } from "../../../i18n";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent } from "@mui/material";
import { api } from "../../../services/api";
import ReceiptItem from "./ReceiptItem";
import ReceiptHistoryItem from "./ReceipHistorytItem";

const AddressReceipts: React.FC = () => {
  const { lang, user } = useContext(AppContext);
  const tenant = user?.find((item) => item.correntista[0].tipocorrentista == "L");
  const navigate = useNavigate();
  const location = useLocation();
  const address: AddressType = location.state;
  const payPreference = localStorage.getItem('payment');
  const [receipts, setReceitps] = useState<ReceiptType[]>([]);
  const [receiptsHistory, setReceiptsHistory] = useState<ReceiptHistoryItemType[]>([]);

  async function getReceipts() {
    try {
      const response = await api.get('/correntistas/locatario/recibos/listarAbertos', {
        headers: {
          idCorrentista: tenant?.correntista[0].idcorrentista,
          idImovel: address.idImovel
        }
      })

      if (response.status == 200) {
        setReceitps(response.data);
      }
    } catch (error) { }
  }

  async function getReceiptsHistory() {
    try {
      const response = await api.get('/correntistas/locatario/recibos/listarPagos', {
        headers: {
          idCorrentista: tenant?.correntista[0].idcorrentista,
          idImovel: address.idImovel
        }
      })
      if (response.status == 200) {
        setReceiptsHistory(response.data);
      }
    } catch (error) { }
  }

  useEffect(() => {
    !payPreference && localStorage.setItem('payment', 'boleto');
    getReceipts();
    getReceiptsHistory();
  }, [])

  return (
    <>
      <Container>
        <Header back backAction={() => navigate('/receipts')} />

        <Link to="/receipts" className="hidden md:flex items-center gap-2 text-zinc-500">
          <MdArrowBack />
          {i18n[lang].receitps_address_back_button}
        </Link>

        <h1 className="text-4xl mt-8">{address.nome}</h1>

        <div className="px-4 md:px-8 pt-4 pb-8 bg-[#EAEBF0] shadow-md rounded mt-9">
          <h2 className="text-2xl">{i18n[lang].receitps_address_title}</h2>
          <p className="text-sm text-zinc-500">{i18n[lang].receitps_address_warning}</p>

          <div className="grid md:grid-cols-3 mt-6 gap-5">
            {receipts.map((receipt) => (
              <Card key={receipt.idrecibo}>
                <CardContent>
                  <ReceiptItem receipt={receipt} />
                </CardContent>
              </Card>
            ))}
          </div>

          {receipts.length == 0 && (
            <div>
              <img className="mx-auto mt-12" src={receiptsOk} alt="" />
              <h3 className="mt-4 text-xl text-center font-medium">{i18n[lang].receipts_address_empty_state}</h3>
            </div>
          )}
        </div>

        <div className="px-4 md:px-8 pt-4 pb-8 bg-[#EAEBF0] shadow-md rounded mt-9">
          <h2 className="text-2xl mb-4">{i18n[lang].receitps_address_history_title}</h2>

          {receiptsHistory.map((item) => (
            <Accordion className="mt-3" key={item.ano}>
              <AccordionSummary expandIcon={<MdKeyboardArrowDown />}>
                {item.ano}
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid md:grid-cols-3 mt-6 gap-5">
                  {item.recibos.map((receipt) => (
                    <Card key={receipt.idrecibo}>
                      <CardContent>
                        <ReceiptHistoryItem receipt={receipt} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}

          {receiptsHistory.length == 0 && (
            <div>
              <img className="mx-auto mt-12 w-[190px]" src={historyOk} alt="" />
              <h3 className="mt-4 text-xl text-center font-medium">{i18n[lang].receitps_address_history_empty_state}</h3>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

export default AddressReceipts;