import { CustomError } from './error-utils'

export const host = 'http://localhost:5000'
export const performFetch = async (path, method, body) => {
  const headers = {}
  if (localStorage.getItem('accessToken')) {
    headers.access_token = localStorage.getItem('accessToken')
  }
  if (body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }
  const response = await fetch(host + path, {
    method,
    body,
    headers
  })
  if (response.status >= 400) {
    const error = await response.json()
    throw new CustomError(error)
  }
  return response.json()
}

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
}
