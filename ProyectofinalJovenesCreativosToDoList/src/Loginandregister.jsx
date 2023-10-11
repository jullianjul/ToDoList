import React, { useEffect } from 'react';
import './Loginandregister.css';

function Loginandregister() {
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

  return (
    <div className="LoginAndRegister">
      <body>
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
              <form action="" className="formulario__login">
                <h2>Iniciar Sesión</h2>
                <input type="text" placeholder="Correo Electronico" />
                <input type="password" placeholder="Contraseña" />
                <button>Entrar</button>
              </form>
              <form action="" className="formulario__register">
                <h2>Regístrarse</h2>
                <input type="text" placeholder="Nombre completo" />
                <input type="text" placeholder="Correo Electronico" />
                <input type="text" placeholder="Usuario" />
                <input type="password" placeholder="Contraseña" />
                <button>Regístrarse</button>
              </form>
            </div>
          </div>
        </main>
      </body>
    </div>
  );
}

export default Loginandregister;
