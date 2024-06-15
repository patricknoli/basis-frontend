import { IncomeReportType } from "../types";

export type StepOneProps = {
  next: () => void;
  saveReports: React.Dispatch<React.SetStateAction<IncomeReportType[]>>;
}