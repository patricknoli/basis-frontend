import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import { i18n } from "../../i18n";
import { AppContext } from "../../contexts/AppContext";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { RxEyeOpen } from "react-icons/rx";
import { api } from "../../services/api";
import { AddressDocumentsType, DocumentType } from "./types";

const Documents: React.FC = () => {
  const { user, lang, dataId, profile } = useContext(AppContext);
  const tenant = user?.find((item) => item.correntista[0].tipocorrentista == "L");
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [documents, setDocuments] = useState<AddressDocumentsType[]>([]);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  async function getDocuments() {
    try {
      const response = await api.get('/arquivos/arquivosCorrentistas', {
        headers: {
          idBanco: dataId,
          idCorrentista: profile == "owner" ? owner?.correntista[0].idcorrentista : tenant?.correntista[0].idcorrentista
        }
      });
      if (response.status == 200) {
        setDocuments(response.data);
      }
    } catch (error) { }
  }

  function exportAll(address: AddressDocumentsType) {
    address.arquivos.map((document) => {
      exportDocument("download", document);
    })
  }

  function exportDocument(type: string, documentObj: DocumentType) {
    if (type == "download") {
      const url = window.URL.createObjectURL(new Blob([documentObj.url]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${documentObj.descricao}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (type == "view") {
      if (isPWA) {
        window.location.assign(documentObj.url);
      } else {
        window.open(documentObj.url, "_blank");
      }
    }
  }

  useEffect(() => {
    getDocuments();
  }, [])

  return (
    <>
      <Container>
        <Header home />

        <h1 className="text-3xl text-[#3A3541] font-semibold mb-6">{i18n[lang].documents_title}</h1>

        <div className="flex flex-col gap-4">
          {documents.map((address, index) => (
            <Accordion defaultExpanded={index == 0} key={index}>
              <AccordionSummary
                className="flex-row-reverse"
                expandIcon={<MdExpandMore />}
              >
                <h3 className="text-base font-bold ml-3 max-w-[185px] md:max-w-none overflow-hidden whitespace-nowrap text-ellipsis">{address.endereco}</h3>
                <button className="ml-auto" onClick={() => exportAll(address)}>
                  <BsDownload />
                </button>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-4">
                  {address.arquivos.map((document, index) => (
                    <div key={index} className="flex items-center">
                      <span className="max-w-[160px] md:max-w-none whitespace-nowrap overflow-hidden text-ellipsis">{document.descricao}</span>

                      <div className="actions ml-auto flex items-center gap-4">
                        <button onClick={() => exportDocument("view", document)}>
                          <RxEyeOpen />
                        </button>
                        <button onClick={() => exportDocument("download", document)}>
                          <BsDownload />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Documents;