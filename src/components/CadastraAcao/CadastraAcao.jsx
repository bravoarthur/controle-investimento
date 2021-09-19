import React, { useState } from 'react';
import {TextField, InputAdornment, OutlinedInput, FormControl,InputLabel, Button, Box} from '@material-ui/core'
import BuscaIndice from '../BuscaIndices/BuscaIndice';
import "./estilo.css"


function CadastraAcao({novaAcao, acoes, atualiza}) {

    const [nomeAcao, setNome] = useState("")
    const [dataAcao, setData] = useState("")
    const [qtdAcao, setQtd] = useState("")
    const [precoAcao, setPreco] = useState("")

    const _handleBotao = (event)=>{
        event.stopPropagation()
        BuscaIndice(acoes, atualiza)
    }


    return(

        <>

            <form onSubmit={(event)=> {
                event.preventDefault()
                novaAcao({nomeAcao, dataAcao, qtdAcao, precoAcao})
                }}>

                  <TextField id="nome-acao" label="Nome da Acao" variant="outlined" margin="normal" onChange={event => setNome(event.target.value)}/>

                  <TextField id="data-acao" variant="outlined"  margin="normal" type="date" onChange={event => setData(event.target.value)}/>

                  <TextField id="numero-acao" variant="outlined"  margin="normal" type="number" label="Numero de Acoes" onChange={event => setQtd(event.target.value)}/>

                
                  <FormControl variant="outlined" margin="normal">
                  <InputLabel htmlFor="valor-acao">Valor da Acao</InputLabel>

                    <OutlinedInput
                        id="valor-acao"
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        labelWidth={105}
                        onChange={event => setPreco(event.target.value)}
                    />
                    
                </FormControl>
                
                <Box position='inherit' minWidth="64px" boxSizing='border-box' margin='0' display='inline-flex' marginLeft={4} marginTop={3.2}>

                    <Button type="submit" color="primary" variant="contained">Adicionar</Button>

                </Box>
                
            </form>


            <Box position='inherit' minWidth="64px" boxSizing='border-box' margin='0' display='inline-flex' marginLeft={4} marginTop={2} marginBottom={3.5}>

                    <Button type="submit" color="primary" variant="contained" onClick={_handleBotao}>Atualizar</Button>

            </Box>

        </>



    )
}

export default CadastraAcao