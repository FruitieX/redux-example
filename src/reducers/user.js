import { getToken, storeToken, clearToken } from '../helpers'

const initialState = {
  token: getToken(),
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      storeToken(action.user.token); return action.user
    case 'LOGIN_FAILURE':
      clearToken(); return {}
    default:
      return state
  }
}

export default auth
