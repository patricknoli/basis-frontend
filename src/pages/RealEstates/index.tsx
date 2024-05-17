import { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import StepOne from "./StepOne";
import Steps from "../../components/Steps";
import StepTwo from "./StepTwo";

const RealEstates: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [reports, setReports] = useState<string[]>([]);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");

  return (
    <>
      <Container>
        <Header home />

        <Steps steps={[1, 2, 3, 4]} activeStep={step} />

        {step == 1 && (
          <StepOne saveReports={setReports} next={() => setStep(2)} />
        )}

        {step == 2 && (
          <StepTwo next={() => setStep(3)} saveInitial={setInitialDate} saveFinal={setFinalDate} />
        )}
      </Container>
    </>
  )
}

export default RealEstates;