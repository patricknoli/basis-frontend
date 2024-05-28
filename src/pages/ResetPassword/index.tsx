import { useState } from "react";
import Header from "../../components/Header/External";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Hero from "../../components/Hero";

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [code, setCode] = useState<string>("");
  const [document, setDocument] = useState<string>("");

  return (
    <>
      <div className="md:hidden">
        <Header backButton={true} />
      </div>
      <div className="flex h-[100vh]">
        <div className="hero hidden md:block basis-[45%]">
          <Hero />
        </div>
        <div className="p-5 flex items-start md:items-center justify-center basis-full md:basis-[55%]">
          <div className="max-w-[500px] w-full">
            {step == 1 && (
              <StepOne saveDocument={setDocument} next={() => setStep(2)} />
            )}

            {step == 2 && (
              <StepTwo saveCode={setCode} next={() => setStep(3)} />
            )}

            {step == 3 && (
              <StepThree code={code} document={document}
                next={() => setStep(4)} />
            )}

            {step == 4 && (
              <StepFour />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;