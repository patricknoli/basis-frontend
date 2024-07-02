import { BiImage } from "react-icons/bi"
import Container from "../../components/Container"
import Header from "../../components/Header/Internal"
import { Chip } from "@mui/material"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../contexts/AppContext"
import { api } from "../../services/api"
import { AddressType } from "./types"
import { i18n } from "../../i18n"

const Receipts: React.FC = () => {
  const { user, lang } = useContext(AppContext);
  const tenant = user?.find((item) => item.correntista[0].tipocorrentista == "L");
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  async function getAddresses() {
    try {
      const response = await api.get('/correntistas/locatario/dados', {
        headers: {
          idCorrentista: tenant?.correntista[0].idcorrentista
        }
      });
      if (response.status == 200) {
        setAddresses(response.data);
      }
    } catch (error) { }
  }

  useEffect(() => {
    getAddresses();
  }, [])

  return (
    <>
      <Container>
        <Header home />

        <h1 className="text-4xl mt-8">{i18n[lang].receipts_title}</h1>
        <p className="text-zinc-500">{i18n[lang].receipts_subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {addresses.map((address) => (
            <Link key={address.idImovel} to={`/receipts/address/${address.idImovel}`} state={address} className="rounded-md">
              <div className="h-[200px] bg-zinc-400 flex items-center justify-center rounded-t-md">
                <BiImage size={60} color="#fff" />
              </div>
              <div className="p-6 bg-white">
                {address.status == "EM ABERTO" && (
                  <Chip color="success" label={i18n[lang].receipts_address_status_open} />
                )}
                {address.status == "EM ATRASO" && (
                  <Chip color="error" label={i18n[lang].receitps_address_status_overdue} />
                )}
                {address.status == "EM DIA" && (
                  <span className="block h-[32px] text-blue-500 text-sm font-medium">{i18n[lang].receipts_address_status_ok}</span>
                )}
                <h6 className="mt-3 text-base font-medium">{address.nome}</h6>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Receipts