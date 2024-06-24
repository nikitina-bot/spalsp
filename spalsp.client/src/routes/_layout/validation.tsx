import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'react-query'

import { ApiError, ItemsService, UserOut } from '../../client'
import ActionsMenu from '../../components/Common/ActionsMenu'
import Navbar from '../../components/Common/Navbar'
import useCustomToast from '../../hooks/useCustomToast'
import { useQueryClient } from 'react-query'
import MagnolisPage from '../../components/Lsp/MagnolisPage/MagnolisPage'
import Onto from '../../components/Lsp/MagnolisPage/Onto'
import QAPage from '../../components/Lsp/MagnolisPage/QA'
import DocsPage from '../../components/Lsp/MagnolisPage/Docs'
import { useState } from 'react'
import DataTable from '../../components/Lsp/MagnolisPage/ParsedDocs'

export const Route = createFileRoute('/_layout/validation')({
  component: MagnolisApi,
})

function MagnolisApi() {
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

  const queryClient = useQueryClient()

  const currentUser = queryClient.getQueryData<UserOut>('currentUser');

  const [selectedOntology, setSelectedOntology] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const handleOntologyChange = (event: any) => {
      setSelectedOntology(event.target.value);
  };

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        items && (
          <Container maxW="full" margin={'20px'}>
            <Heading
              size="xl"
              textAlign={{ base: 'center', md: 'left' }}
              pt={12}
              color={'#009688'}
            >
              Валидация результатов извлечения
              с помощью ЕЯ-запросов к документам
            </Heading>
            <Link
              size="md"
              textAlign={{ base: 'center', md: 'left' }}
              pt={3}
              color={'#009688'}
              href={"https://press.psu.ru/index.php/Math/article/download/5700/4075"}
            >
              В ИС MagNolis
            </Link>
            <Box p="4">
              <Tabs isFitted variant='enclosed' padding={'0px'}>
                <TabList mb='0em'>
                  <Tab>Выбор онтологии</Tab>
                  <Tab>Выбор документов</Tab>
                  <Tab>Парсинг документов</Tab>
                  <Tab>Задание ЕЯ-запросов</Tab>
                </TabList>
                <TabPanels padding={'0px'} marginTop={'5px'}>
                  <TabPanel padding={'0px'}>
                    <Onto selectOnto={handleOntologyChange}/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <DocsPage selectDocs={setSelectedDocuments}/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <DataTable selectedFileId={1}/>
                  </TabPanel>
                  <TabPanel padding={'0px'}>
                    <QAPage/>
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
                minHeight={'70px'}
                value={
                  'Онтология:'
                    +'\n'+
                    'Документы:'
                }
                readOnly
            />
          </Box>
          </Container>
        )
      )}
    </>
  )
}

export default MagnolisApi
