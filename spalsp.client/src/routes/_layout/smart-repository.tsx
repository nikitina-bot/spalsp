import {
  Box,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'react-query'

import { ApiError, ItemsService } from '../../client'
import ActionsMenu from '../../components/Common/ActionsMenu'
import Navbar from '../../components/Common/Navbar'
import useCustomToast from '../../hooks/useCustomToast'
import SmartRepoStructEditor from '../../components/Common/SmartRepository/SmartRepoStructEditor'
import SmartRepoContentEditor from '../../components/Common/SmartRepository/SmartRepoContentEditor'
import TreeViewSelector from '../../components/Common/TreeView/TreeViewSelector'
import { ChangeEvent, useEffect, useState } from 'react'
import TreeView from '../../components/Common/TreeView/TreeView'
import TreeViewCrud from '../../components/Common/TreeView/TreeViewAndCRUD'
import { Tree } from '../../components/Common/TreeView/components/tree'
import axios from 'axios'

export const Route = createFileRoute('/_layout/smart-repository')({
  component: SmartRepositoryView,
})

function SmartRepositoryView() {
  const showToast = useCustomToast()
  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery('items', () => ItemsService.readItems({}))

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast('Something went wrong.', `${errDetail}`, 'error')
  }

  const onSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setMode(!mode);
  };

  const [mode,setMode]=useState(false);

  const [treeData, setTreeData] = useState(undefined);

  const [urlEnd, setUrlEnd] = useState('dictionariesdocumentsontologieslsp');

    function getData(param: string) {
        const responce = axios.get('http://localhost:8000/api/v1/paths/full/', {
          params: {
            objects: param
          }
        }).then((resp: any) => { setTreeData(resp.data.content) });
        return responce;
    }

    useEffect(() => {
        getData(urlEnd);
      }, []);

    console.log('--> '+treeData);

    function onClick(params: string, index: number) {
      console.log('ddd');
      const prev = urlEnd;
      var next = prev;
      if (urlEnd.indexOf(params)>-1)
      {
        next = prev.replace(params,'');
      }
      else{
        next = prev+params;
      }
      console.log('ddd');
      console.log(next);
      setUrlEnd(next);
      getData(next);
    }

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        <Container maxW="full">
          <Heading
            size="lg"
            textAlign={{ base: 'center', md: 'left' }}
            pt={12}
            color={'#009688'}
          >
            {!mode ? "Просмотр содержимого смарт-репозитория" : "Редактирование смарт-репозитория"}
          </Heading>
          <FormControl display='flex' alignItems='center' marginTop={'10px'}>
            <FormLabel htmlFor='smartrepo-editing' mb='0'>
              Режим редактирования
            </FormLabel>
            <Switch id='smartrepo-editing' onChange={onSwitch} isChecked={mode}/>
          </FormControl>
          { !mode && (
            <>
              <Box p={5}>
                <Grid templateColumns='repeat(7, 1fr)' gap={4}>
                  <GridItem >
                    Показывать:
                    <Box>
                      <Checkbox isChecked={urlEnd.indexOf('documents')>-1} onChange={()=>{onClick('documents',0)}}>
                        Документы
                      </Checkbox>
                    </Box>
                    <Box><Checkbox isChecked={urlEnd.indexOf('lsp')>-1} onChange={()=>{onClick('lsp',1)}}>ЛСШ</Checkbox></Box>
                    <Box><Checkbox isChecked={urlEnd.indexOf('dictionaries')>-1} onChange={()=>{onClick('dictionaries',2)}}>Словари</Checkbox></Box>
                    <Box><Checkbox isChecked={urlEnd.indexOf('ontologies')>-1} onChange={()=>{onClick('ontologies',3)}}>Онтологии</Checkbox></Box>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Box p={5}>
                      <Tree hasCheckboxes={false} value={treeData} isReadOnly={false} isDisabled={false} />
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </> 
          )
          }
          { mode && (
            <Box p="4">
              <Tabs isFitted variant='enclosed' padding={'0px'}>
                <TabList mb='0em'>
                  <Tab>Структура</Tab>
                  <Tab>Документы</Tab>
                  <Tab>ЛСШ</Tab>
                  <Tab>Онтологии</Tab>
                  <Tab>Словари</Tab>
                </TabList>
                <TabPanels padding={'0px'} marginTop={'5px'}>
                <TabPanel padding={'0px'}>
                    <SmartRepoStructEditor/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <TreeViewCrud type="docs"/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <TreeViewCrud type="lsp"/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <TreeViewCrud type="onto"/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <TreeViewCrud type="dict"/>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>  
          )
          }
              
        </Container>
      )}
    </>
  )
}

export default SmartRepositoryView
