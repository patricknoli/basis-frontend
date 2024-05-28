import { InputAdornment, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { i18n } from "../../../i18n";
import { validateDocument } from "../../../support/validateDocument";
import { MdPerson } from "react-icons/md";
import { withMask } from "use-mask-input";
import { StepThreeProps } from "./types";
import Button from "../../../components/Button";

const StepThree: React.FC<StepThreeProps> = ({ next, saveDocument }) => {
  const { lang } = useContext(AppContext);
  const [invalidDocument, setInvalidDocument] = useState<boolean>(false);
  const [document, setDocument] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleNext() {
    setLoading(true);
    saveDocument(document);
    setTimeout(() => {
      next();
    }, 1500)
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-[#2F3367]">{i18n[lang].sign_up_third_step_title}</h1>
      <p className="mt-3 text-xs md:text-base w-[90%] md:w-full">{i18n[lang].sign_up_third_step_subtitle}</p>

      <div className="my-6 flex flex-col gap-3">
        <TextField
          onBlur={() => setInvalidDocument(!validateDocument(document))}
          onChange={(e) => setDocument(e.target.value)}
          error={invalidDocument}
          helperText={invalidDocument && i18n[lang].global_invalid_document_error}
          label={i18n[lang].sign_up_third_step_input_document} variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdPerson />
              </InputAdornment>
            ),
          }}
          inputProps={<input ref={withMask('cpf')} />}
        />
      </div>

      <Button loading={loading} forwardIcon action={() => handleNext()} className="w-full">
        Próximo
      </Button>
    </>
  )
}

export default StepThree