import { Divider, Snackbar } from "@mui/material"
import { ReceiptItemProps } from "./types"
import Button from "../../../../components/Button"
import { useContext, useState } from "react"
import { AppContext } from "../../../../contexts/AppContext"
import { i18n } from "../../../../i18n"
import { api } from "../../../../services/api"

const ReceiptHistoryItem: React.FC<ReceiptItemProps> = ({ receipt }) => {
  const { lang, dataId } = useContext(AppContext);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const [openSnack, setOpenSnack] = useState<boolean>(false);

  async function getReceiptFile() {
    try {
      const response = await api.get('/chamadaRelatorio/recibo', {
        headers: {
          idBanco: dataId,
          idRecibo: receipt.idrecibo
        }
      })
      if (response.status == 200) {
        if (isPWA) {
          window.location.assign(response.data.url);
        } else {
          window.open(response.data.url, "_blank");
        }
      }
    } catch (error) {
      setOpenSnack(true);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-xl font-medium ${receipt.status == "EM ATRASO" && "text-red-600"} leading-none`}>{receipt.datapagamento}</p>
          <span className="text-sm text-zinc-500 leading-none">Data de pagamento</span>
        </div>

        <span className="text-3xl">{i18n[lang].receipts_address_history_item_month[new Date(receipt.mesreferencia).getMonth()]}</span>
      </div>

      <p className="text-xl font-medium">R$ {receipt.valorpagamento}</p>
      <span className="text-sm text-zinc-500">Valor pago</span>

      <Divider className="!my-4" />

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-0 md:justify-between items-center">
        <Button action={() => getReceiptFile()}>Ver fatura</Button>
      </div>

      <Snackbar
        message="Erro ao obter a fatura"
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={1500}
      />
    </>
  )
}

export default ReceiptHistoryItem