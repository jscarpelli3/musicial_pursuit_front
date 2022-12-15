import Client from './api'

export const LoginUser = async (hnd, pass) => {
  const data={handle:hnd, password:pass}
  const res = await Client.post('/auth/login', data)
  localStorage.setItem('token', res.data.token)
  return res.data.user
}

export const RegisterUser = async (data) => {
    console.log(data)
    const res = await Client.post('/auth/register', data)
    return res.data
}

export const CheckSession = async () => {
    const res = await Client.get('api/auth/session')
    return res.data
}
