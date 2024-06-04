import { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api"
import { StepOneProps } from "./types"
import { Checkbox, Divider, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { MdClose, MdSearch } from "react-icons/md";
import { AppContext } from "../../../contexts/AppContext";
import { i18n } from "../../../i18n";
import Button from "../../../components/Button";
import { ReportType } from "../types";

const StepOne: React.FC<StepOneProps> = ({ saveReports, next }) => {
  const { lang, user } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [reportsList, setReportsList] = useState<ReportType[]>([]);
  const [selectedReports, setSelectedReports] = useState<ReportType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  function handleSelection(selected: ReportType) {
    if (selectedReports.find((item) => item == selected)) {
      setSelectedReports(selectedReports.filter((item) => item != selected));
    } else {
      setSelectedReports([...selectedReports, selected]);
    }
  }

  function handleNext() {
    setIsSubmitting(true);
    setTimeout(() => {
      next();
    }, 1500)
  }

  async function getReports() {
    try {
      const response = await api.get('/relatorios/listar', {
        headers: {
          idBanco: 5,
          idPerfil: owner?.correntista[0].idPerfil
        }
      });

      if (response.status == 200) {
        setReportsList(response.data);
        if (response.data.length <= 10) {
          setSearchActive(false);
        }
      }
    } catch (error) { }
  }

  function handleSelectAll(select: boolean) {
    if (select) {
      let selectedObj: ReportType[] = [];
      reportsList.map((report) => {
        selectedObj.push(report);
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
  }, [reportsList]);

  useEffect(() => {
    saveReports(selectedReports);
  }, [selectedReports])

  return (
    <div className="relative">
      <h1 className="md:hidden font-semibold text-3xl text-[#3A3541]">{i18n[lang].real_estates_first_step_title}</h1>

      <div className="p-2 mt-4 bg-white rounded relative">
        <div className="flex">
          <div className="">
            <h1 className="hidden md:inline-flex text-base text-[#181818] font-medium">{i18n[lang].real_estates_first_step_subtitle}</h1>

            {searchActive && (
              <>
                <button className={`${showSearch && 'hidden'} absolute top-0 right-0 mt-4 mr-3 md:hidden`}
                  onClick={() => setShowSearch(true)}>
                  <MdSearch size={24} />
                </button>
              </>
            )}

            <div className={`${showSearch ? 'hidden' : 'block'} w-full`}>
              <FormControlLabel className={`w-full`} control={<Checkbox defaultChecked
                onChange={(e) => handleSelectAll(e.target.checked)}
              />} label={i18n[lang].real_estates_first_step_select_all} />
            </div>
          </div>


          {searchActive && (
            <div className={`${!showSearch && 'hidden'} md:inline-flex md:w-[216px] md:ml-auto`}>
              <TextField
                className="w-full"
                label={i18n[lang].real_estates_first_step_search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSearch />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <div className="md:hidden">
                      <InputAdornment position="end" onClick={() => { setShowSearch(false); setSearch("") }}>
                        <MdClose />
                      </InputAdornment>
                    </div>
                  )
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        <Divider />
        {reportsList && (
          <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:mt-4">
            {reportsList.map((report, index) => report.descricao.toLowerCase().includes(search.toLowerCase()) && (
              <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(report)}
                checked={selectedReports.find((item) => item == report) ? true : false} />}
                label={report.descricao} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8 z-50 md:w-auto md:left-auto md:right-0">
        <Button className="w-full md:w-[300px]" forwardIcon
          loading={isSubmitting} action={() => handleNext()}>
          {i18n[lang].real_estates_next_step}
        </Button>
      </div>
    </div>
  )
}

export default StepOne