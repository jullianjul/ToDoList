import React, { useEffect, useState } from 'react';
import './Loginandregister.css';
import Input from './input';
import { Register } from './licomponents/Register';
import Modal from './Modals/Modal';
import { useDarkMode } from './Modals/DarkModeContext';
import { useNavigate } from "react-router-dom";

const LoginAndRegister= () => {
  {/*inicio animación*/}
  const { darkmode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const getislog = localStorage.getItem('islog')||{};
  useEffect(() => {
    console.log(getislog)
    if(getislog==='true'){
      redirectuser();
    }
    // Opcional: puedes devolver una función de limpieza (cleanup) si es necesario
    return () => {
      // Código de limpieza (se ejecuta cuando el componente se desmonta o cuando las dependencias cambian)
    };
  }, []);
  function redirectuser(){
    toggleDarkMode();
    toggleDarkMode();
    navigate('/ToDoList/aplication');
  }
  
  {/*Fin animación*/}

  {/*recibidor de parametros*/}
  {/* parametros login*/}
  const [Email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [passwordError, setPasswordError]= useState(false);
  const [isLogin, setIsLogin]= useState(false);
  const [hasError, setHasError]= useState(false);
  const [registersuccess, setRegisterSuccess]= useState(false);
  {/*fin parametros login*/}
   {/*funciones login*/}
  function handleChange(attributes,Value){
    setEmailAlreadyRegister(false);
    setRegisterSuccess(false);
    setUserAlreadyRegister(false);
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


  




  function handleSubmit(){
    let account = {Email, password}
    if (account){
      ifMatch(account)
    }
  } 

  function ifMatch(accountuser) {
    // Obtén el objeto de usuarios almacenados en localStorage
    const usersData = JSON.parse(localStorage.getItem('usertotalinfo')) || [];
    const matchingUser = usersData.find(user => user.EmailR === accountuser.Email && user.passwordR === accountuser.password);
  
    if (accountuser.Email.length > 0 && accountuser.password.length > 0 && matchingUser) {
      const { EmailR, passwordR, NameR, username } = matchingUser;
      let ac = { EmailR, passwordR,NameR, username};
      let account = JSON.stringify(ac);
      localStorage.setItem('account', account);
      localStorage.setItem('islog', true);
      setIsLogin(true);
      setHasError(false);
  
      console.log('Usuario logueado:', NameR);
        // Retraso de 0.5 segundos antes del primer toggleDarkMode
          setTimeout(() => {
            toggleDarkMode();
            // Retraso de 0.5 segundos antes del segundo toggleDarkMode
            setTimeout(() => {
              toggleDarkMode();
              navigate("/ToDoList/Aplication");
            }, 10);
          }, 10);

      navigate("/ToDoList/Aplication");
    } else {
      setIsLogin(false);
      setHasError(true);
      console.log('Credenciales incorrectas o usuario no encontrado');
    }
  }
  

  {/*fin parametros login*/}


  {/*funciones register*/}
  
  const [EmailR, setEmailr]= useState('');
  const [passwordR, setPasswordr]= useState('');
  const [NameR, setNamer]= useState('');
  const [username, setUserName]= useState('');
  const [passwordErrorR, setPasswordErrorr]= useState(false);
  const [EmailError, setEmailError]= useState(false);
  const [hasErrorR, setHasErrorr]= useState(false);
  const [UserError, setUserError]= useState(false);
  const [Useralreadyregister, setUserAlreadyRegister]= useState(false);
  const [Emailalreadyregister, setEmailAlreadyRegister]= useState(false);



  function handleChangeregister(attributes,Value){
    setRegisterSuccess(false);
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
    if(attributes.name==='Nameuser'){
      setNamer(Value)
      setHasErrorr(false)
    }
    if (attributes.name === 'Emailr') {
      if (Value.includes('@')) {
        // Verifica si el email contiene el símbolo "@"
        if (Value.length < 5) {
          // Verifica si el email tiene una longitud mínima (5 caracteres en este ejemplo)
          setEmailError(true);
          console.log('El email debe ser más largo');
        } else {
          // El email contiene "@" y tiene longitud suficiente
          setEmailError(false);
          setEmailr(Value);
          console.log('El email es válido');
        }
      } else {
        // El email no contiene el símbolo "@"
        setEmailError(true);
        console.log('El email no es válido');
        setHasErrorr(false)
      }
    }

    if(attributes.name==='Usernamer'){
      //comprueba si el user tiene mas de 6 caracteres
      setUserName(Value);
      setHasErrorr(false);
      if(username.length<5){
        setUserError(true);
      }else{
        if(username.length>=20){
          setUserError(true)
        }else{
          setUserError(false);
        }
      }
    }
    if(attributes.name==='Passworduser'){
      setHasErrorr(false)
      if(Value.length<6){
        setPasswordErrorr(true);
      }else{
        setPasswordr(Value)
        setPasswordErrorr(false);

      }
    }
  }
  console.log('contraseña',passwordR,passwordErrorR)

  function handleSubmitregister(){
    if((EmailR!=='')||(passwordR!=='')||(username!=='')||(NameR!=='')){
      if((EmailError===true) || (passwordErrorR===true) || (UserError===true)){
        console.log('papi, llene bien los campos')
        setHasErrorr(true)
      }else{
        let usertotalinfo={EmailR,passwordR,NameR,username}
        console.log('user:', usertotalinfo)
        if(usertotalinfo){
        ifmatches(usertotalinfo)
        }
        
      }
    }else{
      console.log('XD dejaba los campos vacios')
      setHasErrorr(true)
    }
  }

  function ifmatches(props) {
    const { EmailR, passwordR, NameR, username } = props;
  
    // Paso 1: Obtén el valor actual del localStorage o inicializa un arreglo vacío si no existe
    const existingData = JSON.parse(localStorage.getItem('usertotalinfo')) || [];
  
    // Paso 2: Verifica si el correo electrónico ya existe en el registro
    const isEmailAlreadyExists = existingData.some(user => user.EmailR === EmailR);
    const isUserAlreadyExists = existingData.some(user => user.username === username);
    if (isUserAlreadyExists) {
      // El correo electrónico ya está registrado, muestra un mensaje de error
      console.log('El correo usuario ya está registrado');
      setUserAlreadyRegister(true);
    }
    if (isEmailAlreadyExists) {
      // El correo electrónico ya está registrado, muestra un mensaje de error
      console.log('El correo electrónico ya está registrado');
      setEmailAlreadyRegister(true);
      console.log(Emailalreadyregister)
      return;
    }
    if (isUserAlreadyExists) {
      // El correo electrónico ya está registrado, muestra un mensaje de error
      console.log('El correo usuario ya está registrado');
      setUserAlreadyRegister(true);
      return;
    }
  
    // El correo electrónico no está registrado, puedes agregar al nuevo usuario
    const newUserInfo = { EmailR, passwordR, NameR, username };
    existingData.push(newUserInfo);
  
    // Paso 3: Guarda el arreglo actualizado en el localStorage
    localStorage.setItem('usertotalinfo', JSON.stringify(existingData));
    console.log('Usuario registrado exitosamente');
    setRegisterSuccess(true);
  }
  
  {/*fin funciones register*/}
  {/* register success functions*/}


  const handleModalClose = () => {
    setRegisterSuccess(false);
    // Habilita la interacción con la página nuevamente
  }
  const handleModalCloseeu = () => {
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
  }

  const handleContinue = () => {
    setRegisterSuccess(false);
    let ac = { EmailR, passwordR,NameR, username};
    let account = JSON.stringify(ac);
    localStorage.setItem('account', account);
    localStorage.setItem('islog', true);
    setIsLogin(true);
    setHasError(false);
            // Retraso de 0.5 segundos antes del primer toggleDarkMode
            setTimeout(() => {
              toggleDarkMode();
              // Retraso de 0.5 segundos antes del segundo toggleDarkMode
              setTimeout(() => {
                toggleDarkMode();
                navigate("/ToDoList/Aplication");
              }, 10);
            }, 10);

    console.log('Usuario logueado:', NameR);


    navigate("/ToDoList/Aplication");
    // Lógica para continuar, si es necesario
    // Por ejemplo, redirigir a otra página
  }
  const handleContinueeu = () => {
    setEmailAlreadyRegister(false);
    setUserAlreadyRegister(false);
  }
  

  {/* register success functions end*/}

  //darkmode
  
  const Background=()=>{
    return <main className={darkmode?'Backgrounddark':'Background'}></main>
  }
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  return (
    <>
    {registersuccess &&         <Modal
  modalattributes={{
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: '', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: '', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
    anuncementtitle:'¡Bienvenido!',
    descriptiontext:'Te has registrado, dale click a "continuar" para iniciar sesión', //  TEXTO DENTRO DEL MODAL
    buttontext:'Continuar'
  }}
  onClose={handleModalClose}
  onContinue={handleContinue}
/>}

<Background />
{(Emailalreadyregister===true || Useralreadyregister===true) &&         (<Modal
  modalattributes={{
    modal: '', // Reemplaza '-modal-class' con la clase que desees para el contenedor modal.
    content: '', // Reemplaza '-content-class' con la clase que desees para el contenido modal.
    close: '', // Reemplaza '-close-class' con la clase que desees para el botón de cierre.
    container: '', // Reemplaza '-container-class' con la clase que desees para el contenedor de contenido.
    anouncement: 'useroremail_alert', // Reemplaza '-anouncement-class' con la clase que desees para el título.
    description: 'useroremail_alert_description', // Reemplaza '-description-class' con la clase que desees para la descripción.
    button: '', // Reemplaza '-button-class' con la clase que desees para el botón "Continuar".
    anuncementtitle:Emailalreadyregister==true && Useralreadyregister==true?('¡Usuario y Email en uso!'):(Emailalreadyregister==true?('¡Email en uso!'):('¡Usuario en uso!')),
    descriptiontext:Emailalreadyregister==true && Useralreadyregister==true?('Su usuario y su email ya estan registrados en la plataforma,porfavor inicie sesión'):(Emailalreadyregister==true?('Su email ya esta ingresado en nuestra plataforma, porfavor inicie sesión'):('Nombre de usuario repetido, porfavor intente con uno nuevo')), //  TEXTO DENTRO DEL MODAL
    buttontext:'Ok'
  }}
  onClose={handleModalCloseeu}
  onContinue={handleContinueeu}
/>)


}
    <div className="LoginAndRegister">
      {Emailalreadyregister &&
      <h1 className='Register-error'>Ya hay una cuenta con ese email, inicie sesión porfavor.</h1>
      }
      {Useralreadyregister &&
      <h1 className='Register-error'>Lo sentimos, parece que ya hay un usuario registrado con ese nombre de usuario, ingrese otro porfavor.</h1>
      }
      {hasErrorR &&
          <h1 className='Register-error'>Porfavor, llene bien los campos para poder ser registrado.</h1>
      }
        <main>
          <div className="contenedor__todo">
            <div className="contenedor__login-register">
              <form  className={darkmode?'formulario_dark':"formulario_"}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Iniciar Sesión</h2>
                
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
                  placeholder: 'Ingrese su contraseña',
                }
                }
                handleChange={handleChange}
                param={passwordError} 
                />
                {passwordError && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <input onClick={handleSubmit} type='button' value={'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Aun no estas registrado?</a>
                </div>
              </form> 
              <form className={`formulario_${darkmode?'dark':''} ${mostrarFormulario ? 'visible' : 'invisible'}`}>
                <h2 className={darkmode?'formtitledark':'formtitle'}>Regístrarse</h2>
                <Register attributes={{
                  id:'Nameuserid',
                  name: 'Nameuser',
                  type: 'text',
                  placeholder: 'Ingrese su Nombre',
                  Check: 'input_Style'
                }
                }handleChangeregister={handleChangeregister} />
                <Register attributes={{
                  id:'Correousuario',
                  name: 'Emailr',
                  type: 'text',
                  placeholder: 'Ingrese su Email',
                  Check: EmailError ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} 
                />
                {EmailError && 
                <label htmlFor="" className='label-error'>Debe ingresar un correo valido</label>
                }
                  <Register attributes={{
                  id:'Username',
                  name: 'Usernamer',
                  type: 'text',
                  placeholder: 'Ingrese su Nombre de usuario',
                  Check: UserError ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} />
                {UserError && 
                <label htmlFor="" className='label-error'>Su usuario debe ser entre 5 y 20 caracteres</label>
                }
                    <Register attributes={{
                  id:'Password',
                  name: 'Passworduser',
                  type: 'password',
                  placeholder: 'Ingrese una Contraseña',
                  Check: passwordErrorR ? 'input-error' : 'input_Style'
                }
                } handleChangeregister={handleChangeregister} 
                />
                {passwordErrorR && 
                <label htmlFor="" className='label-error'>contraseña invalida o incompleta</label>
                }
                <input type='button' onClick={handleSubmitregister} value={'Entrar'}  className={darkmode?'botonentrardark':'botonentrar'}/>
                <div className='Linkstoforms'>
                <a onClick={toggleFormulario} className={darkmode?'linktoformdark':'linktoform'}>¿Ya tiene cuenta?</a>
                </div>
              </form>
            </div>
          </div>
        </main>
    </div>
    </>
  );
}

export default LoginAndRegister;


