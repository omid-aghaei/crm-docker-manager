export default function utilities(app: any) {
  app.config.globalProperties.convert = {
    mbToProper(value: number, decimals = 2) { // 2000 -> 1.95
      if (value === 0) return '0'
      if (!+value) return 'Invalid'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['B', 'KB','MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(value) / Math.log(k))
      return parseFloat((value / Math.pow(k, i)).toFixed(dm))
    },
    mbToUnit(value: number, decimals = 2) { // 2000 -> GB
      if (value === 0) return ''
      if (!+value) return 'Invalid'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['B', 'KB','MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(value) / Math.log(k))
      return `${sizes[i]}`
    },
    mbToProperUnit(value: number, decimals = 2) { // 2000 -> 1.95 GB
      if (value === 0) return '0 -'
      if (!+value) return 'Invalid'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(value) / Math.log(k))
      return `${parseFloat((value / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },
    mbToGb(value: number, decimals = 2) { // 2000 -> 1.95 GB
      if (value === 0) return '0'
      if (!+value) return 'Invalid'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      return `${parseFloat((value / Math.pow(1024, 1)).toFixed(dm))}`
    },
    secondsToProper(value: number) {
      var seconds = Number(value)
      var d = Math.floor(seconds / (3600 * 24))
      var h = Math.floor(seconds % (3600 * 24) / 3600)
      var m = Math.floor(seconds % 3600 / 60)
      var s = Math.floor(seconds % 60)
      var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : ""
      var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : ""
      var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : ""
      // var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : ""
      return dDisplay + hDisplay + mDisplay
    }
  }
}