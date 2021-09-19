import React, {useState} from 'react';
import {TextField, InputAdornment, OutlinedInput, FormControl,InputLabel, Button, Box} from '@material-ui/core'

import "./estilo.css"
import ExibeLista from './ExibeLista';


function ListaVenda({enviaAcoes, novaAcao, usuario}) {

    const [listaVenda, setVenda] = useState(JSON.parse(localStorage.getItem(`listaVenda${usuario}`)) || [])
    
    const [nomeAcao, setNome] = useState("")
    const [dataVenda, setDataVenda] = useState("")
    const [qtdAcaoVenda, setQtdAcaoVenda] = useState("")
    const [precoAcaoVenda, setPrecoVenda] = useState("")

    const [erro, setErro] = useState({classe: "hide", qtdPossivel: ""})




    const novaVenda = (acao) =>{

        const venda = {

            nomeAcao: nomeAcao,
            dataCompra: acao.dataAcao,
            dataVenda: dataVenda,
            qtdVenda: -qtdAcaoVenda,
            precoCompra: acao.precoAcao,
            precoVenda: precoAcaoVenda,
            rendimentoValor: '',
            rendimentoPercentual: '',
            rendimentoAA:''

        }
        let precoVenda = Number(precoAcaoVenda).toFixed(2)
        let rendimentoValor = ((precoAcaoVenda*-qtdAcaoVenda)-(acao.precoAcao*-qtdAcaoVenda)).toFixed(2)
        let rendimentoPercentual = (((precoAcaoVenda/acao.precoAcao)-1)*100).toFixed(2)
        let rendimentoAA = (calculaData(acao.dataAcao, dataVenda, rendimentoPercentual))
        rendimentoAA = Number(rendimentoAA).toFixed(2)
        venda.rendimentoValor = Number(rendimentoValor)
        venda.rendimentoPercentual = rendimentoPercentual
        venda.rendimentoAA = rendimentoAA
        venda.precoVenda = precoVenda
        const novaArrayVenda = [...listaVenda, venda]
        setVenda(novaArrayVenda)
        gravarListaVenda(novaArrayVenda, usuario)
        console.log(novaArrayVenda)

    }
    



    const _handleNovaVenda = () => {

        let verificador = enviaAcoes.findIndex(item => 
      
            item.nomeAcao === nomeAcao
        )
        
        if(verificador<0){

            const erroDeNome = {

                classe: "show erro",
                qtdPossivel: 0
            }

           setErro(erroDeNome)
           
           const foco = document.querySelector("#mensagemErro")
           setTimeout(function(){foco.scrollIntoView({behavior: "smooth"})}, 300)
            
        }else {
        

        if((Number(enviaAcoes[verificador].qtdAcao)+qtdAcaoVenda)<0){

                const erro = {

                    classe: "show erro",
                    qtdPossivel: enviaAcoes[verificador].qtdAcao
                }

               setErro(erro)
               
               const foco = document.querySelector("#mensagemErro")
               setTimeout(function(){foco.scrollIntoView({behavior: "smooth"})}, 300)
                                   
            
        } else {

                const acaoAntiga = enviaAcoes[verificador]
                novaVenda(acaoAntiga)            
                novaAcao({nomeAcao: nomeAcao, dataAcao: dataVenda, qtdAcao: qtdAcaoVenda, precoAcao: precoAcaoVenda})
                setErro({classe: "hide", qtdPossivel: ""})
                
            
            }


        }
    }




    const _handleCancela = () => {
        
        document.querySelector("#formVenda").className = "fadeOut"

        setTimeout(function() {document.querySelector("#formVenda").className = "hide"}, 300)

        setErro({classe: "hide", qtdPossivel: ""})
        document.querySelector("#data-acao-venda").value = ""
        document.querySelector("#numero-acao-venda").value = ""
        document.querySelector("#valor-acao-venda").value = ""
        
    }




    return(

        <>

            <form id="formVenda" className="hide" onSubmit={(event)=> {
                
                event.preventDefault()

                _handleNovaVenda()
                    
            }}>

                    <TextField id="nome-acao-venda" label="Nome da Acao" variant="outlined" margin="normal" onBlur={event => setNome(event.target.value)}/>

                    <TextField id="data-acao-venda" variant="outlined"  margin="normal" type="date" onChange={event => setDataVenda(event.target.value)}/>

                    <TextField id="numero-acao-venda" variant="outlined"  margin="normal" type="number" label="Numero de Acoes Vendidas" onChange={event => setQtdAcaoVenda(-event.target.value)}/>

                    
                    <FormControl variant="outlined" margin="normal">
                        <InputLabel htmlFor="valor-acao">Valor da Acao</InputLabel>

                        <OutlinedInput
                            id="valor-acao-venda"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={105}
                            onChange={event => setPrecoVenda(event.target.value)}
                        />
                        
                    </FormControl>

                   
                    <Box position='inherit' minWidth="64px" boxSizing='border-box' margin='0' display='inline-flex' marginLeft={4} marginTop={3}>
                    
                        <Button type="submit" color="primary" variant="contained" >Confimar</Button>
                    
                    </Box>

                   

                    <Box position='inherit' minWidth="64px" boxSizing='border-box' margin='0' marginLeft={4} display='inline-flex'marginTop={3}>

                        <Button color="secondary" variant="contained" margin="normal" onClick={_handleCancela}>Cancelar</Button>

                    </Box>
                    
                
            </form>

            <div>
                <p className={erro.classe} id="mensagemErro">ERRO - Nao e possivel vender mais que  {erro.qtdPossivel} Acoes</p>
            </div>

            <ExibeLista listaVenda={listaVenda}/>



        </>

    )

}



export default ListaVenda




function calculaData(dataAntiga, dataAtual, valorizacao) {

        const now = new Date(dataAtual); // Data de hoje
        const past = new Date(dataAntiga); // Outra data no passado
        const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
        if(days/365 >= 1) {
            return valorizacao/(days/365)
        }else{
            return valorizacao
        }

}

function gravarListaVenda(lista, user){

    localStorage.setItem(`listaVenda${user}`, JSON.stringify(lista))
    
}
