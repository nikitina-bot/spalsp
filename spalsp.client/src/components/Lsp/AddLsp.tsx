import React from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

import App from './AddLsp/App';
import './AddLsp/index.css'
import Items from './TableRight';
import Navbar from '../Common/Navbar';

interface AddLspProps {
}

const AddLsp: React.FC<AddLspProps> = ({ }) => {
  const color = useColorModeValue('inherit', 'ui.white')
  
  const onSubmit = async (data:any) => {
    console.log('save clicked', data)
  }
  const state1 = true
  const state2 = false

  return (
    <>
      <h1>
        <b>Последний редактируемый ЛСШ:</b> {"<NP> такие как <NP>"}
      </h1>
      {
        state1 && (
          <>
          <Box>
            <Navbar type={'oldEditLsp'}/>
            <h1>
              или
            </h1>
            <Navbar type={'Lsp'} />
          </Box>
          </>
        )
      }
      {
        state2 && (
          
            <GridItem w='100%'><App /></GridItem>
            
        )
      }
      
      <h1><b>
        Ваши ЛСШ</b>
      </h1>
      <Grid templateColumns='repeat(2, 1fr)'>
        <GridItem w='100%' border={"1px"}><Items/></GridItem>
      </Grid>
    </>
  )
}

export default AddLsp
