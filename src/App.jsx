import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Principal from './components/views/Principal'
import Menu from './components/common/Menu'
import Footer from './components/common/Footer'
import Error from './components/views/Error'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import RutasProtegidas from './components/routes/RutasProtegidas'
import RutasAdministrador from './components/routes/RutasAdministrador'
import Detalle from './components/views/Detalle'
function App() {
  const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);

  return (
    <>
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} ></Menu>
        <Routes>
          <Route exact path='/' element={<Principal></Principal>}></Route>
          <Route exact path='/administrador/*' element={<RutasProtegidas><RutasAdministrador></RutasAdministrador></RutasProtegidas>}></Route>
          <Route exact path='/detalle/:id' element={<Detalle></Detalle>}></Route>
          <Route exact path="*" element={<Error></Error>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
