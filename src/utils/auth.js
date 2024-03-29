import Cookies from 'js-cookie'

const TokenKey = 'SIMP'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setStatus(status) {
  return Cookies.set(TokenKey, status)
}
export function depClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
