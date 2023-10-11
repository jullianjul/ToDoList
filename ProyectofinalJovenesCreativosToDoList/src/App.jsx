import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginandregister from './Loginandregister';
import './App.css';
import Homem from './Homem';


function Home() {

  return(
    <Homem/>
  )
}

function SearchPage() {
  return <h1>Search Page</h1>;
}


function App() {
  return (
    <div className='App'>
      <div className='header'>
      <h1 className='titulo'>Tu lista Maestra</h1>
        <nav className='Cajanav'>
          <ul className='Navs'>
            <li><a href="/">Home</a></li>
            <li><a href="/SearchPage">Search Page</a></li>
            <li><a href="/Loginandregister">Registrarse/Iniciar</a></li>
          </ul>
        </nav> 
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/SearchPage' element={<SearchPage />} />
        <Route path='/Loginandregister' element={<Loginandregister/>} />
      </Routes>
    </div>
  );
}

export default App;

