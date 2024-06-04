import { ReportType } from "../types";

export type StepOneProps = {
  saveReports: React.Dispatch<React.SetStateAction<ReportType[]>>;
  next: () => void;
}