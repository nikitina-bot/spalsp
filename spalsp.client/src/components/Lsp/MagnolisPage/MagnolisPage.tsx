import React, { useState } from 'react'
import {
    Box,
    ChakraProvider,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import Navbar from '../../Common/Navbar';
import Onto from './Onto';
import DocsPage from './Docs';
import QAPage from './QA';

interface MagnolisPageProps {
}

const MagnolisPage: React.FC<MagnolisPageProps> = ({ }) => {
    const [selectedOntology, setSelectedOntology] = useState("");

    const handleOntologyChange = (event: any) => {
        setSelectedOntology(event.target.value);
    };
    
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    const [answer, setAnswer] = useState("");

    const [pipeline, setPipeline] = useState("pipeline1");

    const handlePipelineChange = (newValue) => {
      setPipeline(newValue);
    };

    return (
    <>
        <ChakraProvider>
          <Box p="4">
            <Tabs isFitted variant='enclosed' padding={'0px'}>
              <TabList mb='0em'>
                <Tab>Выбор онтологии</Tab>
                <Tab>Выбор документов</Tab>
                <Tab>ЕЯ-запросы</Tab>
              </TabList>
              <TabPanels padding={'0px'} marginTop={'5px'}>
                <TabPanel padding={'0px'}>
                  <Onto selectOnto={handleOntologyChange}/>
                </TabPanel>
                <TabPanel padding={'0px'}>
                  <DocsPage selectDocs={setSelectedDocuments}/>
                </TabPanel>
                <TabPanel padding={'0px'}>
                  <QAPage/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>  
        <Box p="4">
            <RadioGroup defaultValue="pipeline1" onChange={handlePipelineChange} value={pipeline}>
            <HStack direction="row" spacing="150px">
                <Radio value="pipeline1">Выбор онтологии</Radio>
                <Radio value="pipeline1">Указание атрибутов онтологии</Radio>
                <Radio value="pipeline2" isDisabled={false}>Выбор документов</Radio>
                <Radio value="pipeline2" isDisabled={false}>Просмотр парсинга</Radio>
                <Radio value="pipeline3" isDisabled={false}>Запросы к документам</Radio>
            </HStack>
            </RadioGroup>

            {/* Контент, зависящий от выбора паплайна */}
            {pipeline === "pipeline1" && <Onto selectOnto={handleOntologyChange}/>}
            {pipeline === "pipeline2" && <DocsPage selectDocs={setSelectedDocuments}/>}
            {pipeline === "pipeline3" && <QAPage/>}
        </Box>
        </ChakraProvider>
       
    </>
  )
}

export default MagnolisPage
