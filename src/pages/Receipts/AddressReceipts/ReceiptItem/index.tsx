import { Chip, Dialog, Divider, Snackbar } from "@mui/material"
import { ReceiptItemProps } from "./types"
import Button from "../../../../components/Button"
import { MdArrowDropDown, MdArrowDropUp, MdCopyAll, MdPix, MdRemoveRedEye, MdSmartphone } from "react-icons/md"
import { useState } from "react"
import QRCode from "react-qr-code"

const ReceiptItem: React.FC<ReceiptItemProps> = ({ receipt }) => {
  const payPreference = localStorage.getItem('payment');
  const [openPix, setOpenPix] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  function handlePayment(type: "pix" | "boleto") {
    localStorage.setItem('payment', type);
    if (type == "pix") {
      setOpenPix(true)
    }
    if (type == "boleto") {
      navigator.clipboard.writeText(receipt.codigodebarras).then(() => {
        setOpenSnack(true);
      });
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
        {(payPreference && payPreference == "boleto" && receipt.codigodebarras) && (
          <Button action={() => handlePayment("boleto")}>
            <MdCopyAll className="mr-1" />
            Código de barras
          </Button>
        )}
        {(payPreference && payPreference == "pix" && receipt.codigopix) && (
          <Button action={() => handlePayment("pix")}>
            <MdPix className="mr-1" />
            Pagar com pix
          </Button>
        )}
        {!receipt.codigodebarras && !receipt.codigopix && (
          <Button>
            <MdSmartphone className="mr-1" />
            Entre em contato
          </Button>
        )}

        <button onClick={() => setOpenOptions(!openOptions)} className="flex gap-1 items-center text-sky-500 text-sm font-medium">

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
          <div className="flex flex-col gap-5">
            {payPreference == "boleto" && receipt.codigopix && (
              <button onClick={() => handlePayment("pix")} className="flex items-center gap-1 text-sky-500 uppercase">
                <MdPix />
                Pagar com Pix
              </button>
            )}
            {payPreference == "pix" && receipt.codigodebarras && (
              <button onClick={() => handlePayment("boleto")} className="flex items-center gap-1 text-sky-500 uppercase">
                <MdCopyAll />
                código de barras
              </button>
            )}

            <a href="#" className="flex items-center gap-1 text-sky-500 uppercase">
              <MdRemoveRedEye />
              Visualizar boleto
            </a>
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
            <QRCode size={146} value={receipt.codigopix} />
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

      <Snackbar
        open={openSnack}
        message="Código copiado com sucesso"
        autoHideDuration={1500}
        onClose={() => setOpenSnack(false)}
      />
    </>
  )
}

export default ReceiptItem