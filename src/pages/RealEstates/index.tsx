import { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import StepOne from "./StepOne";
import Steps from "../../components/Steps";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { i18n } from "../../i18n";
import { AppContext } from "../../contexts/AppContext";
import { ReportType } from "./types";

const RealEstates: React.FC = () => {
  const { lang } = useContext(AppContext);
  const [step, setStep] = useState<number>(1);
  const [reports, setReports] = useState<ReportType[]>([]);
  const [initialDate, setInitialDate] = useState<string | undefined>();
  const [finalDate, setFinalDate] = useState<string | undefined>();
  const [properties, setProperties] = useState<number[]>([]);
  const [secondStep, setSecondStep] = useState<boolean>(false);
  const stepsLabels = [
    i18n[lang].real_estates_steps_label_one,
    i18n[lang].real_estates_steps_label_two,
    i18n[lang].real_estates_steps_label_three,
    i18n[lang].real_estates_steps_label_four
  ]
  const stepsLabelsThree = [
    i18n[lang].real_estates_steps_label_one,
    i18n[lang].real_estates_steps_label_three,
    i18n[lang].real_estates_steps_label_four
  ]

  useEffect(() => {
    reports.find((item) => item.dataInicialFinal == true) ? setSecondStep(true) : setSecondStep(false)
  }, [reports])

  return (
    <>
      <Container>
        <Header home={step == 1}
          back={step > 1} backAction={() => setStep(step - 1)} />

        <h1 className="hidden md:block text-3xl text-[#3A3541] font-semibold mb-10">Imóveis</h1>

        <Steps steps={secondStep ? [1, 2, 3, 4] : [1, 2, 3]}
          stepsLabels={secondStep ? stepsLabels : stepsLabelsThree}
          activeStep={step} />

        {step == 1 && (
          <StepOne saveReports={setReports} next={() => secondStep ? setStep(2) : setStep(3)} />
        )}

        {step == 2 && (
          <StepTwo next={() => setStep(3)} saveInitial={setInitialDate} saveFinal={setFinalDate} />
        )}

        {step == 3 && (
          <StepThree next={() => setStep(4)} saveProperties={setProperties} />
        )}

        {step == 4 && (
          <StepFour properties={properties} reports={reports} initialDate={initialDate} finalDate={finalDate} />
        )}
      </Container>
    </>
  )
}

export default RealEstates;