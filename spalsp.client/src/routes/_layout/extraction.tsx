import {
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import RunLspPage from '../../components/Lsp/RunLspPage/RunLspPage'

export const Route = createFileRoute('/_layout/extraction')({
  component: RunLsp,
})

function RunLsp() {
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

  const currentUser = queryClient.getQueryData<UserOut>('currentUser')

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
              Извлечение знаний из коллекции документов с помощью ЛСШ
            </Heading>
            <RunLspPage/>
            
          </Container>
        )
      )}
    </>
  )
}

export default RunLsp
