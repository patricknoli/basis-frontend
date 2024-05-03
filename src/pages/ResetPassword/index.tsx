import { useState } from "react";
import Header from "../../components/Header/External";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const ResetPassword: React.FC = () => {
  const [ step, setStep ] = useState<1 | 2 | 3 | 4>(4);
  const [ code, setCode ] = useState<string>("");
  const [ document, setDocument ] = useState<string>("");

  return (
    <>
      <Header backButton={true} />
      <div className="p-5">
        {step == 1 && (
          <StepOne saveDocument={setDocument} next={() => setStep(2)} />
        )}
        
        {step == 2 && (
          <StepTwo saveCode={setCode} next={() => setStep(3)} />
        )}

        {step == 3 && (
          <StepThree code={code} document={document} 
          next={() => setStep(4)}/>
        )}

        {step == 4 && (
          <StepFour />
        )}

      </div>
    </>
  )
}

export default ResetPassword;