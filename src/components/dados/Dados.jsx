import React, {useState} from 'react';
import {Container, Snackbar} from "@material-ui/core"
import CadastraAcao from '../CadastraAcao/CadastraAcao';
import ListaAcoes from '../ListaAcoes/ListaAcoes';
import "./estilo.css"
import ListaVenda from '../ListaVenda/ListaVenda';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert'
import Usuario from '../Usuario/Usuario';



function Dados()  {

const [usuario, setUsuario] = useState('')
const [acoes, setAcoes] = useState([])
//const [acoes, setAcoes] = useState(JSON.parse(localStorage.getItem(`acoes${usuario}`)) || [])

const [snack, setSnack] = useState({status: false, severity: '', text: ''})


//SNACK --------------------------------------------
const handleSnackOn = (severity, text) => {
    const novoSnack = {status: true, severity: severity, text: text}
    setSnack(novoSnack);
    };

const snackOff = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const resetSnack = {status: false, severity: '', text: ''}
    setSnack(resetSnack);
    };

const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
    }));

const classes = useStyles();
//SNACK ------------------------------------------------------




const atua = (array) =>{

    gravarListaAcoes(array, usuario)
    setAcoes(array)

  }



const novaAcao = (dados) => {

    var verificador = acoes.findIndex(item => 
      
       item.nomeAcao === dados.nomeAcao
    )
        
    if(verificador < 0){

       const novaArrayAcoes = [...acoes, dados]
     //const novoEstado = {acoes: novaArrayAcoes}
       atua(novaArrayAcoes)
       handleSnackOn('success', 'Novo Investimento Adicionado com Sucesso!')

    } else {
        
            var valorAntigo = Number(acoes[verificador].precoAcao)
            var qtdAntiga = Number(acoes[verificador].qtdAcao)
            var valorCompra = Number(dados.precoAcao)
            var qtdCompra = Number(dados.qtdAcao)
        


            if(dados.qtdAcao<0){


                let qtdAcaoNova = dados.qtdAcao + qtdAntiga

                if(qtdAcaoNova === 0){

                    document.querySelector(`#${dados.nomeAcao}`).className = "fade"
                    setTimeout(function(){

                        apagaAcao(dados.nomeAcao)
                        handleSnackOn('success', `Todas as Acoes da ${dados.nomeAcao} foram Vendidas com Sucesso!`)
        
                    }, 850) 
                    
                    
                }else{

                    const arrayComVenda = acoes.map(item => item)
                    arrayComVenda[verificador].qtdAcao = qtdAntiga+qtdCompra
                    atua(arrayComVenda)
                    handleSnackOn('success', `${-dados.qtdAcao} Acoes da ${dados.nomeAcao} foram vendidas com Sucesso!`)

                }


            }else {

                var precoMedioNovo = ((valorAntigo*qtdAntiga)+(valorCompra*qtdCompra))/(qtdAntiga+qtdCompra)

                var qtdTotal = qtdCompra+qtdAntiga
                
                const arrayPronta = acoes.map(item => item)
                console.log(arrayPronta)
                arrayPronta[verificador].qtdAcao = qtdTotal
                arrayPronta[verificador].precoAcao = precoMedioNovo.toFixed(2)
                                
                atua(arrayPronta)
                handleSnackOn('success', `${qtdCompra} Novas Acoes da ${dados.nomeAcao} foram adicionadas com Sucesso!`)
                console.log(acoes)

         }}
    
}





const atualizaLista = (lista) => {

    if (lista.length === acoes.length ) {

        let novaArray = lista.map((item, index) => {

            if(item.precoHoje > 0) {
          
                return item

            } else {

                  var novoItem = {}
                  acoes.forEach(acaoExiste => {

                      if(acaoExiste.nomeAcao === item.nomeAcao){

                        novoItem = acaoExiste
                      }
            
                  })
                     
                  return novoItem

                   }

        })

        atua(novaArray)
        handleSnackOn('info', 'Os Valores das Acoes foram Atualizados!')

      console.log(novaArray)
  } 
}
  




const apagaAcao = (nome) => {

    let nArray = acoes.filter((item) => {

          if(item.nomeAcao===nome){

            console.log(item.nomeAcao)
            return ''

          } else{

            return item
          }

    }) 

    atua(nArray)
    handleSnackOn('warning', 'Acao foi excluida com Sucesso!')
    console.log(nArray)
}


const _handleUsuarioExistente = () => {

    return(

        <Container>

                    
                <CadastraAcao novaAcao={novaAcao} atualiza={atualizaLista} acoes={acoes}/>

                <ListaAcoes enviaAcoes={acoes} apagaAcao={apagaAcao}/>
                
                <ListaVenda enviaAcoes={acoes} novaAcao={novaAcao} usuario={usuario}/>

                <div className={classes.root}>
                        <Snackbar open={snack.status} autoHideDuration={5000} onClose={snackOff}>
                            <Alert onClose={snackOff} severity={snack.severity}>
                                {snack.text}
                            </Alert>
                        </Snackbar>
                    
                </div>
                          
    
        </Container>

    )

}
 

const _handleEscolhaUsuario = () => {

    return(

        <Usuario setUsuario={_setUsuarioAcao}/>

        )
}


const _setUsuarioAcao = (usuario) => {

    setUsuario(usuario)
    setAcoes(JSON.parse(localStorage.getItem(`acoes${usuario}`) || []))

}





return (
    
usuario ? _handleUsuarioExistente() : _handleEscolhaUsuario()
    
)


}


export default Dados



function gravarListaAcoes(lista, user){

    localStorage.setItem(`acoes${user}`, JSON.stringify(lista))
    
    
}



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}




/*
    <Container>

        

                    
          <CadastraAcao novaAcao={novaAcao} atualiza={atualizaLista} acoes={acoes}/>

          <ListaAcoes enviaAcoes={acoes} apagaAcao={apagaAcao}/>
            
          <ListaVenda enviaAcoes={acoes} novaAcao={novaAcao}/>

            <div className={classes.root}>
                    <Snackbar open={snack.status} autoHideDuration={5000} onClose={snackOff}>
                        <Alert onClose={snackOff} severity={snack.severity}>
                            {snack.text}
                        </Alert>
                    </Snackbar>
                
            </div>
                            
      
      </Container>
      */