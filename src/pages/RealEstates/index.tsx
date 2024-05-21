import { useContext, useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import StepOne from "./StepOne";
import Steps from "../../components/Steps";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { i18n } from "../../i18n";
import { AppContext } from "../../contexts/AppContext";

const RealEstates: React.FC = () => {
  const {lang} = useContext(AppContext);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [reports, setReports] = useState<string[]>([]);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const [properties, setProperties] = useState<number[]>([]);
  const stepsLabels = [
    i18n[lang].real_estates_steps_label_one,
    i18n[lang].real_estates_steps_label_two,
    i18n[lang].real_estates_steps_label_three,
    i18n[lang].real_estates_steps_label_four
  ]

  return (
    <>
      <Container>
        <Header home />

        <h1 className="hidden md:block text-3xl text-[#3A3541] font-semibold mb-10">Imóveis</h1>

        <Steps steps={[1, 2, 3, 4]}
        stepsLabels={stepsLabels}
        activeStep={step} />

        {step == 1 && (
          <StepOne saveReports={setReports} next={() => setStep(2)} />
        )}

        {step == 2 && (
          <StepTwo next={() => setStep(3)} saveInitial={setInitialDate} saveFinal={setFinalDate} />
        )}

        {step == 3 && (
          <StepThree next={() => setStep(4)} saveProperties={setProperties}
            initialDate={initialDate} finalDate={finalDate} />
        )}

        {step == 4 && (
          <StepFour properties={properties} reports={reports} />
        )}
      </Container>
    </>
  )
}

export default RealEstates;