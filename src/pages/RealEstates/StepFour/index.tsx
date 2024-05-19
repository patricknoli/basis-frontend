import { useContext, useState } from "react";
import { i18n } from "../../../i18n"
import { StepFourProps } from "./types"
import { AppContext } from "../../../contexts/AppContext";
import { Checkbox, Divider, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { validateEmail } from "../../../support/validateEmail";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward } from "react-icons/md";

const StepFour: React.FC<StepFourProps> = () => {
  const { user, lang } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [fileType, setFileType] = useState<string>();
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

      <div className="fixed left-0 bottom-3 w-full px-8 z-50 flex flex-col gap-2">
        {fileType && (
          <LoadingButton className="w-full" variant="contained" startIcon={<MdArrowForward />}
            loading={isSubmitting} onClick={() => { }}>
            {i18n[lang].real_estates_fourth_step_view_button}
          </LoadingButton>
        )}
        <LoadingButton className="w-full" variant="text" startIcon={<MdArrowForward />}
          loading={isSubmitting} onClick={() => { }}>
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
    </>
  )
}

export default StepFour