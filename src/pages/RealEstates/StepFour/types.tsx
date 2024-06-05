import { ReportType } from "../types";

export type StepFourProps = {
  properties: number[];
  reports: ReportType[];
  initialDate?: string;
  finalDate?: string;
}