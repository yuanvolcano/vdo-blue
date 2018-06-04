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
  },
  [types.RECOMMEND_MOVIEPAGE] (state, page) {
    state.recommendMoviePage = page
  },
  [types.RECOMMEND_STARPAGE] (state, page) {
    state.recommendStarPage = page
  },
  [types.MOVIE_INDEX] (state, indexArr) {
    state.movieIndex = indexArr
  },
  [types.STAR_INDEX] (state, indexArr) {
    state.starIndex = indexArr
  },
  [types.ALLMOVIE_INDEX] (state, indexArr) {
    state.allMovieIndex = indexArr
  },
  [types.ALLSTAR_INDEX] (state, indexArr) {
    state.allStarIndex = indexArr
  }
}

export default mutations
