import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useBoolean,
} from '@chakra-ui/react'
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { SubmitHandler, useForm } from 'react-hook-form'

import Logo from '../assets/images/spalsp-logo.png'
import { ApiError } from '../client'
import { Body_login_login_access_token as AccessToken } from '../client/models/Body_login_login_access_token'
import useAuth, { isLoggedIn } from '../hooks/useAuth'
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function Login() {
  const [show, setShow] = useBoolean()
  const { login } = useAuth()
  const [error, setError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    try {
      await login(data)
    } catch (err) {
      const errDetail = (err as ApiError).body.detail
      setError(errDetail)
    }
  }

  const [firstName, setFirsrtName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmitRegister: SubmitHandler<AccessToken> = async (data) => {
    try {
      const newdata = {
        "email": data.email,
        "password": data.password,
        "role_id": 2,
        "first_name": firstName??"Аноним",
        "last_name": lastName??"Пользователь",
      }
      console.log(newdata)
      await axios.post('http://127.0.0.1:8000/api/v1/register', newdata)
      await login(data)
    } catch (err) {
      const errDetail = (err as ApiError).body.detail
      setError(errDetail)
    }
  }

  return (
    <>
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleSubmit(onSubmitRegister)}
        h="100vh"
        maxW="sm"
        alignItems="stretch"
        justifyContent="center"
        gap={4}
        centerContent
      >
        <Link href='/'>
          <IconButton
            background={'none'}
            _hover={'none'}
            aria-label='Call Segun'
            size='lg'
            icon={
              <Image
                _activeLink={'/'}
                src={Logo}
                alt="SpaLSP logo"
                height="auto"
                maxW="2xs"
                alignSelf="center"
                mb={4}
              />
            }
          />
        </Link>
        
        <FormControl id="email" isInvalid={!!errors.email || !!error}>
          <Input
            id="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={!!error}>
          <InputGroup>
            <Input
              {...register('password')}
              type={show ? 'text' : 'password'}
              placeholder="Пароль"
            />
            <InputRightElement
              color="gray.400"
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Icon
                onClick={setShow.toggle}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Icon>
            </InputRightElement>
          </InputGroup>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Center>
          <Link as={RouterLink} to="/recover-password" color="blue.500" hidden>
            Forgot password?
          </Link>
        </Center>
        <Button
          bg="ui.main"
          color="white"
          _hover={{ opacity: 0.8 }}
          type="submit"
          isLoading={isSubmitting}
        >
          Войти
        </Button>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '20px'}}>
          <h1><b> Нет аккаунта?</b></h1>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2px'}}>
          <h1> Дополнительно введите имя и фамилию</h1>
        </div>
        <FormControl id="first" isInvalid={!!errors.email || !!error}>
          <Input
            id="first"
            placeholder="Имя"
            type="first"
            value={firstName}
            onChange={evt => setFirsrtName(evt.target.value)}
          />
        </FormControl>
        <FormControl id="last" isInvalid={!!errors.email || !!error}>
          <Input
            id="last"
            placeholder="Фамилия"
            type="last"
            value={lastName}
            onChange={evt => setLastName(evt.target.value)}
          />
        </FormControl>
        <Button
          color="gray"
          _hover={{ opacity: 0.8 }}
          type="reset"
        >
           Зарегистрироваться
        </Button>
      </Container>
    </>
  )
}

export default Login
