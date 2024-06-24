import {
    Button,
    Container,
    Flex,
    Heading,
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
  
  import { ApiError, ItemsService } from '../../client'
  import ActionsMenu from '../../components/Common/ActionsMenu'
  import Navbar from '../../components/Common/Navbar'
  import useCustomToast from '../../hooks/useCustomToast'
  
function Items() {
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
  
    return (
      <>
        {isLoading ? (
          // TODO: Add skeleton
          <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (
          items && (
            <Container maxW="100%">
              <TableContainer>
                <Table size={{ base: 'sm', md: 'md' }}>
                  <Tbody>
                    {items.data.map((item:any) => (
                      <Tr key={item.id} width={"400px"}>
                        <Td width={"400px"}>
                            <Container maxW="500px">
                                <TableContainer  width={"400px"}>
                                    {item.name}
                                </TableContainer>
                            </Container>
                        </Td>
                        {false && (<Td color={!item.description ? 'gray.400' : 'inherit'}>
                          {item.description || 'N/A'}
                        </Td>)}
                        <Td width={"100%"}>
                            <Navbar type={'EditLsp'}/>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Container>
          )
        )}
      </>
    )
  }
  
  export default Items