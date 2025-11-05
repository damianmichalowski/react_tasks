import { CircleChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <CircleChevronLeft
      className="size-16 hover:cursor-pointer hover:text-[#535bf2] transition-all absolute"
      onClick={() => {
        navigate('/')
      }}
    />
  )
}

export default BackButton
