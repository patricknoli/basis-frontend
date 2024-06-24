import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import hero from "../../assets/mock-hero.png"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

const Hero: React.FC = () => {
  const { dataId } = useContext(AppContext);

  return (
    <div className="bg-center bg-cover h-[100vh] w-full flex justify-center items-center gap-4 relative" style={{
      backgroundImage: `url(${hero})`
    }}>
      <img className="w-60" src={`https://images.locacaonet.basissistemas.com.br/${dataId}/logo.jpg`} alt="" />
      <h1 className="font-extrabold text-3xl text-white">Logo empresa</h1>

      <div className="flex justify-center gap-4 absolute bottom-20">
        <a href="https://facebook.com" target="_blank" className="p-3 rounded-full bg-white">
          <FaFacebookF color="#858888" />
        </a>
        <a href="https://instagram.com" target="_blank" className="p-3 rounded-full bg-white">
          <FaInstagram color="#858888" />
        </a>
        <a href="https://twitter.com" target="_blank" className="p-3 rounded-full bg-white">
          <FaTwitter color="#858888" />
        </a>
      </div>
    </div>
  )
}

export default Hero