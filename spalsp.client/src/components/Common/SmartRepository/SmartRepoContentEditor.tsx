import React, { useState } from 'react'
import {
    Container,
  Heading,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import {Box} from '@primer/react';
import App from '../TreeView/App';
import TreeViewEditor from '../TreeView/TreeViewEditor';

interface SmartRepoContentEditorProps {
    selectDocs: (val:string[]) => void;
    whatfor? : string;
}

const SmartRepoContentEditor: React.FC<SmartRepoContentEditorProps> = ({selectDocs, whatfor }) => {
    const [selectedDocs, setSelectedDocs] = useState("");

    const handleDocsChange = (event: any) => {
      setSelectedDocs(event);
      selectDocs(event);
    };

    return (
    <>
        <Container maxW="full" padding={'2px'}>
            <Box padding={'0px'}>
              <Tabs isFitted variant='enclosed' px={0}>
                <TabList mb='0em'  px={0}>
                  <Tab>Документы</Tab>
                  <Tab>Словари</Tab>
                  <Tab>Онтологии</Tab>
                  <Tab>ЛСШ</Tab>
                </TabList>
                <TabPanels  px={0}>
                  <TabPanel  px={0}>
                    <p>Импортируйте, экспортируйте и удаляйте документы</p>
                    <TreeViewEditor step="docs" hadleSelected={function (setted: string[]): void {
                                    throw new Error('Function not implemented.');
                                } }/>
                  </TabPanel>
                  <TabPanel  px={0}>
                  <p>Импортируйте, экспортируйте и удаляйте словари</p>
                    <TreeViewEditor step="dicts" hadleSelected={function (setted: string[]): void {
                                    throw new Error('Function not implemented.');
                                } }/>
                  </TabPanel>
                  <TabPanel px={0}>
                  <p>Импортируйте, экспортируйте и удаляйте онтологии</p>
                    <TreeViewEditor step="onto" hadleSelected={function (setted: string[]): void {
                                    throw new Error('Function not implemented.');
                                } }/>
                  </TabPanel>
                  <TabPanel px={0}>
                  <p>Импортируйте, экспортируйте и удаляйте ЛСШ</p>
                    <TreeViewEditor step="pattern" hadleSelected={function (setted: string[]): void {
                                    throw new Error('Function not implemented.');
                                } }/>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>        
    </>
  )
}

export default SmartRepoContentEditor;
