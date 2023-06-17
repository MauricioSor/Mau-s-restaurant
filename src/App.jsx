import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/views/home'
import Menu from './components/common/Menu'
import Footer from './components/common/footer'
import Administrador from './components/views/Administrador'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
function App() {
  const [receta, SetReceta] = useState({});
  const [mostrarSpinner, setMostrarSpinner] = useState(true);


  const consultaApi = async () => {
    setMostrarSpinner(true);
    try {
      const consulta = await fetch('http://localhost:3004/comidas');
      const respuesta = await consulta.json();
      SetReceta(respuesta);
      console.log(respuesta);
      setMostrarSpinner(false);
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
        <Menu></Menu>
        <Routes>
          <Route exact path='/' element={mostrarSpinner ? 
            (<div className="my-5 d-flex justify-content-center">
              <Spinner animation='border' variant='primary' />
            </div>)
            :
            (<Home receta={receta}></Home>)}>
          </Route>
          <Route exact path='/administrador' element={<Administrador></Administrador>}></Route>
          <Route exact path='*' element={<Error></Error>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
