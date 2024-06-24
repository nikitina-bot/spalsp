import React from 'react'
import {
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
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQueryClient } from 'react-query'
import useCustomToast from '../../hooks/useCustomToast'
import App from '../Lsp/AddLsp/App'

interface ValidateProps {
  isOpen: boolean
  onClose: () => void
}

const Validate: React.FC<ValidateProps> = ({ item, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ItemUpdate>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: item,
  })

  const updateItem = async (data: ItemUpdate) => {
    await ItemsService.updateItem({ id: item.id, requestBody: data })
  }

  const mutation = useMutation(updateItem, {
    onSuccess: () => {
      showToast('Success!', 'Item updated successfully.', 'success')
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

  const onSubmit: SubmitHandler<ItemUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>Задать вопрос к документам</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Вопрос</FormLabel>
              <Input
                id="title"
                {...register('title', {
                  required: 'Title is required.',
                })}
                placeholder="Вопрос"
                type="text"
              />
            </FormControl>
            <Button variant="primary" type="submit" isLoading={isSubmitting} marginTop={"10px"} marginRight={"5px"}>
              Получить ответ
            </Button>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Ответ</FormLabel>
              <Input
                id="description"
                {...register('description')}
                placeholder="Ответ"
                type="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button onClick={onClose}>Назад</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Validate
