import { useContext, useEffect, useState } from "react"
import { api } from "../../../services/api"
import { Realty, RealtyGroup, StepThreeProps } from "./types"
import { AppContext } from "../../../contexts/AppContext"
import { Checkbox, Divider, FormControlLabel, InputAdornment, TextField } from "@mui/material"
import { i18n } from "../../../i18n"
import { MdClose, MdSearch } from "react-icons/md"
import Button from "../../../components/Button"

const StepThree: React.FC<StepThreeProps> = ({ saveProperties, next }) => {
  const { user, lang } = useContext(AppContext);
  const owner = user?.find((item) => item.correntista[0].tipocorrentista == "P");
  const [properties, setProperties] = useState<Realty[]>([]);
  const [propertiesGroup, setPropertiesGroup] = useState<RealtyGroup[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(true);
  const [searchActive, setSearchActive] = useState<boolean>(true);
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

  function handleSelectAll(select: boolean, isGroup: boolean) {
    if (select) {
      let selectedObj: number[] = [];
      if (isGroup) {
        propertiesGroup.map((group) => {
          group.imoveis.map((realty) => {
            selectedObj.push(realty.idtbbobjetoimovel);
          })
        })
      } else {
        properties.map((realty) => {
          selectedObj.push(realty.imovel.idtbbobjetoimovel);
        })
      }
      setSelectedProperties(selectedObj);
    } else {
      setSelectedProperties([]);
    }
  }

  async function getProperties() {
    try {
      const response = await api.get('/correntistas/proprietario/imoveis/listar', {
        headers: {
          idCorrentista: owner?.correntista[0].idcorrentista
        }
      })
      if (response.status == 200) {
        if (response.data.configuracao == "C") {
          setPropertiesGroup(response.data.listaCondominio)
        } else {
          setProperties(response.data.listaImoveis);
        }
        if (response.data.listaImoveis.length <= 10 || response.data.listaCondominio[0].length <= 10) {
          setSearchActive(false);
        }
      }
    } catch (error) { }
  }

  useEffect(() => {
    getProperties()
  }, [])

  useEffect(() => {
    properties.length > 0 && handleSelectAll(true, false);
    propertiesGroup.length > 0 && handleSelectAll(true, true);
  }, [properties, propertiesGroup])

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
        <p className="hidden md:inline-flex font-medium text-base text-[#181818] mb-4 p-4">{i18n[lang].real_estates_third_step_subtitle}</p>
        <div className={`${showSearch ? 'hidden' : 'inline-flex'} md:hidden`}>
          <FormControlLabel className="p-2" control={<Checkbox checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked, (propertiesGroup.length > 0))}
          />} label={i18n[lang].real_estates_first_step_select_all} />
        </div>

        {searchActive && (
          <>
            <button className={`${showSearch && 'hidden'} float-right mt-4 mr-3 md:hidden`}
              onClick={() => setShowSearch(true)}>
              <MdSearch size={24} />
            </button>

            <div className={`${!showSearch && 'hidden'} md:block md:w-[216px] md:float-right p-2`}>
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
          </>
        )}


        {selectedProperties.length > 0 && (
          <div className="bg-[#E6E9F4] w-1/2 md:w-1/6 px-2 rounded flex items-center justify-between">
            <span className="count text-sm text-[#5A607F]">{selectedProperties.length} {i18n[lang].real_estates_third_step_selected}</span>
            <button className="text-xl" onClick={() => handleSelectAll(false, (propertiesGroup.length > 0))}>&times;</button>
          </div>
        )}
        <Divider />
        <div className="hidden md:grid md:grid-cols-2 md:items-center md:border md:border-t-0 md:border-x-0 md:border-b-1">
          <div className="flex items-center">
            <Checkbox checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked, (propertiesGroup.length > 0))}
            />
            <span className="text-lg font-bold">{i18n[lang].real_estates_third_step_list_label_one}</span>
          </div>
          <span className="text-lg font-bold">{i18n[lang].real_estates_third_step_list_label_two}</span>
        </div>
        {properties && (
          <div className="properties p-2 flex flex-col gap-2 max-h-[54vh] overflow-auto">
            {properties.map((realty, index) => realty.imovel.endereco.toLowerCase().includes(search.toLowerCase()) && (
              <div key={realty.imovel.idtbbobjetoimovel} className="md:grid md:grid-cols-2 md:items-center md:border md:border-t-0 md:border-x-0 md:border-b-1 md:last:border-b-0">
                <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(realty.imovel.idtbbobjetoimovel)}
                  checked={selectedProperties.find((item) => item == realty.imovel.idtbbobjetoimovel) ? true : false} />}
                  label={realty.imovel.endereco} />
                <span className="hidden md:block">{realty.imovel.imovelcodigopesquisa}</span>
              </div>
            ))}
          </div>
        )}
        {propertiesGroup && (
          <div className="properties p-2 flex flex-col gap-2 max-h-[54vh] overflow-auto">
            {propertiesGroup.map((properties) => (
              <>
                <span className="text-sm">Condomínio: {properties.nomeCondominio}</span>
                <div className="flex flex-col gap-2">
                  {properties.imoveis.map((realty, index) => (
                    <div key={realty.idtbbobjetoimovel} className="md:grid md:grid-cols-2 md:items-center md:border md:border-t-0 md:border-x-0 md:border-b-1 md:last:border-b-0">
                      <FormControlLabel key={index} control={<Checkbox onChange={() => handleSelection(realty.idtbbobjetoimovel)}
                        checked={selectedProperties.find((item) => item == realty.idtbbobjetoimovel) ? true : false} />}
                        label={realty.endereco} />
                      <span className="hidden md:block">{realty.imovelcodigopesquisa}</span>
                    </div>
                  ))}

                </div>
              </>
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

export default StepThree