import React from 'react';
import { useState } from 'react';
import { Box, Button} from "@material-ui/core"
import "./estilo.css"
import CreatableSelect from 'react-select/creatable';

function Usuario({setUsuario}) {
    
    const [user, setUser] = useState('')
    const [lista, setLista] = useState(JSON.parse(localStorage.getItem(`listaUsuarios`)) || [])

   
    const _handleInput = (event) => {

        let novoUsuario = event
        
        setUser(novoUsuario)

        let listaUsuarios = [...lista, {value: novoUsuario, label: novoUsuario}]

        setLista(listaUsuarios)

        localStorage.setItem(`listaUsuarios`, JSON.stringify(listaUsuarios))

       }




    return(

        <> 


            <h4 className="subTexto">Digite o Nome do Usuario da Carteira:</h4>

            
            <form align="center" onSubmit={(event) => {
                event.preventDefault()
                
                setUsuario(user)
                }}>

                <CreatableSelect  options={lista} onCreateOption={event => _handleInput(event)} onChange={event => setUser(event.value)} placeholder="Digite um novo Usuario" className="seletorUsuario">

                </CreatableSelect>


                <Box position='inherit' minWidth="64px" boxSizing='border-box' margin='0' display='inline-flex' marginLeft={4} marginTop={1.1}>

                        <Button type="submit" color="primary" variant="contained">Ver Carteira</Button>

                </Box>

                
            </form>

        </>


    )
    

}

export default Usuario

/*
<TextField id="user" variant="outlined"  margin="none" type="text" label="Usuario" onChange={event => setUser(event.target.value)}/>
*/