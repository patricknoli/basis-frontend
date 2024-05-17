import { TextField } from "@mui/material";
import { StepTwoProps } from "./types";
import { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward } from "react-icons/md";
import { i18n } from "../../../i18n";
import { AppContext } from "../../../contexts/AppContext";

const StepTwo: React.FC<StepTwoProps> = ({ next, saveInitial, saveFinal }) => {
  const { lang } = useContext(AppContext);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const initialDateValue = `${currentDate.getFullYear()}-${currentMonth < 10 && '0'}${currentMonth}-01`;
  const finalDateValue = currentDate.toISOString().split('T')[0];
  const currentMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const [initialDate, setInitialDate] = useState<string>(initialDateValue);
  const [finalDate, setFinalDate] = useState<string>(finalDateValue);
  const [dateShortCut, setDateShortcut] = useState<"current" | "last-2" | "none">("none");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleNext() {
    setIsSubmitting(true);
    saveInitial(initialDate);
    saveFinal(finalDate);
    setTimeout(() => {
      next();
    }, 1000)
  }

  useEffect(() => {
    if (dateShortCut == "current") {
      setInitialDate(initialDateValue);
      setFinalDate(`${currentDate.getFullYear()}-${currentMonth < 10 && '0'}${currentMonth}-${currentMonthDays}`)
    } else if (dateShortCut == "last-2") {
      setInitialDate(`${currentDate.getFullYear()}-${currentMonth < 10 && '0'}${currentMonth - 1}-01`);
      setFinalDate(`${currentDate.getFullYear()}-${currentMonth < 10 && '0'}${currentMonth}-${currentMonthDays}`);
    }
  }, [dateShortCut])

  return (
    <>
      <h1 className="font-semibold text-3xl text-[#3A3541]">{i18n[lang].real_estates_second_step_title}</h1>

      <div className="p-4 mt-4 bg-white rounded flex flex-col gap-4">
        <p className="font-medium text-base text-[#181818]">{i18n[lang].real_estates_second_step_subtitle}</p>

        <div className="flex gap-2">
          <button className={`rounded 
          ${dateShortCut == "current" ? 'border border-black bg-[#F0F0F0]' : 'bg-[#F7F7F7]'} 
          text-center font-semibold text-[#211F2A] text-sm p-2 basis-1/2`}
            onClick={() => setDateShortcut("current")}>
            {i18n[lang].real_estates_second_step_shortcut_one}
          </button>

          <button className={`rounded 
          ${dateShortCut == "last-2" ? 'border border-black bg-[#F0F0F0]' : 'bg-[#F7F7F7]'} 
          text-center font-semibold text-[#211F2A] text-sm p-2 basis-1/2`}
            onClick={() => setDateShortcut("last-2")}>
            {i18n[lang].real_estates_second_step_shortcut_two}
          </button>
        </div>

        <TextField
          type="date"
          variant="outlined"
          label={i18n[lang].real_estates_second_step_initial_date}
          className="w-full"
          value={initialDate}
          onChange={(e) => { setInitialDate(e.target.value); setDateShortcut("none") }}
        />
        <TextField
          type="date"
          variant="outlined"
          label={i18n[lang].real_estates_second_step_final_date}
          className="w-full"
          value={finalDate}
          onChange={(e) => { setFinalDate(e.target.value); setDateShortcut("none") }}
        />
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8">
        <LoadingButton className="w-full" variant="contained" startIcon={<MdArrowForward />}
          loading={isSubmitting} onClick={() => handleNext()}>
          {i18n[lang].real_estates_next_step}
        </LoadingButton>
      </div>
    </>
  )
}

export default StepTwo