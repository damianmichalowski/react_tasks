import { useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-full w-full">
      <h1 className="mb-8">Zadania</h1>
      <div className="flex flex-row gap-8">
        <button
          onClick={() => {
            navigate('/Zadanie1')
          }}
        >
          Zadanie 1
        </button>
        <button
          onClick={() => {
            navigate('/Zadanie2')
          }}
        >
          Zadanie 2
        </button>
        <button
          onClick={() => {
            navigate('/Zadanie3')
          }}
        >
          Zadanie 3
        </button>
      </div>
    </div>
  )
}

export default Root
