import { useContext, useState } from "react";
import { i18n } from "../../i18n";
import { AppContext } from "../../contexts/AppContext";
import Container from "../../components/Container";
import Header from "../../components/Header/Internal";
import Steps from "../../components/Steps";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { IncomeReportType } from "./types";
import StepOne from "./StepOne";

const IncomeReports: React.FC = () => {
  const { lang } = useContext(AppContext);
  const [step, setStep] = useState<number>(1);
  const [year, setYear] = useState<string>("");
  const [reports, setReports] = useState<IncomeReportType[]>([]);
  const stepsLabels = [
    i18n[lang].income_reports_steps_label_one,
    i18n[lang].income_reports_steps_label_two,
    i18n[lang].income_reports_steps_label_three
  ]

  return (
    <>
      <Container>
        <Header home={step == 1}
          back={step > 1} backAction={() => setStep(step - 1)} />

        <h1 className="hidden md:block text-3xl text-[#3A3541] font-semibold mb-10">{i18n[lang].income_reports_title}</h1>

        <Steps steps={[1, 2, 3]}
          stepsLabels={stepsLabels}
          activeStep={step} />


        {step == 1 && (
          <StepOne next={() => setStep(2)} saveReports={setReports} />
        )}

        {step == 2 && (
          <StepTwo next={() => setStep(3)} saveYear={setYear} />
        )}

        {step == 3 && (
          <StepThree year={year} reports={reports} />
        )}
      </Container>
    </>
  )
}

export default IncomeReports