import logo from './logo.svg';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import { useEffect, useState } from 'react';

function App() {
  
  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]); //produtos armazenará um vetor e nesse vetor haverá nossos objetos (cada objeto é um produto). Os [] indicam o uso de um vetor.

  //UseEffect -> é um Hook que é executado quando o nosso componente é montado. Qdo o formulário e a tabela estiverem sendo exibidos o UseEffect entra em ação.
   //useEffect();

  // Return
  return (
    <div>      
      <Formulario botao={btnCadastrar} />
      <Tabela />
    </div>
  );
}

export default App;
