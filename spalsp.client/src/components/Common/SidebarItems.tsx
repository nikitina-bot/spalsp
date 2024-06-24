import React from 'react'
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FiBriefcase, FiCheckSquare, FiEdit3, FiHome, FiPrinter, FiSettings, FiTerminal, FiUsers } from 'react-icons/fi'
import { Link } from '@tanstack/react-router'
import { useQueryClient } from 'react-query'

import { UserOut } from '../../client'

const items = [
  { icon: FiHome, title: 'Смарт-репозиторий', path: '/smart-repository' },
  { icon: FiEdit3, title: 'Управление ЛСШ', path: '/lsp-management' },
  { icon: FiTerminal, title: 'Извлечение знаний', path: '/extraction' },
  { icon: FiCheckSquare, title: 'Валидация результатов', path: '/validation' },
  //{ icon: FiPrinter, title: 'Генерация текста [test]', path: '/generation' },
  { icon: FiSettings, title: 'Личный кабинет', path: '/settings' },
]

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ onClose }) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue('ui.main', 'ui.white')
  const bgActive = useColorModeValue('#E2E8F0', '#4A5568')
  const currentUser = queryClient.getQueryData<UserOut>('currentUser')

  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: 'Админка', path: '/admin' }]
    : items

  const listItems = finalItems.map((item) => (
    <Flex
      as={Link}
      to={item.path}
      w="260px"
      p={2}
      key={item.title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: '12px',
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={item.icon} alignSelf="center" />
      <Text ml={2}>{item.title}</Text>
    </Flex>
  ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
