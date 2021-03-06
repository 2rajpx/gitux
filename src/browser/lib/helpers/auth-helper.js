export const isLoggedIn = () => !!localStorage.accessToken

export const saveAccessToken = accessToken => localStorage.accessToken = accessToken

export const getAccessToken = () => localStorage.accessToken

export const removeAccessToken = () => localStorage.removeItem('accessToken')
