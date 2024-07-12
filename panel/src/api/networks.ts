import api from './api'

export async function getNetworks(callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/networks`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getNetwork(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/networks/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function postNetwork(data: Object, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/networks`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function deleteNetwork(id: string, callback: Function, errorback: Function) {
  const method = 'delete'
  const url = `/networks/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}
