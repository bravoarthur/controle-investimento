//import React from 'react';



async function Requisicao(codigo){
    //Yahoo Finance 
    /*const URL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=BR&symbols=${codigo}.SA`

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "6ce439831amsh0af8f3adbe1b825p17829ajsne773577eed19",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    }*/

    
    //HG BRASIL
    //LOCALHOST
    //const API_KEY = 'a4c03c31' 
    //GHPAGES
    const API_KEY = '03421e3e'
    const URL = `https://api.hgbrasil.com/finance/stock_price?key=${API_KEY}&symbol=${codigo}&format=json-cors`

    const options = {
        
            method: 'GET',
            mode: 'cors',
            cache: 'default',
                    
    }
    


    
        
    return await fetch(URL, options)
    .then(response => {
        console.log(response)
        return response.json()})
    .then(response => {
        console.log(response)
        return response
    })
    //.then(response => response.quoteResponse.result[0].regularMarketPrice)
    .then(response => response.results[codigo].price)
    .catch(err => console.log(err))
  

}


export default Requisicao



/*
function getData(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    dd = String(dd-1)
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var data = `${yyyy}-${mm}-${dd}`

    return data

}*/

   /* let dados = await fetch(URL, options)
    .then(response => response.json())
    .catch(err => console.log(err))*/

    /*
    let dados = await (await fetch(URL, options)).json()
*/
    /*console.log(dados)
    return dados['Time Series (Daily)']['2021-08-13']['4. close']*/






    //ANTIGO

    /*
    const API_KEY = "YIP822P4X2VO5Y3I"
   // const API_KEY = "Y14EZXJTLRF8G06L"
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${codigo}.SA&interval=5min&apikey=${API_KEY}`
    
    const options = {

        method: 'GET',
        mode: 'cors',
        cache: 'default',
        
    }
    
    //const API_KEY = "ba7a7e4b"
    //const URL = `https://api.hgbrasil.com/finance/stock_price?key=${API_KEY}&symbol=${codigo}`

    const data = getData()
    */
    