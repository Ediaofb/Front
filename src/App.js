import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // ***  Objeto produto  ***/
  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]); //produtos armazenará um vetor e nesse vetor haverá nossos objetos (cada objeto é um produto). Os [] indicam o uso de um vetor.
  const [objProduto, setObjProduto] = useState(produto); //Manipula o 'objeto produto'

    // Hooks é uma nova proposta que irá nos permitir utilizar estado, ciclo de vida, entre outras funcionalidades, sem a necessidade de escrevermos componentes com classe
    // UseEffect -> é um Hook que é executado quando o nosso componente é montado. Qdo o formulário e a tabela estiverem sendo exibidos o UseEffect entra em ação.
    // Faz a requisição com o BackEnd p/ obter os produtos e enviar p/ useState 'produtos'
    useEffect(()=>{
      fetch("http://localhost:8080/listar") //fetch = buscar. Retorna a lista.
      .then(retorno => retorno.json()) //pego o retorno e converto para 'json'
      .then(retorno_convertido => setProdutos(retorno_convertido));
    }, []); //[] = Garante a requisição p/ API apenas 1 vez. Pausa o loop infinito.

//Obtendo os dados do formulário
  const aoDigitar = (e) => { //const = função. e = evento - retorna "o evento"  
    setObjProduto({...objProduto, [e.target.name]:e.target.value}); //Pega o valor de objProduto = código, nome e marca. Pega o nome do input.
  } //e.target = retorna "o objeto" que está executando o evento em si.

  //Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', { //Faz a requisição http. Por padrão executa requisição do tipo Get!
      method: 'post',
      body: JSON.stringify(objProduto), //body = Os dados que vão ser utilizados para efetuar o cadastramento - Deve ser convertido para texto!
      headers: {
        'Content-type': 'application/json', //tipo de conteúdo = Json
        'Accept': 'application/json' //qual o tipo de conteúdo o cliente
      }
   })
   .then(retorno => retorno.json()) //Promisse - só executa qdo o fetch fizer a requisição. Deve ser convertida para um JSON
   .then(retorno_convertido => { //só será executado qdo o retorno da API for convertido para um JSON
    
    if(retorno_convertido.mensagem !== undefined) //se o retorno tiver mensagem, quer dizer que houve um erro
    {
      alert(retorno_convertido.mensagem)
    }else{
      setProdutos([...produtos, retorno_convertido]) //pega todos os valores contidos nesse vetor (setProdutos) e adiciona no banco
      alert('Produto cadastrado com sucesso!');
      LimparFormulario(); //vai limpar o objeto, mas os input's ñ. Então preciso passá-los p/ o componente Formulário 
    }

   })
  }

  //Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', { //Faz a requisição http. Por padrão executa requisição do tipo Get!
      method: 'put',
      body: JSON.stringify(objProduto), //body = Os dados que vão ser utilizados para efetuar a alteração - Deve ser convertido para texto!
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
   })
   .then(retorno => retorno.json()) //Promisse - só executa qdo o fetch fizer a requisição. Deve ser convertida para um JSON
   .then(retorno_convertido => { //só será executado qdo o retorno da API for convertido para um JSON
    
    if(retorno_convertido.mensagem !== undefined) //se ñ for informado o nome do produto ou a marca
    {
      alert(retorno_convertido.mensagem)
    }else{ //efetua a alteração
      
      //Mensagem
      alert('Produto alterado com sucesso!');
    
    // Cópia do vetor de produtos
    let vetorTemp = [...produtos]//let só é válido dentro de um bloco {}. vetorTemp terá acesso a "todos" os produtos
    
    //Índice - define em qual posição do vetor removerá o produto
    let indice = vetorTemp.findIndex((p) => { //percorre o vetor e retorna a posição de alguma verificação. p = produto. A cada linha do vetor o 'p' terá acesso ao código, o nome e a marca.
      return p.codigo === objProduto.codigo; //retorna a posição do vetor onde tem o produto com aquele mesmo código
    });
    
    //Alterar produto do vetorTemp
    vetorTemp[indice] = objProduto; //Recebe meu objProduto no local q eu quero alterar
    
    //Atualizar o vetor de produtos
    setProdutos(vetorTemp);

      //Limpar o formulário
      LimparFormulario(); //vai limpar o objeto, mas os input's ñ. Então preciso passá-los p/ o componente Formulário 
    }

   })
  }

  //Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, { //Faz a requisição http. Por padrão executa requisição do tipo Get!
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
   })
   .then(retorno => retorno.json()) //Promisse - só executa qdo o fetch fizer a requisição. Deve ser convertida para um JSON
   .then(retorno_convertido => { //só será executado qdo o retorno da API for convertido para um JSON
    
    //mensagem
    alert(retorno_convertido.mensagem)

    // Cópia do vetor de produtos
    let vetorTemp = [...produtos]//let só é válido dentro de um bloco {}. vetorTemp terá acesso a "todos" os produtos

    //Índice - define em qual posição do vetor removerá o produto
    let indice = vetorTemp.findIndex((p) => { //percorre o vetor e retorna a posição de alguma verificação. p = produto. A cada linha do vetor o 'p' terá acesso ao código, o nome e a marca.
      return p.codigo === objProduto.codigo; //retorna a posição do vetor onde tem o produto com aquele mesmo código   
    });

    //Remover produto do vetorTemp
    vetorTemp.splice(indice, 1); //permite remover elementos em uma posição específica  de um array.

    //Atualizar o vetor de produtos
    setProdutos(vetorTemp);

     //Limpar formulário
    LimparFormulario(); //limpa os campos, oculta botões alterar, remover, cancelar e exibe botão de cadastro

   })
  }
  
  // Limpar Formulário
  const LimparFormulario = () => {
    setObjProduto(produto); //Recebe o modelo que está sempre limpo (zerado)
    setBtnCadastrar(true); //O botão de cadastro fica visível e os demais ficam ocultos
  }

  //Selecionar Produto - Eh uma função!
  const selecionarProduto = (indice) => { //indice indica qual produto irei exibir no formulário
    setObjProduto(produtos[indice]); //Seleciona o código, o nome e a marca de um produto
    setBtnCadastrar(false); //Qdo seleciona prod. permite alterar, remover ou cancelar ação, ocultando o cadastramento 
  }

  //Retorno
  return (
    <div>
      {/*<p>{JSON.stringify(objProduto)}</p>*/} {/*converte um objProduto para JSON*/}
      
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={LimparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>  {/* selecionar é uma propriedade! */}
    </div>
  );
}

export default App;