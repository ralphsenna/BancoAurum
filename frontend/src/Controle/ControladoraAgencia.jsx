import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import FormCadAgencia from "../Formularios/FormCadAgencia";
import TabelaAgencia from "../Tabelas/TabelaAgencia";

const url = 'http://localhost:4000/agencia';

export default function ControladoraAgencia(props)
{
    /* const [mostrarTabela, setMostrarTabela] = useState(true);
    const [agencia, setAgencia] = useState([]);

    const [foiCarregado, setFoiCarregado] = useState(false);
    const [erro, setErro] = useState(null); */

    /* const [estaAtualizando, setEstaAtualizando] = useState(false);
    const [atualizandoVeiculo,setAtualizandoVeiculo] = useState({
        codigo:0,
        endereco:"",
        cidade:"",
        uf:""
    }); */



    

    /*function gravarAgencia(agencia)
    {
        if (!estaAtualizando)
        {
            fetch(localRecursos,{method:"POST",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(agencia)
            })
            .then(resposta => resposta.json())
            .then(retorno => {
                alert('Agencia incluído usando o id:' + retorno.id);
            });
        }
        else
        {
            fetch(localRecursos,{method:"PUT",
                                 headers:{'Content-Type':'application/json'},
                                 body:JSON.stringify(veiculo)
            })
            .then(resposta=>resposta.json())
            .then(retorno => {
                if (retorno.resultado){
                    alert('Veiculo atualizado com sucesso!');
                }
                else{
                    alert('Não foi possível atualizar o veiculo!');
                }
                setEstaAtualizando(false);
            });
        }
    }

    function atualizarVeiculo(veiculo)
    {
        setEstaAtualizando(true);
        setAtualizandoVeiculo(veiculo);
        setMostrarTabela(false);
    }

    function excluirVeiculo(veiculo) 
    {
        fetch(localRecursos,{method:"DELETE",
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify(veiculo)
        })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.resultado){
                alert('Veiculo deletado com sucesso!');
            }
            else{
                alert('Não foi possível deletar o veiculo!');
            }
            setEstaAtualizando(false);
        });
    }

    //gancho ou hook para manipular o ciclo de vida do componente
    //didMount, didUpdate, Umounting
    useEffect(()=>{
        buscarVeiculos();
    },[veiculos]);
    
    if(erro){
        return <div><p>Erro ao buscar veiculos : {erro.message}</p></div>
    }else if(!foiCarregado){
        return <div>
                  <Spinner animation="border" role="status">
                     <span className="visually-hidden">Carregando Veiculos'...</span>
                  </Spinner>
               </div>
    }else{

        return (
            <div>
               <Button onClick={()=>setMostrarTabela(!mostrarTabela)}>Cadastrar</Button> 
               {mostrarTabela ? <TabelaCadastroVeiculos veiculos={veiculos} atualizarVeiculo={atualizarVeiculo} excluirVeiculo={excluirVeiculo}/>:
                                <FormCadVeiculos onGravar={gravarVeiculo} veiculo={atualizandoVeiculo}/>}
            </div> 
                              
         );
    } */
}