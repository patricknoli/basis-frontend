import { useContext, useState } from "react"
import Header from "../../components/Header/External"
import Hero from "../../components/Hero"
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import Steps from "../../components/Steps";
import { AppContext } from "../../contexts/AppContext";
import { i18n } from "../../i18n";

const SignUp: React.FC = () => {
  const { lang } = useContext(AppContext);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [email, setEmail] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const stepsLabels = [
    i18n[lang].sign_up_step_one,
    i18n[lang].sign_up_step_two,
    i18n[lang].sign_up_step_three,
    i18n[lang].sign_up_step_four
  ]

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
            <Steps steps={[1, 2, 3, 4]} activeStep={step} stepsLabels={stepsLabels} />

            {step == 1 && (
              <StepOne next={() => setStep(2)} saveEmail={setEmail} />
            )}

            {step == 2 && (
              <StepTwo next={() => setStep(3)} email={email} />
            )}

            {step == 3 && (
              <StepThree next={() => setStep(4)} saveDocument={setDocument} />
            )}

            {step == 4 && (
              <StepFour next={() => setStep(5)} email={email} document={document} />
            )}

            {step == 5 && (
              <StepFive />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp