import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import { Typography, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import './estilo.css'

function ExibeLista({listaVenda}) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 910,
          BackgroundColor: theme.palette.background.paper,
                    
        },
        nested: {
          paddingLeft: theme.spacing(4),
          
        }, 
                       
      }))

  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
    
    setTimeout(function() {
        const FocoLista = document.querySelector('#focusListaVenda')
        if(FocoLista){
        FocoLista.scrollIntoView({behavior:"smooth"})}
    
    }, 200)
    
  }

  const _handleSaldo = (saldo) => {

    saldo = saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return saldo

  }

  let lucroTotal = 0
  


    return(

        <List
            component="nav"
            className={classes.root}
            >

            <Typography align="left">    
                        
                <ListItem button onClick={handleClick}>

                    <ListItemText>
                      <Box fontWeight={600} m={1} fontSize={21} fontFamily="Segoe UI">

                        Lista de Acoes Vendidas

                     </Box>
                    </ListItemText>

                {!open ? <ExpandLess /> : <ExpandMore />}

                </ListItem>
           
            </Typography>

            <Collapse in={!open} timeout="auto" unmountOnExit>

                <List id='focusListaVenda' component="div" disablePadding>

                    <Typography align="left">

                        {listaVenda.map((item, key) => {
                        lucroTotal += item.rendimentoValor
                        return(

                        <ListItem button className={classes.nested} key={key}>
                            
                            <ListItemIcon>
                                <DoneIcon />
                            </ListItemIcon>
                            
                            <ListItemText >
                                <Box fontWeight={450} m={1} fontSize={18} fontFamily="Segoe UI">
                                    {item.dataVenda} - Venda de {item.qtdVenda} acoes {item.nomeAcao} por R${item.precoVenda} |  {item.rendimentoAA}%  | Saldo: R$ {item.rendimentoValor.toFixed(2)}
                                </Box>
                            </ListItemText>
                                                           
                        </ListItem>

                        )})}

                        <ListItem button className={classes.nested}>  
                            
                            <ListItemIcon>
                                <NavigateNextIcon />
                            </ListItemIcon>
                            
                                <ListItemText >
                                    <Box fontWeight={600} m={1} fontSize={18} fontFamily="Segoe UI" textAlign='center'>
                                        Lucro total Realizado: R$ {_handleSaldo(lucroTotal)}
                                    </Box>
                                </ListItemText>

                            <ListItemIcon>
                                <NavigateBeforeIcon />
                            </ListItemIcon>

                        </ListItem>


                    </Typography>

                </List>

            </Collapse>


        </List>
        

    )
}

export default ExibeLista