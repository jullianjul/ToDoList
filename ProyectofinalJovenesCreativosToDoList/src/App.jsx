import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginandregister from './Loginandregister';
import './App.css';
import Homem from './Homem';
import Input from './input';


function Home() {

  return(
    <Homem/>
  )
}

const SearchPage= () => {

  const [user, setemail]= useState('')
  function handleChange(attributes, value){
    if(attributes.name === 'user'){
      setemail(value)
    }else{
      console.log('error')
    }
  }

  console.log('usuario',user)
  return(
    <>
    <Input attributes={{
                  id:'email',
                  name: 'user',
                  type: 'text',
                  placeholder: 'Ingrese su email'
                }
                } handleChange={handleChange}/>
    </>
  );
  
}


function App() {
  return (
    <div className='App'>
      <div className='header'>
      <h1 className='titulos'>Tu lista Maestra</h1>
        <nav className='Cajanav'>
          <ul className='Navs'>
            <li className='Navs_li'><a href="/">Home</a></li>
            <li className='Navs_li'><a href="/SearchPage">Search Page</a></li>
            <li className='Navs_li'><a href="/Loginandregister">Registrarse/Iniciar</a></li>
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

