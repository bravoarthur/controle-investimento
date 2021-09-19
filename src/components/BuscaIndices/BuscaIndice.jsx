//import React from 'react';
import Requisicao from './Requisicao';

function BuscaIndice(acoes, atualizaLista) {

    let lista = acoes => new Promise((resolve, reject) => {

        let listaAtualiza = []
        acoes.map(async (item) => {
                
                return await Requisicao(item.nomeAcao)
            .then((resp) => {    

                return {
                    nomeAcao: item.nomeAcao,
                    dataAcao: item.dataAcao,
                    qtdAcao: item.qtdAcao,
                    precoAcao: item.precoAcao,
                    precoHoje: resp
                    }   
                })
            .then((resp) => {
                console.log(resp)
                listaAtualiza.push(resp)
                console.log(listaAtualiza.length)
                //LIBERA O RESOLVE SO QUANDO A VAR LISTAATUALIZADA CHEGOU NO MESMO LENGTH DA LISTA DE ACOES
                if(listaAtualiza.length===acoes.length){
                    resolve(listaAtualiza)
                }
                
                return resp
            })
            .catch((err) => console.log(err))
        })
      
    })
    
    lista(acoes)
    .then(resp => {
        console.log(resp)
        return resp
    })
    .then(response => atualizaLista(response))
    

}

export default BuscaIndice




/*    
    let listaAtualizada = []


    acoes.map(async (item) => {return await Requisicao(item.nomeAcao)
        .then((resp) => {
            
            return {
                nomeAcao: item.nomeAcao,
                dataAcao: item.dataAcao,
                qtdAcao: item.qtdAcao,
                precoAcao: item.precoAcao,
                precoHoje: resp
                }   
        })
        .then((resp) => listaAtualizada.push(resp))
        .then((resp) => console.log(listaAtualizada))
        .catch((err) => console.log(err))
        
    })


    setTimeout(function(){atualizaLista(listaAtualizada)}, 8000)
   


      
    //const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=PETR4.SA&interval=5min&apikey=${API_KEY}`
    //Symbol Search /https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=IBOV&apikey=$key
   */
   