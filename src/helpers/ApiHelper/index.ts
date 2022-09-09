import { Get, Params, Post } from './types'

const SERVER_URL = 'http://54.219.231.220'

const get: Get = async (path) => {
  const params: Params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(path, params)
  const json = await response.json()

  return { response, json }
}

const post: Post = async (path, body) => {
  const params: Params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const fullPath = SERVER_URL + path

  if (body) {
    params.body = body
  }

  const response = await fetch(fullPath, params)
  const json = await response.json()

  return { response, json }
}

export default {
  get: get,
  post: post,
}
