
import React from 'react';
import './App.css';
import {Container, Typography} from "@material-ui/core"
import Dados from './components/dados/Dados';






function App() {
  
        
    return (

      

      <Container>

          <Typography variant="h5" align='center'>
          <h1>Controle de Investimento</h1>
          </Typography>


          <Dados/>
                            
      
      </Container>
     

    );

}

export default App;

