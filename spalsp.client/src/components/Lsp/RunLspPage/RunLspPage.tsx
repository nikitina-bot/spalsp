import React, { useEffect, useState } from 'react'
import {
    Box,
    ChakraProvider,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from '@chakra-ui/react'
import Navbar from '../../Common/Navbar';
import Onto from '../MagnolisPage/Onto';
import DocsPage from '../MagnolisPage/Docs';
import PatternPage from '../MagnolisPage/Patterns';
import ExtractionPage from '../Extraction/Extraction';
import axios from 'axios';
import ResultsPath from './GetPathForResults';

interface RunLspProps {
}

const RunLspPage: React.FC<RunLspProps> = ({ }) => {
    const [selectedOntology, setSelectedOntology] = useState("");

    const handleOntologyChange = (event: any) => {
        setSelectedOntology(event.target.value);
    };
    
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    return (
      <>
        <Box p="4">
            <Tabs isFitted variant='enclosed' padding={'0px'}>
              <TabList mb='0em'>
                <Tab>Выбор документов</Tab>
                <Tab>Выбор ЛСШ</Tab>
                <Tab>Расположение результатов</Tab>
                <Tab>Извлечение знаний</Tab>
              </TabList>
              <TabPanels padding={'0px'} marginTop={'5px'}>
                <TabPanel padding={'0px'}>
                  <DocsPage selectDocs={setSelectedDocuments} whatfor="run"/>
                </TabPanel>
                <TabPanel padding={'0px'}>
                  <PatternPage/>
                </TabPanel>
                <TabPanel padding={'0px'}>
                  <ResultsPath/>
                </TabPanel>
                <TabPanel padding={'0px'}>
                  <ExtractionPage/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box> 
          <Box 
            marginTop={'20px'}
            borderTop={'0px solid black'}
            position={'sticky'}
            top={'calc(100vh - 55px)'}
            >
            <Heading
              marginTop={'10px'}
              size="sm"
              textAlign={{ base: 'center', md: 'left' }}
              pt={1}
              color={'#009688'}
            >
              Строка состояния
            </Heading>
            <Textarea
                marginTop={"px"}
                minHeight={'100px'}
                value={
                  'Документы:'
                    +'\n'+
                    'ЛСШ:'
                    +'\n'+
                    'Расположение результатов:'
                }
                readOnly
            />
          </Box>
      </>
  )
}

export default RunLspPage
