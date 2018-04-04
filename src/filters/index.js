const filters = {
  formatNum (value) {
    if (value > 10000) {
      return (value / 10000).toFixed(1) + '万播放'
    } else if (value > 1000) {
      return (value / 1000).toFixed(1) + 'k播放'
    }
    return value + '次播放'
  },
  formatTime (value) {
    if (value < 10) {
      return '00:0' + value
    } else if (value < 60) {
      return '00:' + value
    } else {
      let min = parseInt(value / 60)
      min = min < 10 ? '0' + min : min
      return min + ":" + value % 60
    }
  },
  formatPercent (value) {
    if (value === undefined) return ''
    return parseInt(value * 100) + '%'
  }
}

export default filters
