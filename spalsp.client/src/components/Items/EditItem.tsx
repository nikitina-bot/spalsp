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
import { ApiError, ItemOut, ItemUpdate, ItemsService } from '../../client'
import useCustomToast from '../../hooks/useCustomToast'
import App from '../Lsp/AddLsp/App'

interface EditItemProps {
  item: ItemOut
  isOpen: boolean
  onClose: () => void
}

const EditItem: React.FC<EditItemProps> = ({ item, isOpen, onClose }) => {
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
        size={{ base: 'md', md: 'lg' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Добавить ЛСШ</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <App />
            <FormControl marginTop={"30px"} isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">ЛСШ</FormLabel>
              <Input
                id="title"
                {...register('title', {
                  required: 'ЛСШ обязателен',
                })}
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
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Сохранить
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Сохранить как
            </Button>
            <Button onClick={onCancel}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditItem
