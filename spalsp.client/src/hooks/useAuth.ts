import { useQuery } from 'react-query'
import { useNavigate } from '@tanstack/react-router'

import {
  Body_login_login_access_token as AccessToken,
  LoginService,
  UserOut,
  UsersService,
} from '../client'
import { log } from 'console'

const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const { data: user, isLoading } = useQuery<UserOut | null, Error>(
    'currentUser',
    UsersService.readUserMe,
    {
      enabled: isLoggedIn(),
    },
  )

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    console.log('____', response);
    localStorage.setItem('access_token', response.data.access_token)

    const userdata = await UsersService.readUserMe()
    console.log('__UD__',userdata);
    localStorage.setItem('current_user.name', userdata.data.first_name??userdata.data.email??'')
    navigate({ to: '/' })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate({ to: '/login' })
  }

  return { login, logout, user, isLoading }
}

export { isLoggedIn }
export default useAuth
