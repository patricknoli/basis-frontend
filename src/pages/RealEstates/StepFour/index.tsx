import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { StepFourProps } from "./types"
import { AppContext } from "../../../contexts/AppContext";
import { Checkbox, Dialog, Divider, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { validateEmail } from "../../../support/validateEmail";
import { LoadingButton } from "@mui/lab";
import { BsCalendarCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { BiChevronRight } from "react-icons/bi";

const StepFour: React.FC<StepFourProps> = () => {
  const { user, lang } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [fileType, setFileType] = useState<string>();
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  function handleGoHome() {
    window.innerWidth > 768 ? window.location.reload() : navigate("/home")
  }

  async function extractReport(type: "view" | "download") {
    setIsSubmitting(true);
    setSuccessMessage(emailSend && email ? "Email enviado com sucesso!" : "Relatórios baixados com sucesso!");
    setTimeout(() => {
      setIsSubmitting(false);
      type == "download" && setOpenDialog(true);
      type == "view" && window.open("http://reports.basissistemas.com.br/63/immobilenet/reports/temp/contacorrente1713215202923.pdf", "_blank");
    }, 1500);
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
          <FormControlLabel value="xlsx" control={<Radio />} label={i18n[lang].real_estates_fourth_step_input_file_type_two} />
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
        <LoadingButton className="w-full md:w-[300px]" endIcon={<BiChevronRight />}
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
    </>
  )
}

export default StepFour