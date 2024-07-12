import axios from 'axios'
import config from '@/config'
import crmLoader from '@/utilities/crmLoader'

class api {
  async call(method: string, url: string, params: null | Object = null, data: null | Object = null, indicator = true) {
    return new Promise((resolve, reject) => {
      try {
        // show loader in indicator is true
        if (indicator) { crmLoader.startcrmLoader() }
        // setup axios
        const req = axios({
          method: method,
          url: config.apiBase + url,
          data: data,
          params: params,
          timeout: config.apiBaseTimeout,
          paramsSerializer: function (params) { return Object.keys(params).map(key => key + '=' + params[key]).join('&') },
          responseType: 'json',
          responseEncoding: 'utf8',
          withCredentials: false
        })
          .then(function (res) { resolve(res) })
          .catch(function (err) {
            reject(err)
          })
          .then(function () { if (indicator) { crmLoader.stopcrmLoader() } }) // hide loader if already shown
      } catch (error) {
        if (indicator) { crmLoader.stopcrmLoader() } // hide loader if already shown
        reject(error)
      }
    })
  }
}
export default api