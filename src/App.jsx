import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/views/Home'
import Menu from './components/common/Menu'
import Footer from './components/common/Footer'
import Administrador from './components/views/Administrador'
import Error from './components/views/Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
function App() {
  const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);

  return (
    <>
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} ></Menu>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/administrador' element={<Administrador></Administrador>}></Route>
          <Route exact path="*" element={<Error></Error>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
