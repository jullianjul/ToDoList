import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginandregister from './Loginandregister';
import './App.css';
import Homem from './Homem';
import Input from './input';
import Aplication from './Aplication';
import { Li } from './licomponents/li';

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
    const getislog = localStorage.getItem('islog');
    const isloguin = JSON.parse(getislog);
  return (
    <div className='App'>
      <div className='header'>
      <h1 className='titulos'>Tu lista Maestra</h1>
        <nav className='Cajanav'>
          <ul className='Navs'>
            <Li className='Navs_li' link='/' content='Home'/>
            <Li className='Navs_li' link='/SearchPage' content='SearchPage'/>
            <Li className={isloguin ? 'Navs_log_user' : 'Navs_li'} link={isloguin ? '/Aplication' : '/Loginandregister'} content={isloguin ? 'Ingresar' : 'Registrarse/iniciar'}/>
          </ul>
        </nav> 
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/SearchPage' element={<SearchPage />} />
        <Route path='/Loginandregister' element={<Loginandregister/>} />
        <Route path='/Aplication' element={<Aplication/>} />
      </Routes>
    </div>
  );
}

export default App;

