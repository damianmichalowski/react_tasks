import { Route, Routes } from 'react-router-dom'
import './App.css'
import Root from './pages/Root'
import Zadanie1 from './pages/Zadanie1'
import Zadanie2 from './pages/Zadanie2'
import Zadanie3 from './pages/Zadanie3'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/Zadanie1" element={<Zadanie1 />} />
        <Route path="/Zadanie2" element={<Zadanie2 />} />
        <Route path="/Zadanie3" element={<Zadanie3 />} />
      </Routes>
    </>
  )
}

export default App
