import React from 'react';
import "./estilo.css"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SwapVertIcon from '@material-ui/icons/SwapVert';



function ListaAcoes({enviaAcoes, apagaAcao}) {

    const lista = enviaAcoes
   


    const _handleApagaAcao = (event) => {

        event.preventDefault()
        event.stopPropagation()
        
        if(window.confirm("Quer Deletar")===true){
            
            var linha = event.target.parentElement.closest('tr')
            console.log(linha)
            linha.className = "fade"

            var trNome = linha.id
                   
            linha.className = "fade"

                     
            setTimeout(function(){

                apagaAcao(trNome)

            }, 850) 

           
        } else{

            console.log("Exclusao Cancelada")
            
        }       


    }

    const _handlePrecoHoje = (precoHoje) =>{

        let preco = parseFloat(precoHoje)
        let precoCorreto = preco.toFixed(2)

        return precoCorreto
    }

    const _handleAltaQueda = (precoAcao, precoHoje) => {

        let resultado = parseFloat((((precoHoje/precoAcao)-1)*100).toFixed(2))
        
        return `${resultado}%`

    }

    const _handleAltaQuedaClass = (precoAcao, precoHoje) => {

        let resultado = parseFloat((((precoHoje/precoAcao)-1)*100).toFixed(2))
        
        return resultado

    }

    const _handleSaldoAcao = (precoAcao, precoHoje, qtdAcao) => {

        let resultado = (precoHoje*qtdAcao)-(precoAcao*qtdAcao)
        let total = resultado.toFixed(2)
        


        return `R$  ${total}`


    }

    const _handleValorizacaoAno = (dataAcao, precoAcao, precoHoje) => {

        let resultado = parseFloat((((precoHoje/precoAcao)-1)*100).toFixed(2))

        const now = new Date(); // Data de hoje
        const past = new Date(dataAcao); // Outra data no passado
        const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
        if(days/365 >= 1) {
            return resultado/(days/365)
        }else{
            return resultado
        }

        
        }

    const _handleInvestimentoInicial = (acoes) => {

        let valorInicial = 0

        acoes.forEach(acao => {

            valorInicial += acao.qtdAcao*acao.precoAcao
        })

        let valorInicalReais = valorInicial.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

        let investimentoInicial = [valorInicial, valorInicalReais]
        
        return investimentoInicial
    }

    const _handleSaldoAtual = (acoes) => {

        let valorAtual = 0

        acoes.forEach(acao => {

            valorAtual += acao.qtdAcao*acao.precoHoje
        })

        let valorAtualReais = valorAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

        let saldoAtual = [valorAtual, valorAtualReais]
        
        return saldoAtual
    }

    const _handleSaldoPorcentual = () => {

        var saldoPorcentual = ((_handleSaldoAtual(lista)[0] / _handleInvestimentoInicial(lista)[0])-1)*100

        var classe = ''

        if(saldoPorcentual>0){
            classe = "positivo"
        } else if(saldoPorcentual<0){
            classe = "negativo"
        }

        saldoPorcentual = saldoPorcentual.toFixed(2)

        return [saldoPorcentual, classe]

    } 

    const _handleSaldoCarteira = () => {

        let saldoCarteira = _handleSaldoAtual(lista)[0] - _handleInvestimentoInicial(lista)[0]

        saldoCarteira = saldoCarteira.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        
        return saldoCarteira
        
    }

    const _handleTotalAcao = (event) =>{

        const index = event.target.id
        const preco = lista[index].precoAcao
        const qtd = lista[index].qtdAcao
        const precoTotal = preco*qtd
        event.target.innerText = precoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        
    }

    const _handleMouseOut = (event) =>{

        const index = event.target.id
        const preco = lista[index].precoAcao
        event.target.innerText = preco.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        
    }

    const _handleVender = (event) => {

        let nomeAcao = event.target.parentElement.closest('tr')
        nomeAcao = nomeAcao.id    
                
        let formVenda = document.querySelector("#formVenda")
        formVenda.className = "show"
        formVenda.scrollIntoView()
        formVenda.querySelector('#nome-acao-venda').focus()
        formVenda.querySelector('#nome-acao-venda').value = nomeAcao

    }

    
    //[{nomeAcao: "Americanas", dataAcao: "2021-07-29", qtdAcao: "50", precoAcao: "35.02", precoHoje: "37.02"}, {nomeAcao: "TIM", dataAcao: "2021-07-29", qtdAcao: "39", precoAcao: "32.50", precoHoje: "34.02"}, {nomeAcao: "Aeris", dataAcao: "2021-07-29", qtdAcao: "35", precoAcao: "5.30", precoHoje: "5.80"}, {nomeAcao: "BRD", dataAcao: "2021-07-29", qtdAcao: "80", precoAcao: "5.30", precoHoje: "5.95"}, {nomeAcao: "Renner", dataAcao: "2021-07-29", qtdAcao: "24", precoAcao: "16.58", precoHoje: "17.92"},{nomeAcao: "B3", dataAcao: "2021-07-29", qtdAcao: "100", precoAcao: "8.21", precoHoje: "9.01"} ]

    return (


        <div>

            <table>

                <thead>

                    <tr className="header">

                        <th>Nome da Acao</th>
                        <th>Data da Compra</th>
                        <th>Numero de Cotas</th>
                        <th>Preco Medio</th>
                        <th>Valor hoje</th>
                        <th>Alta / Queda %</th>
                        <th>Ganho / Perda $</th>
                        <th>Valorizacao % a.a</th>
                        <th>Apagar</th>
                        <th>Vender Acoes</th>

                    </tr>

                </thead>

                <tfoot>
                    <tr>
                        
                        <th>Saldo % da Carteira</th>
                        <td className={_handleSaldoPorcentual()[1]}>{_handleSaldoPorcentual()[0]} %</td>
                        <th>Saldo da Carteira</th>
                        <td  className={_handleSaldoPorcentual()[1]}>R$ {_handleSaldoCarteira()}</td>
                        <th>Investimento Inicial</th>
                        <td className='ajusteFoot'>R$ {_handleInvestimentoInicial(lista)[1]}</td>
                        <th>Total Atual da Carteira</th>
                        <td className='ajusteFoot'>R$ {_handleSaldoAtual(lista)[1]}</td>

                    </tr>

                </tfoot>


                <tbody>
                    

                    {lista.map((item, key) => {
                     
                       let format = ''
                       if(_handleAltaQuedaClass(item.precoAcao, item.precoHoje)>0){format = "positivo"} else{
                           format = "negativo"
                       }

                       return <tr key={key} className={format} id={item.nomeAcao}>
                           

                            <td>{item.nomeAcao}</td>
                            <td>{item.dataAcao}</td>
                            <td>{item.qtdAcao}</td>
                            <td id={key} onMouseOver={_handleTotalAcao} onMouseOut={_handleMouseOut}>{item.precoAcao}</td>
                            <td>{_handlePrecoHoje(item.precoHoje)}</td>
                            <td>{_handleAltaQueda(item.precoAcao, item.precoHoje)}</td>
                            <td>{_handleSaldoAcao(item.precoAcao, item.precoHoje, item.qtdAcao)}</td>
                            <td>{_handleValorizacaoAno(item.dataAcao, item.precoAcao, item.precoHoje)}%</td>
                            <td><DeleteForeverIcon style={{ fontSize: 35 }} onClick={_handleApagaAcao}className='botaoDelete'>Apagar</DeleteForeverIcon></td>
                            <td><SwapVertIcon onClick={_handleVender}className='botaoVender' style={{ fontSize: 38 }}>Vender</SwapVertIcon></td>
                                                          
                            </tr>


                    })}





                </tbody>

            </table>

        </div>

    )

}

export default ListaAcoes

