import api from './api'

export async function getInfo(callback: Function, errorback: Function) {
  const method = 'get'
  const url = '/info'
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getVersion(callback: Function, errorback: Function) {
  const method = 'get'
  const url = '/version'
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}

export async function getUsage(callback: Function, errorback: Function) {
  const method = 'get'
  const url = '/usage'
  const data = null
  const params = null
  const indicator = true
  const caller = new api()
  await caller.call(method, url, params, data, indicator).then(function (result) { callback(result) }).catch(function (error) { errorback(error) })
}