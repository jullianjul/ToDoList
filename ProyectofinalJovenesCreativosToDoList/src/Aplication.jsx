import React, { useEffect, useState } from 'react';
import './Aplication.css'

const Aplication = () => {
  const storedAccount = localStorage.getItem('account');
  const user = JSON.parse(storedAccount);
  const userEmail = user ? user.Email : '';
  const getislog = localStorage.getItem('islog');
  const isloguin = JSON.parse(getislog);

  // Estados para el contador y el valor inicial
  const [segundosRestantes, setSegundosRestantes] = useState(10);

  // Función que se ejecutará después de la cuenta regresiva
  const funcionDemorada = () => {
    window.location.href = '/Loginandregister';
  };

  useEffect(() => {
    if (!isloguin) {
      if (segundosRestantes > 0) {
        const intervalo = setInterval(() => {
          setSegundosRestantes((prevSegundos) => prevSegundos - 1);
        }, 1000);
        return () => {
          clearInterval(intervalo); // Limpieza al desmontar el componente
        };
      } else if (segundosRestantes === 0) {
        funcionDemorada();
      }
    }
  }, [segundosRestantes, isloguin]);

  const clearLocalStorage = () => {
    localStorage.removeItem('account'); // Borra 'account' del Local Storage
    localStorage.removeItem('islog'); // Borra 'islog' del Local Storage
    // Agrega aquí más llamadas a localStorage.removeItem para otros elementos que quieras eliminar.
    window.location.href = '/Loginandregister';
  };


  return (
    <div>
      {isloguin ? (
        <div>
          <h1>Bienvenido, {userEmail}</h1>
          {/* Aquí puedes incluir contenido adicional para usuarios logueados */}
          <button onClick={clearLocalStorage}>Cerrar Sesión</button>
        </div>
      ) : (
        <div className='alertnotlog'>
        <h1>Muy mal, no has iniciado sesión y estas intentando entrar</h1>
        {segundosRestantes > 0 && (
          <p>Redirigiendo en {segundosRestantes} segundos...</p>
        )}
        {segundosRestantes === 0 && (
          <p>Redirigiendo después de la cuenta regresiva.</p>
        )}
        {/* Aquí puedes incluir contenido adicional para usuarios que no se han logueado */}
      </div>
      )}
    </div>
  );
};

export default Aplication;
