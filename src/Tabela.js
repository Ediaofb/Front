function Tabela({vetor, selecionar}){ //Tabela está tendo acesso ao Json de produtos e ao método de seleção
    return (
      <table className="table">
         <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Selecionar</th>       
            </tr>
         </thead>

         <tbody>
            {   //Para cada índice do vetor irá gerar uma 'Tr' com suas respectivas 'Tds'
                vetor.map((obj, indice) => ( //obj tem o código do produto, o nome e a marca. indice = qual posição da linha eu estou
                  <tr key={indice}>
                        <td>{indice+1}</td> 
                        <td>{obj.nome}</td>
                        <td>{obj.marca}</td> {/* o indice está sendo gerado no map (é como um laço de repetição) */}
                        <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
{/*no button ñ posso inserir função selecionar diretamente no onClick, preciso passar por ArrowFunction pq tem parâmetro*/}
                  </tr>
                ))
            }
         </tbody>
      </table>
    
    )
}

export default Tabela;