import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { StepFourProps } from "./types"
import { AppContext } from "../../../contexts/AppContext";
import { Checkbox, Dialog, Divider, FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from "@mui/material";
import { validateEmail } from "../../../support/validateEmail";
import { LoadingButton } from "@mui/lab";
import { BsCalendarCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { BiChevronRight } from "react-icons/bi";
import { api } from "../../../services/api";
import { ReportType } from "../types";

const StepFour: React.FC<StepFourProps> = ({ reports, properties, initialDate, finalDate }) => {
  const { user, lang, dataId } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [fileType, setFileType] = useState<string>();
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const navigate = useNavigate();
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  function handleGoHome() {
    window.innerWidth > 768 ? window.location.reload() : navigate("/home")
  }

  async function generateReport(report: ReportType, type: "view" | "download", idImoveis: string) {
    try {
      const params = {
        'idBanco': dataId,
        'idCorrentista': owner?.correntista[0].idcorrentista.toString(),
        'idImovel': idImoveis,
        'tipoEnvio': emailSend ? 'true' : 'false',
        'tipoDoc': fileType,
        ...(email && { 'email': email }),
        ...(report.dataInicialFinal && { 'dtini': initialDate?.toString() }),
        ...(report.dataInicialFinal && { 'dtfim': finalDate?.toString() })
      }
      const response = await api.get(report.url, {
        headers: {
          'accept': 'application/json',
          ...params
        }
      });
      if (response.status == 200) {
        setTimeout(() => {
          if (type == "download") {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${report.descricao}.${fileType}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setOpenDialog(true);
          } else if (type == "view") {
            if (isPWA) {
              window.location.assign(response.data.url);
            } else {
              window.open(response.data.url, "_blank");
            }
          }
        }, 1500);
        return true;
      } else {
        setSnackMessage(snackMessage == "" ? `Erro ao emitir o relatório ${report.descricao}` : "Erro ao emitir relatórios");
        setOpenSnack(true);
        return false;
      }
    } catch (error) {
      setSnackMessage(snackMessage == "" ? `Erro ao emitir o relatório ${report.descricao}` : "Erro ao emitir relatórios");
      setOpenSnack(true);
      return false;
    }
  }

  async function extractReport(type: "view" | "download") {
    try {
      setIsSubmitting(true);
      setSuccessMessage(emailSend && email ? "Email enviado com sucesso!" : "Relatórios baixados com sucesso!");
      let idImoveis: string = properties.join(',');
      for (const report of reports) {
        const success = await generateReport(report, type, idImoveis);
        if (!success) {
          throw new Error(`Erro ao emitir o relatório ${report.descricao}`);
        }
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setSnackMessage(`Erro ao emitir os relatórios`);
      setOpenSnack(true);
    }
  }

  return (
    <>
      <h1 className="font-semibold text-3xl text-[#3A3541]">{i18n[lang].real_estates_fourth_step_title}</h1>

      <div className="p-2 mt-4 bg-white rounded">
        <RadioGroup
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <FormControlLabel value="pdf" control={<Radio />} label={i18n[lang].real_estates_fourth_step_input_file_type_one} />
          <FormControlLabel value="xsls" control={<Radio />} label={i18n[lang].real_estates_fourth_step_input_file_type_two} />
        </RadioGroup>

        <Divider />

        <FormControlLabel control={<Checkbox onChange={(e) => setEmailSend(e.target.checked)} />}
          label={i18n[lang].real_estates_fourth_step_input_email_send}
        />
        {emailSend && (
          <TextField
            label={i18n[lang].real_estates_fourth_step_input_email}
            value={email}
            error={invalidEmail}
            helperText={invalidEmail && i18n[lang].global_invalid_email_error}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setInvalidEmail(!validateEmail(email))}
            className="w-full"
          />
        )}
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8 z-50 flex flex-col gap-2 md:flex-row-reverse md:w-auto md:left-auto md:right-0">
        {fileType && (
          <Button className="w-full md:w-[300px]" forwardIcon
            loading={isSubmitting} action={() => extractReport("view")}>
            {i18n[lang].real_estates_fourth_step_view_button}
          </Button>
        )}
        <LoadingButton className="download w-full md:w-[300px]" endIcon={<BiChevronRight />}
          loading={isSubmitting} onClick={() => extractReport("download")}>
          {emailSend ? (
            <>
              {i18n[lang].real_estates_fourth_step_email_button}
            </>
          ) : (
            <>
              {i18n[lang].real_estates_fourth_step_download_button}
            </>
          )}
        </LoadingButton>
      </div>

      <Dialog open={openDialog}>
        <div className="p-10 flex flex-col gap-3 items-center">
          <button className="text-2xl absolute top-2 right-6" onClick={() => setOpenDialog(false)}>
            &times;
          </button>

          <div className="w-[70px] h-[70px] rounded-full flex justify-center items-center bg-[#ECF2FF]">
            <BsCalendarCheck size={20} />
          </div>
          <p className="font-bold text-2xl text-center">
            {successMessage}
          </p>
          <Button className="!py-2" action={() => handleGoHome()}>Ir para a tela inicial</Button>
        </div>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        message={snackMessage}
      />
    </>
  )
}

export default StepFour