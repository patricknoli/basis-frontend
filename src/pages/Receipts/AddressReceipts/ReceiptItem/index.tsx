import { Chip, Dialog, Divider, Snackbar } from "@mui/material"
import { ReceiptItemProps } from "./types"
import Button from "../../../../components/Button"
import { MdArrowDropDown, MdArrowDropUp, MdCopyAll, MdEmail, MdPhone, MdPix, MdRemoveRedEye, MdSmartphone, MdWhatsapp } from "react-icons/md"
import { useContext, useState } from "react"
import { api } from "../../../../services/api"
import { AppContext } from "../../../../contexts/AppContext"

const ReceiptItem: React.FC<ReceiptItemProps> = ({ receipt }) => {
  const { dataId, theme, contact } = useContext(AppContext);
  const payPreference = localStorage.getItem('payment');
  const [openPix, setOpenPix] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const [qrCode, setQrCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  function handlePayment(type: "pix" | "boleto") {
    localStorage.setItem('payment', type);
    if (type == "pix") {
      getQrCode();
    }
    if (type == "boleto") {
      navigator.clipboard.writeText(receipt.codigodebarras).then(() => {
        setOpenSnack(true);
      });
    }
  }

  async function getQrCode() {
    setLoading(true);
    try {
      const response = await api.get('/chamadaRelatorio/recibo/qrcodepix', {
        headers: {
          idBanco: dataId,
          idRecibo: receipt.idrecibo
        }
      })
      if (response.status == 200) {
        setQrCode(response.data.url);
        setOpenPix(true);
        setLoading(false);
      }
    } catch (error) {
      setOpenSnackError(true);
      setLoading(false);
    }
  }

  async function getReceiptFile() {
    try {
      localStorage.setItem('payment', "boleto");
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
      setOpenSnackError(true);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className={`text-xl font-medium ${receipt.status == "EM ATRASO" && "text-red-600"} leading-none`}>{receipt.datavencimento}</p>
          <span className="text-sm text-zinc-500 leading-none">Vencimento</span>
        </div>

        <Chip color={receipt.status == "EM ABERTO" ?
          "success" : receipt.status == "EM ATRASO" ?
            "error" : "warning"} label={receipt.status} />
      </div>

      <p className="text-xl font-medium">R$ {receipt.valorvencimento}</p>
      <span className="text-sm text-zinc-500">Valor</span>

      <Divider className="!my-4" />

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-0 md:justify-between items-center">
        {((payPreference && payPreference == "boleto" && receipt.codigodebarras) || (payPreference && payPreference == "boleto" && !receipt.codigopix && receipt.codigodebarras)) && (
          <Button action={() => handlePayment("boleto")}>
            <MdCopyAll className="mr-1" />
            Código de barras
          </Button>
        )}
        {((payPreference && payPreference == "pix" && receipt.codigopix) || (payPreference && payPreference == "boleto" && !receipt.codigodebarras && receipt.codigopix)) && (
          <Button loading={loading} action={() => handlePayment("pix")}>
            <MdPix className="mr-1" />
            Pagar com pix
          </Button>
        )}
        {!receipt.codigodebarras && !receipt.codigopix && (
          <Button action={() => setOpenContact(true)}>
            <MdSmartphone className="mr-1" />
            Entre em contato
          </Button>
        )}

        <button onClick={() => setOpenOptions(!openOptions)}
          className="flex gap-1 items-center text-sm font-medium"
          style={{
            color: theme.primary
          }}>

          {!openOptions && (
            <>
              MAIS
              <MdArrowDropDown />
            </>
          )}
          {openOptions && (
            <>
              MENOS
              <MdArrowDropUp />
            </>
          )}
        </button>
      </div>

      {openOptions && (
        <>
          <Divider className="!my-4" />
          <div className="flex flex-col gap-2">
            {payPreference == "boleto" && receipt.codigopix && (
              <button onClick={() => handlePayment("pix")} className="py-2 flex items-center gap-1 text-sky-500 uppercase">
                <MdPix />
                Pagar com Pix
              </button>
            )}
            {payPreference == "pix" && receipt.codigodebarras && (
              <button onClick={() => handlePayment("boleto")} className="py-2 flex items-center gap-1 text-sky-500 uppercase">
                <MdCopyAll />
                código de barras
              </button>
            )}

            <button onClick={() => getReceiptFile()} className="py-2 flex items-center gap-1 text-sky-500 uppercase">
              <MdRemoveRedEye />
              Visualizar boleto
            </button>
          </div>

          <div className="bg-[#F4F4F4] p-2 mt-2">
            <p>Recibo: {receipt.idrecibo}</p>
            <p>Aluguel: {receipt.mesreferencia}</p>
          </div>
        </>
      )}

      <Dialog open={openPix}>
        <div className="py-2 px-6">
          <button className="absolute right-3 top-1 text-2xl" onClick={() => setOpenPix(false)}>&times;</button>

          <h1 className="flex items-center gap-2 text-zinc-500"><MdPix color="#32BCAD" size={36} /> Pague com Pix</h1>

          <div className="p-4 w-fit mt-2 mx-auto rounded border border-gray-500">
            <img src={qrCode} className="w-[146px]" alt="" />
          </div>

          <p className="text-center text-base my-2">Escaneie o QR Code ou copie o código abaixo, cole em seu banco</p>

          <div className="border border-[#32BCAD] rounded p-4">
            <div className="flex items-center">
              <span className="max-w-[90%] whitespace-nowrap overflow-hidden text-base font-medium">
                {receipt.codigopix}
              </span>
              <button className="ml-auto" onClick={() => { navigator.clipboard.writeText(receipt.codigopix); setOpenSnack(true) }}>
                <MdCopyAll size={24} color="#32BCAD" />
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog open={openContact}>
        <div className="py-2 px-6 w-full md:w-[500px]">
          <button className="absolute right-3 top-1 text-2xl" onClick={() => setOpenPix(false)}>&times;</button>

          <h1 className="flex items-center gap-2 text-zinc-500">Entre em contato</h1>

          <div className="flex flex-col gap-2 mt-6">
            {contact?.phone_1 && contact.phone_1.length > 7 && (
              <div className="flex gap-2 items-center">
                <MdPhone />
                <span>Telefone:</span>
                <a href={`tel:${contact?.phone_1}`}>{contact?.phone_1_view}</a>
              </div>
            )}
            {contact?.phone_2 && contact.phone_2.length > 7 && (
              <div className="flex gap-2 items-center">
                <MdPhone />
                <span>Telefone:</span>
                <a href={`tel:${contact?.phone_2}`}>{contact?.phone_2_view}</a>
              </div>
            )}
            {contact?.email && (
              <div className="flex gap-2 items-center">
                <MdEmail />
                <span>Email:</span>
                <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
              </div>
            )}
            {contact?.whatsapp && (
              <div className="flex gap-2 items-center">
                <MdWhatsapp />
                <span>Whatsapp:</span>
                <a href={`wa.me/${contact?.whatsapp}`} className="p-1 rounded text-white bg-[#08D95D]">Iniciar conversa</a>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={openSnack}
        message="Código copiado com sucesso"
        autoHideDuration={1500}
        onClose={() => setOpenSnack(false)}
      />

      <Snackbar
        open={openSnackError}
        message="Erro ao obter fatura"
        autoHideDuration={1500}
        onClose={() => setOpenSnackError(false)}
      />
    </>
  )
}

export default ReceiptItem