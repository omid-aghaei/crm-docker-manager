import api from './api'

export async function getImages(callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/images`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getImage(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/images/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function postImage(data: Object, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/images`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function deleteImage(id: string, callback: Function, errorback: Function) {
  const method = 'delete'
  const url = `/images/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}
