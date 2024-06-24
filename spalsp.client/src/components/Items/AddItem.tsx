import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { ApiError, ItemCreate, ItemsService } from '../../client'
import useCustomToast from '../../hooks/useCustomToast'

interface AddItemProps {
  isOpen: boolean
  onClose: () => void
}

const AddItem: React.FC<AddItemProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemCreate>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const addItem = async (data: ItemCreate) => {
    await ItemsService.createItem({ requestBody: data })
  }

  const mutation = useMutation(addItem, {
    onSuccess: () => {
      showToast('Success!', 'Item created successfully.', 'success')
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body.detail
      showToast('Something went wrong.', `${errDetail}`, 'error')
    },
    onSettled: () => {
      queryClient.invalidateQueries('items')
    },
  })

  const onSubmit: SubmitHandler<ItemCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'sm', md: 'md' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Добавить ЛСШ</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">ЛСШ</FormLabel>
              <Input
                id="title"
                {...register('title', {
                  required: 'Title is required.',
                })}
                placeholder="ЛСШ"
                type="text"
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Описание</FormLabel>
              <Input
                id="description"
                {...register('description')}
                placeholder="Описание"
                type="text"
              />
              <FormLabel marginTop={'10px'} htmlFor="description">Задайте отношения</FormLabel>
            </FormControl>
            
            <Box display="flex" alignItems="center" gap={4} marginTop={'5px'}>
              <Select placeholder="Select option 1">
                <option value="option1">hypo</option>
                <option value="option2">hyper</option>\
              </Select>
              <Input placeholder="Enter text" />
              <Select placeholder="Select option 2">
                <option value="optionA">hypo</option>
                <option value="optionB">hyper</option>
              </Select>
            </Box>
            <Button marginTop={'5px'} onClick={onClose}>+</Button>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Добавить
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddItem
