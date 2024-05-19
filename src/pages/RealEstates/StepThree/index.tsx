import { useContext, useEffect, useState } from "react"
import { api } from "../../../services/api"
import { Realty, StepThreeProps } from "./types"
import { AppContext } from "../../../contexts/AppContext"
import { Checkbox, Divider, FormControlLabel, InputAdornment, TextField } from "@mui/material"
import { i18n } from "../../../i18n"
import { LoadingButton } from "@mui/lab"
import { MdArrowForward, MdClose, MdSearch } from "react-icons/md"

const StepThree: React.FC<StepThreeProps> = ({ initialDate, finalDate, saveProperties, next }) => {
  const { user, lang } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [properties, setProperties] = useState<Realty[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  function handleSelection(selected: number) {
    if (selectedProperties.find((item) => item == selected)) {
      setSelectedProperties(selectedProperties.filter((item) => item != selected));
    } else {
      setSelectedProperties([...selectedProperties, selected]);
    }
  }

  function handleNext() {
    setIsSubmitting(true);
    saveProperties(selectedProperties);
    setTimeout(() => {
      next();
    }, 1500)
  }

  function handleSelectAll(select: boolean) {
    if (select) {
      let selectedObj: number[] = [];
      properties.map((realty) => {
        selectedObj.push(realty.imovel.idtbbobjetoimovel);
      })
      setSelectedProperties(selectedObj);
    } else {
      setSelectedProperties([]);
    }
  }

  async function getProperties() {
    try {
      const response = await api.get('/correntistas/proprietario/imoveis/listar', {
        headers: {
          idCorrentista: owner?.correntista[0].idcorrentista,
          dataInicial: initialDate,
          dataFinal: finalDate
        }
      })
      if (response.status == 200) {
        setProperties(response.data.listaImoveis);
      }
    } catch (error) { }
  }

  useEffect(() => {
    getProperties()
  }, [])

  useEffect(() => {
    handleSelectAll(true);
  }, [properties])

  useEffect(() => {
    if (selectedProperties.length == properties.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedProperties])

  return (
    <div className="relative">
      <h1 className="font-semibold text-3xl text-[#3A3541]">{i18n[lang].real_estates_third_step_title}</h1>

      <div className="mt-4 bg-white rounded">
        {!showSearch && (
          <FormControlLabel className="p-2" control={<Checkbox checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />} label={i18n[lang].real_estates_first_step_select_all} />
        )}

        {!showSearch && (
          <button className="float-right mt-4 mr-3"
            onClick={() => setShowSearch(true)}>
            <MdSearch size={24} />
          </button>
        )}

        {showSearch && (
          <div className="p-2">
            <TextField
              className="w-full"
              label={i18n[lang].real_estates_third_step_input_search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" onClick={() => { setShowSearch(false); setSearch("") }}>
                    <MdClose />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {selectedProperties.length > 0 && (
          <div className="bg-[#E6E9F4] w-1/2 px-2 rounded flex items-center justify-between">
            <span className="text-sm text-[#5A607F]">{selectedProperties.length} selecionados</span>
            <button className="text-xl" onClick={() => handleSelectAll(false)}>&times;</button>
          </div>
        )}
        <Divider />
        {properties && (
          <div className="p-2 flex flex-col gap-2 max-h-[54vh] overflow-auto">
            {properties.map((realty, index) => realty.imovel.endereco.includes(search) && (
              <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(realty.imovel.idtbbobjetoimovel)}
                checked={selectedProperties.find((item) => item == realty.imovel.idtbbobjetoimovel) ? true : false} />}
                label={realty.imovel.endereco} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed left-0 bottom-3 w-full px-8 z-50">
        <LoadingButton className="w-full" variant="contained" startIcon={<MdArrowForward />}
          loading={isSubmitting} onClick={() => handleNext()}>
          {i18n[lang].real_estates_next_step}
        </LoadingButton>
      </div>
    </div>
  )
}

export default StepThree