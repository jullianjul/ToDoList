import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import Input from './input';



const Loginandregister= () => {
  {/*inicio animación*/}
  useEffect(() => {
    const btnIniciarSesion = document.getElementById("btn__iniciar-sesion");
    const btnRegistrarse = document.getElementById("btn__registrarse");
    const cajaTraseraLogin = document.querySelector(".caja__trasera-login");
    const cajaTraseraRegister = document.querySelector(".caja__trasera-register");
    const formularioLogin = document.querySelector(".formulario__login");
    const formularioRegister = document.querySelector(".formulario__register");
    const contenedorLoginRegister = document.querySelector(".contenedor__login-register");

    const anchoPage = () => {
      if (window.innerWidth > 850) {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "block";
      } else {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.display = "none";
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioRegister.style.display = "none";
      }
    };

    anchoPage();

    const iniciarSesion = () => {
      if (window.innerWidth > 850) {
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "10px";
        formularioRegister.style.display = "none";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.opacity = "0";
      } else {
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioRegister.style.display = "none";
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "none";
      }
    };

    const register = () => {
      if (window.innerWidth > 850) {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.opacity = "0";
        cajaTraseraLogin.style.opacity = "1";
      } else {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.display = "none";
        cajaTraseraLogin.style.display = "block";
        cajaTraseraLogin.style.opacity = "1";
      }
    };

    btnIniciarSesion.addEventListener("click", iniciarSesion);
    btnRegistrarse.addEventListener("click", register);
    window.addEventListener("resize", anchoPage);

    return () => {
      // Eliminar los event listeners al desmontar el componente
      btnIniciarSesion.removeEventListener("click", iniciarSesion);
      btnRegistrarse.removeEventListener("click", register);
      window.removeEventListener("resize", anchoPage);
    };
  }, []);
  {/*Fin animación*/}

  {/*recibidor de parametros*/}
  
  const [Email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [passwordError, setPasswordError]= useState(false);
  const [isLogin, setIsLogin]= useState(false);
  const [hasError, setHasError]= useState(false);

  function handleChange(attributes,Value){
    if (attributes.name === 'email'){
      setEmail(Value)
      setHasError(false)
    } else if(attributes.name === 'Password'){
      if(Value.length <6){
        setPasswordError(true);
        setHasError(false)
      }else{
        setPasswordError(false);
        setPassword(Value)
        setHasError(false)
      }
    }
  }

  function ifMatch(param){
    if(param.Email.length > 0 && param.password.length > 0){
      if(param.Email==='juliandavidoviedoramirez@gmail.com' && param.password=== '123456'){
        const { Email, password}= param;
        let ac= {Email, password};
        let account = JSON.stringify(ac);
        localStorage.setItem('account',account)
        localStorage.setItem('islog',true)
        setIsLogin(true);
        setHasError(false);
        window.location.href = '/Aplication';
      } else{
        setIsLogin(false);
        setHasError(true);
        localStorage.setItem('islog',false)
      }
    }else {
      setIsLogin(false);
      setHasError(true);
      localStorage.setItem('islog',false)
    }
  }

  function handleSubmit(){
    let account = {Email, password}
    if (account){
      ifMatch(account)
    }
  } 
  return (
    <div className="LoginAndRegister">
        <main>
          <div className="contenedor__todo">
            <div className="caja__trasera">
              <div className="caja__trasera-login">
                <h3>¿Ya tienes una cuenta?</h3>
                <p>Inicia sesión para entrar en la página</p>
                <button id="btn__iniciar-sesion">Iniciar Sesión</button>
              </div>
              <div className="caja__trasera-register">
                <h3>¿Aún no tienes una cuenta?</h3>
                <p>Regístrate para que puedas iniciar sesión</p>
                <button id="btn__registrarse">Regístrarse</button>
              </div>
            </div>

            <div className="contenedor__login-register">
              <form  className="formulario__login">
                <h2>Iniciar Sesión</h2>
                {hasError &&
                <div className='label-alert'>
                <label htmlFor="" className='label-alert-content'>su contraseña o usuario son incorrectos o no estan en nuestra plataforma</label>
                </div>}
                <Input attributes={{
                  id:'email',
                  name: 'email',
                  type: 'text',
                  placeholder: 'Ingrese su email'
                }
                } handleChange={handleChange}/>
                <Input attributes={{
                  id:'Pass',
                  name: 'Password',
                  type: 'Password',
                  placeholder: 'Ingrese su contraseña'
                }
                }
                handleChange={handleChange}
                param={passwordError} 
                />
                {passwordError && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <input onClick={handleSubmit} type='button' value={'Entrar'}  className='botonentrar'/>
              </form> 
              <form className="formulario__register">
                <h2>Regístrarse</h2>
                <Input attributes={{
                  id:'Nameuserid',
                  name: 'Nameuser',
                  type: 'text',
                  placeholder: 'Ingrese su Nombre'
                }
                }handleChange={handleChange} />
                <Input attributes={{
                  id:'Correousuario',
                  name: 'Email',
                  type: 'text',
                  placeholder: 'Ingrese su Email'
                }
                } handleChange={handleChange} />
                  <Input attributes={{
                  id:'Username',
                  name: 'Username',
                  type: 'text',
                  placeholder: 'Ingrese su Nombre de usuario'
                }
                } handleChange={handleChange} />
                    <Input attributes={{
                  id:'Password',
                  name: 'Passworduser',
                  type: 'password',
                  placeholder: 'Ingrese una Contraseña'
                }
                } handleChange={handleChange} />
                {passwordError && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <button>Regístrarse</button>
              </form>
            </div>
          </div>
        </main>
    </div>
  );
}

export default Loginandregister;


