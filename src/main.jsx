import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from "react-router-dom";
import { DarkModeProvider } from './Modals/DarkModeContext'; // Importa el proveedor de contexto

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </HashRouter>
);
