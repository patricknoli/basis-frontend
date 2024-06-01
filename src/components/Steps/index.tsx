import { TbCircleFilled } from "react-icons/tb";
import { StepsProps } from "./types";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmark, IoInformationCircleOutline } from "react-icons/io5";

const Steps: React.FC<StepsProps> = ({ steps, activeStep, stepsLabels }) => {

  return (
    <div className="my-4 flex items-center justify-between gap-2 md:gap-0 w-full md:max-w-[790px]">
      {steps.map((step, index) => (
        <>
          <div className="relative flex flex-col items-center gap-3" key={index}>
            {activeStep >= step ? (
              <>
                {activeStep > step ? (
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#A2F07B] rounded-full flex items-center justify-center">
                    <IoCheckmark color="#fff" />
                  </div>
                ) : (
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#00C2FF] rounded-full flex items-center justify-center">
                    <IoCheckmark color="#fff" />
                  </div>
                )}

              </>
            ) : (
              <>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#97989B] rounded-full flex items-center justify-center text-xs text-white">
                  {step}
                </div>
              </>
            )}
            <span className={`hidden md:block text-sm text-center w-[100px] 
            ${activeStep == step && 'font-medium'}
            `}>
              {stepsLabels[index]}
            </span>
          </div>
          {step < steps.length && (
            <div className={`h-[1px] md:h-[2px] w-full 
             ${activeStep > step ? 'bg-[#5D41D0] md:bg-[#A2F07B]' : 'bg-[#B0AAAA]'}
            `
            }></div>
          )}
        </>
      ))}
    </div>
  )
}

export default Steps;