import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/views/home'
import Menu from './components/common/Menu'
import Footer from './components/common/footer'
import Administrador from './components/views/Administrador'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
function App() {
  const [receta, SetReceta] = useState({});
  const usuarioSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);


  const consultaApi = async () => {
    try {
      const consulta = await fetch('http://localhost:3004/comidas');
      const respuesta = await consulta.json();
      SetReceta(respuesta);
      console.log(respuesta);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    consultaApi();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} ></Menu>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/administrador' element={<Administrador></Administrador>}></Route>
          <Route exact path='*' element={<Error></Error>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
