import Sidebar from "../Sidebar"

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="bg-[#F5F6FA] w-full min-h-[100vh] py-[70px] px-8 md:py-8 md:px-[332px]">
        {children}
      </div>
    </>
  )
}

export default Container