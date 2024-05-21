import { TbCircleFilled } from "react-icons/tb";
import { StepsProps } from "./types";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmark, IoInformationCircleOutline } from "react-icons/io5";

const Steps: React.FC<StepsProps> = ({ steps, activeStep, stepsLabels }) => {

  return (
    <div className="my-4 flex items-center justify-between w-full md:max-w-[700px] md:px-10 md:pb-16">
      {steps.map((step, index) => (
        <>
          <div className="relative" key={index}>
            {activeStep >= step ? (
              <>
                <TbCircleFilled className="md:hidden" size={12} color="#5D41D0" />
                {activeStep > step ? (
                  <div className="hidden w-8 h-8 bg-[#A2F07B] rounded-full md:flex items-center justify-center">
                    <IoCheckmark />
                  </div>
                ) : (
                  <div className="hidden w-8 h-8 bg-[#00C2FF] outline outline-2 outline-offset-4 outline-[#00C2FF] rounded-full md:flex items-center justify-center">
                    <IoInformationCircleOutline />
                  </div>
                )}
                
              </>
            ) : (
              <>
                <FaRegCircle className="md:hidden" size={10} color="#B0AAAA" />
                <div className="hidden w-8 h-8 bg-[#DCDCDC] rounded-full md:flex items-center justify-center">
                  <IoInformationCircleOutline />
                </div>
              </>
            )}
            <span className={`hidden md:block text-sm text-center w-[100px] absolute left-[-100%] bottom-[-150%]
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