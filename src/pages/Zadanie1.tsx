import { useRef, useState } from 'react'
import BackButton from '../components/backButton'

const Zadanie1 = () => {
  const [result, setResult] = useState('')
  const [original, setOriginal] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string
      setOriginal(content)
      setResult(scrambleText(content))
      console.log('Zawartość pliku:', content)
    }

    reader.readAsText(file, 'UTF-8')
  }

  const shuffleWord = (word: string) => {
    const chars = Array.from(word)
    if (chars.length <= 3) return word

    const first = chars[0]
    const last = chars[chars.length - 1]
    const middle = chars.slice(1, -1)

    for (let i = middle.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1))
      const temp = middle[i]
      middle[i] = middle[random]
      middle[random] = temp
    }

    return [first, ...middle, last].join('')
  }

  const scrambleText = (text: string): string => {
    return text.replace(/\p{L}+/gu, (match) => shuffleWord(match))
  }

  const reset = () => {
    setOriginal('')
    setResult('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <BackButton />
      <div>
        <h1 className="mb-24">Zadanie 1</h1>

        <div className="p-4">
          <h1 className="mb-8">Wgraj text</h1>
          <div className="flex flex-row items-center justify-center gap-8">
            <input
              type="file"
              accept=".txt,text/plain"
              className="bg-gray-600 px-2 border rounded-md"
              onChange={onFileChange}
              ref={fileInputRef}
            />
            <button onClick={reset}>Resetuj</button>
          </div>
          <h1 className="mt-12">Original text</h1>
          <p className="mt-4 whitespace-pre-wrap">{original}</p>

          <h1 className="mt-12">Potasowany text</h1>
          <p className="mt-4 whitespace-pre-wrap">{result}</p>
        </div>
      </div>
    </>
  )
}

export default Zadanie1
