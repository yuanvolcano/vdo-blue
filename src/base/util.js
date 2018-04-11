import {getBanner} from 'api'

export function toast (msg, tips) {
  tips.show = true;
  tips.position = 'middle';
  tips.text = msg;
}

export const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

export function _getBanner (param, option) {
  getBanner._post(param).then(result => {
    if (result.status === 1) {
      option.length = 0
      let list = result.data.banner
      let transfer = {url: 'clickUrl', img: 'pic', title: 'name'}
      list.forEach(item => {
        let obj = {}
        for (let key in transfer) {
          obj[key] = item[transfer[key]]
        }
        option.push(obj)
      })
    } else if (result.status === -1) {
      window.setTimeout(() => {
        this.$router.push({path: '/login'})
      }, 100)
    }
  })
}
