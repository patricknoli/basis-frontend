export type StepTwoProps = {
  next: () => void;
  saveInitial: React.Dispatch<React.SetStateAction<string>>
  saveFinal: React.Dispatch<React.SetStateAction<string>>
}