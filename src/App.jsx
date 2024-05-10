//#region imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Menu from './components/common/Menu'
import Footer from './components/common/Footer'
import Error from './components/views/Error'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import RutasProtegidas from './components/routes/RutasProtegidas'
import RutasAdministrador from './components/routes/RutasAdministrador'
import Carrito from './components/views/home/Pedido/Carrito'
import RealizarPedido from './components/views/home/Pedido/RealizarPedido'
import RutasUser from './components/routes/RutasUser'
import Principal from './components/views/home/Cliente/Principal'
import Detalle from './components/views/home/Cliente/Detalle'

//#endregion
function App() {
  //#region hooks
  const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || null;
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);
  //#endregion
  return (
    <>
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />
        <Routes>
          <Route exact path='/' element={<Principal />} />
          <Route exact path='/detalle/:id' element={<Detalle />} />
          <Route exact path='/MiCarrito' element={<Carrito />} />
          <Route exact path='/RealizarPedido' element={<RealizarPedido />} />
          <Route exact path='/Administrador/*' element={
            <RutasProtegidas>
              <RutasAdministrador/>
            </RutasProtegidas>
          } />
          <Route exact path="/Usuario/*" element={
            <RutasProtegidas>
              <RutasUser />
            </RutasProtegidas>} />
          **<Route exact path="/*" element={<Error />} />**
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
