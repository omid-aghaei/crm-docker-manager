import api from './api'
import config from '@/config'

export async function getContainers(callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/containers`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getContainer(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/containers/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function postContainer(data: Object, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function startContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/start`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function stopContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/stop`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function restartContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/restart`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function pauseContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/pause`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function resumeContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/resume`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function killContainer(id: string, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/kill`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function upgradeContainer(id: string, data: Object, callback: Function, errorback: Function) {
  const method = 'post'
  const url = `/containers/${id}/upgrade`
  // const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getContainerLogs(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/containers/${id}/logs`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getContainerStats(id: string, callback: Function, errorback: Function) {
  const method = 'get'
  const url = `/containers/${id}/stats`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function deleteContainer(id: string, callback: Function, errorback: Function) {
  const method = 'delete'
  const url = `/containers/${id}`
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}