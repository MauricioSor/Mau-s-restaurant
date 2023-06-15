import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/views/home'
import Menu from './components/common/Menu'
import Footer from './components/common/footer'
import Administrador from './components/views/Administrador'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {


  return (
    <>
    <BrowserRouter>
    <Menu></Menu>
      <Routes>
        <Route exact to='/'element={<Home></Home>}></Route>
        <Route exact to='/administrador'element={<Administrador></Administrador>}></Route>
        <Route exact to='*'  element={<Error></Error>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
