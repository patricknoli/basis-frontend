import { useEffect, useState } from "react";
import { api } from "../../../services/api"
import { StepOneProps } from "./types"
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdArrowForward } from "react-icons/md";

const StepOne: React.FC<StepOneProps> = ({ saveReports, next }) => {
  const [reportsList, setReportsList] = useState<{ descricao: string }[]>([]);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleSelection(selected: string) {
    if (selectedReports.find((item) => item == selected)) {
      setSelectedReports(selectedReports.filter((item) => item != selected));
    } else {
      setSelectedReports([...selectedReports, selected]);
    }
  }

  function handleNext() {
    setIsSubmitting(true);
    saveReports(selectedReports);
    setTimeout(() => {
      next();
    }, 1500)
  }

  async function getReports() {
    try {
      const response = await api.get('/relatorios/listar', {
        headers: {
          idBanco: 5
        }
      });

      if (response.status == 200) {
        setReportsList(response.data);
      }
    } catch (error) { }
  }

  function handleSelectAll(select: boolean) {
    if (select) {
      let selectedObj: string[] = [];
      reportsList.map((report) => {
        selectedObj.push(report.descricao);
      })
      setSelectedReports(selectedObj);
    } else {
      setSelectedReports([]);
    }
  }

  useEffect(() => {
    getReports();
  }, [])

  useEffect(() => {
    handleSelectAll(true);
  }, [reportsList])

  return (
    <div className="relative">
      <h1 className="font-semibold text-3xl text-[#3A3541]">Selecione os relatórios</h1>

      <div className="p-2 mt-4 bg-white rounded">
        <FormControlLabel control={<Checkbox defaultChecked
          onChange={(e) => handleSelectAll(e.target.checked)}
        />} label="Selecionar todos" />
        <Divider />
        {reportsList && (
          <div className="flex flex-col gap-2">
            {reportsList.map((report, index) => (
              <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(report.descricao)}
                checked={selectedReports.find((item) => item == report.descricao) ? true : false} />}
                label={report.descricao} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8 z-50">
        <LoadingButton className="w-full" variant="contained" startIcon={<MdArrowForward />}
          loading={isSubmitting} onClick={() => handleNext()}>
          Próximo
        </LoadingButton>
      </div>
    </div>
  )
}

export default StepOne