import { useState } from "react";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import StepOne from "./StepOne";
import Steps from "../../components/Steps";

const RealEstates: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [reports, setReports] = useState<string[]>([]);

  return (
    <>
      <Container>
        <Header home />

        <Steps steps={[1, 2, 3, 4]} activeStep={step} />

        {step == 1 && (
          <StepOne saveReports={setReports} next={() => setStep(2)} />
        )}
      </Container>
    </>
  )
}

export default RealEstates;