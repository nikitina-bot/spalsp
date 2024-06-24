import React from 'react'
import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'

import AddUser from '../Admin/AddUser'
import AddItem from '../Items/AddItem'
import EditItem from '../Items/EditItem'
import { ItemOut } from '../../client/models/ItemOut'
import Validate from '../Magnolis/Validate'

interface NavbarProps {
  type: string
}

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  const addUserModal = useDisclosure()
  const addItemModal = useDisclosure()
  const editItemModal = useDisclosure()
  const queryModal = useDisclosure()

  return (
    <>
      <Flex py={2} gap={4}>
        {/* TODO: Complete search functionality */}
        {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaSearch} color='gray.400' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search' fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
                </InputGroup> */}
        {
          type === 'validation' && (
            <Button
              variant="primary"
              gap={1}
              fontSize={{ base: 'sm', md: 'inherit' }}
              onClick={ queryModal.onOpen}
            >
              Задать вопрос к документам
            </Button>
          )
        }
        {
          type === 'oldEditLsp' && (
            <Button
              gap={1}
              fontSize={{ base: 'sm', md: 'inherit' }}
              onClick={ editItemModal.onOpen}
            >
              Продолжить редактирование
            </Button>
          )
        }
        {
          type !== 'oldEditLsp' && type !== 'validation' && (
            <Button
              variant="primary"
              gap={1}
              fontSize={{ base: 'sm', md: 'inherit' }}
              onClick={type === 'User' ? addUserModal.onOpen : type === 'EditLsp' ? editItemModal.onOpen : addItemModal.onOpen}
            >
              {type!=='EditLsp' && type!=='oldEditLsp' && <Icon as={FaPlus} />} {
                type==='EditLsp'
                ?'Редакт.'
                : type==='Lsp'
                  ?'Создать новый'
                  : 'Добавить'
                  } {type === 'User' ? ' пользователя' :' ЛСШ'}
            </Button>
          )
        }
        <Validate isOpen={queryModal.isOpen} onClose={queryModal.onClose} />
        <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
        <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
        <EditItem item={{title: '<NP=hypo>,[<NP=hypo>,][а также/также как [и]/и/или] другие/другим/других/о других <NP=hyper>', id:0, description: 'Выявление гипо-гиперонимии'} as ItemOut} isOpen={editItemModal.isOpen} onClose={editItemModal.onClose} />
      </Flex>
    </>
  )
}

export default Navbar
