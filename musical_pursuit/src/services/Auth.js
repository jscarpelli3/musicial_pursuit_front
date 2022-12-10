import Client from './api'

export const LoginUser = async (hnd, pass) => {
    console.log(hnd)
    console.log(pass)
    const data={handle:hnd, password:pass}
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.res
}

export const RegisterUser = async (data) => {
    const res = await Client.post('api/auth/register', data)
    return res.data
}

export const CheckSession = async () => {
    const res = await Client.get('api/auth/session')
    return res.data
}
// export const LoginUser = async (handle, password) => {
//   try {
//     const data={handle:handle, password:password}
//     const res = await Client.post('api/auth/login', data)
//     localStorage.setItem('token', res.data.token)
//     return res.data.bandleader
//   } 
// }

// export const RegisterUser = async (data) => {
//   try {
//     const res = await Client.post('api/auth/register', data)
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }

// export const CheckSession = async () => {
//   try {
//     const res = await Client.get('api/auth/session')
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }
