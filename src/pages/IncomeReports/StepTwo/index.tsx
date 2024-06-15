import { useContext, useEffect, useState } from "react";
import { i18n } from "../../../i18n";
import { StepTwoProps } from "./types"
import { AppContext } from "../../../contexts/AppContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "../../../components/Button";
import { api } from "../../../services/api";

const StepTwo: React.FC<StepTwoProps> = ({ next, saveYear }) => {
  const { lang, user } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [year, setYear] = useState<string>("");
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleNext() {
    setIsSubmitting(true);
    saveYear(year);
    setTimeout(() => {
      next();
    }, 1500)
  }

  async function getYears() {
    try {
      const response = await api.get('/informe/listarAnos', {
        headers: {
          idCorrentista: owner?.correntista[0].idcorrentista,
          idBanco: 5
        }
      });
      if (response.status == 200) {
        setYearOptions(response.data);
      }
    } catch (error) { }
  }

  useEffect(() => {
    getYears();
  }, [])

  return (
    <>
      <h1 className="font-semibold text-3xl text-[#3A3541]">{i18n[lang].income_reports_step_two_title}</h1>

      <div className="p-4 mt-4 bg-white rounded">
        <p className="font-medium text-base text-[#181818] mb-4">{i18n[lang].income_reports_step_two_subtitle}</p>

        <FormControl className="w-full md:max-w-[300px]">
          <InputLabel id="year-select-label">{i18n[lang].income_reports_step_two_select_label}</InputLabel>
          <Select
            labelId="year-select"
            id="year-select"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            {yearOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8 md:w-auto md:left-auto md:right-0">
        <Button className="w-full md:w-[300px]" forwardIcon
          loading={isSubmitting} action={() => handleNext()}>
          {i18n[lang].real_estates_next_step}
        </Button>
      </div>
    </>
  )
}

export default StepTwo