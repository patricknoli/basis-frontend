import { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { StepOneProps } from "./types";
import { AppContext } from "../../../contexts/AppContext";
import { i18n } from "../../../i18n";
import { IncomeReportType } from "../types";
import { api } from "../../../services/api";
import { Checkbox, FormControlLabel } from "@mui/material";

const StepOne: React.FC<StepOneProps> = ({ next, saveReports }) => {
  const { lang } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedReports, setSelectedReports] = useState<IncomeReportType[]>([]);
  const [reports, setReports] = useState<IncomeReportType[]>([]);

  function handleNext() {
    setIsSubmitting(true);
    saveReports(selectedReports);
    setTimeout(() => {
      next();
    }, 1500)
  }

  function handleSelection(selected: IncomeReportType) {
    if (selectedReports.find((item) => item == selected)) {
      setSelectedReports(selectedReports.filter((item) => item != selected));
    } else {
      setSelectedReports([...selectedReports, selected]);
    }
  }

  async function getReports() {
    try {
      const response = await api.get('/informe/listar');
      if (response.status == 200) {
        setReports(response.data);
      }
    } catch (error) { }
  }

  useEffect(() => {
    getReports();
  }, [])

  return (
    <>
      <h1 className="font-semibold text-3xl text-[#3A3541]">{i18n[lang].income_reports_step_one_title}</h1>

      <div className="p-4 mt-4 bg-white rounded">
        <p className="font-medium text-base text-[#181818] mb-4">{i18n[lang].income_reports_step_one_subtitle}</p>

        {reports && (
          <div className="reports flex flex-col gap-2 md:grid md:grid-cols-3 md:mt-4">
            {reports.map((report, index) => (
              <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(report)}
                checked={selectedReports.find((item) => item == report) ? true : false} />}
                label={report.descricao} />
            ))}
          </div>
        )}
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

export default StepOne;