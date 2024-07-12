import api from './api'

export async function getManifests(callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/manifests`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getManifest(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/manifests/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function postManifest(data: Object, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/manifests`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function putManifest(id: string, data: Object, callback: Function, errorback: Function) {
  const method = 'patch'
  const url = `/manifests/${id}`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function deleteManifest(id: string, callback: Function, errorback: Function) {
  const method = 'delete'
  const url = `/manifests/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}
