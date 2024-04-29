import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({children, icon, width}) => {
  return (
    <button className={`
      px-4 py-3 flex items-center justify-center bg-black text-white font-semibold rounded
      ${width == 'full' ? "w-full" : "w-fit"}
    `}>
      {children}
      {!!icon && <div className="ml-4 text-[24px]">{icon}</div>}
    </button>
  )
}

export default Button