import { useState } from 'react'
import BackButton from '../components/backButton'
import { validatePesel } from '../utils/validatePesel'

type ResponseType = {
  valid: boolean
  error: string
}

const Zadanie1 = () => {
  const [pesel, setPesel] = useState('')
  const [response, setResponse] = useState<ResponseType>()
  const [submittedPesel, setSubmittedPesel] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesel(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const res = validatePesel(pesel)

    if (res) {
      setResponse(res)
      setSubmittedPesel(pesel)
    }
  }

  return (
    <>
      <BackButton />
      <div>
        <h1 className="mb-24">Zadanie 2</h1>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row items-center justify-center gap-8 mb-4"
        >
          <input
            className="bg-gray-600 px-2 border rounded-md"
            value={pesel}
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit">Validate Pesel</button>
        </form>
        {response?.valid ? (
          <p className="text-green-500">
            Pesel "{submittedPesel ?? ''}" jest poprawny
          </p>
        ) : (
          <p className="text-red-500">
            {response?.error &&
              response?.error + ' "' + (submittedPesel ?? '') + '"'}
          </p>
        )}
      </div>
    </>
  )
}

export default Zadanie1
