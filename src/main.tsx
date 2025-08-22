import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🔧 Inicializando XZenPress...');

// Verificar se o elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Elemento root não encontrado!');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Erro: Elemento root não encontrado</h1></div>';
} else {
  console.log('✅ Elemento root encontrado, iniciando React...');
  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

console.log('✅ XZenPress inicializado com sucesso!');
}