import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/home.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route to='/'></Route>
        <Route to='*'></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
