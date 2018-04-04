import * as types from './mutation-type'

const mutations = {
  [types.SET_LOGININFO] (state, info) {
    state.loginInfo = info
  },
  [types.SET_VDOITEM] (state, item) {
    state.vdoItem = item
  },
  [types.SET_STARITEM] (state, item) {
    state.starItem = item
  }
}

export default mutations
