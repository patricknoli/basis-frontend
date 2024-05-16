import { TbCircleFilled } from "react-icons/tb";
import { StepsProps } from "./types";
import { FaRegCircle } from "react-icons/fa";

const Steps: React.FC<StepsProps> = ({ steps, activeStep }) => {

  return (
    <div className="my-4 flex items-center justify-between w-full">
      {steps.map((step) => (
        <>
          <div>
            {activeStep == step ? (
              <TbCircleFilled size={12} color="#5D41D0" />
            ) : (
              <FaRegCircle size={10} color="#B0AAAA" />
            )}
          </div>
          {step < steps.length && (
            <div className={`h-[1px] w-full 
             ${activeStep > step ? 'bg-[#5D41D0]' : 'bg-[#B0AAAA]'}
            `
            }></div>
          )}
        </>
      ))}
    </div>
  )
}

export default Steps;