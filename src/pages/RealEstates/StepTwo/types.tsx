export type StepTwoProps = {
  next: () => void;
  saveInitial: React.Dispatch<React.SetStateAction<string | undefined>>
  saveFinal: React.Dispatch<React.SetStateAction<string | undefined>>
}