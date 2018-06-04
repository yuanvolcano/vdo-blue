<template>
  <div class="wrapper">
    <search-bar @focus="focusHandle"></search-bar>
    <swiper :list="list" :auto="true" :height="'36rem'" :loop="true"></swiper>
    <div class="recommend-content">
      <video-list @to-play="getPlayer" :items='vdoItems' @load="loadVdo" @next="nextMovie"></video-list>
      <star-list @to-star="getStarer" :items='starItems' @load="loadStar" @next="nextStar"></star-list>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
// import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'
import videoList from './videoList'
import starList from './starList'
import searchBar from './search-bar'
import {getRelateVideo} from 'api'
import {Swiper, Toast, Loading} from 'vux'
import {toast, _getBanner} from 'base/util'
import {mapMutations, mapGetters} from 'vuex'
import base from 'base/mixin'

export default {
  mixins: [base],
  components: {
    Toast,
    Loading,
    searchBar,
    Swiper,
    videoList,
    starList
  },
  data () {
    return {
      list: [],
      rows: 10,
      videoPage: 1,
      starPage: 1,
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载',
      vdoItems: {
        title: '最新推荐',
        list: [],
        text: '当前没有电影！'
      },
      starItems: {
        title: '最热明星',
        list: [],
        text: '当前没有明星！'
      }
    }
  },
  computed: {
    ...mapGetters(['recommendMoviePage', 'recommendStarPage'])
  },
  created () {
    this.videoPage = this.recommendMoviePage
    this.starPage = this.recommendStarPage
    this._getRecommendVideo({videoPage: this.videoPage, rows: this.rows})
    this._getRecommendStar({starPage: this.starPage, rows: this.rows})
    _getBanner({position: 'recommend'}, this.list)
  },
  methods: {
    ...mapMutations({
      setStarInfo: 'SET_STARITEM',
      setVdoInfo: 'SET_VDOITEM',
      setMoviePage: 'RECOMMEND_MOVIEPAGE',
      setStarPage: 'RECOMMEND_STARPAGE'
    }),
    nextMovie () {
      this.$router.push({name: 'allMovie', params: {id: 2}})
    },
    nextStar () {
      this.$router.push({name: 'allStar', params: {id: 0}})
    },
    loadVdo () {
      this.videoPage++
      this._getRecommendVideo({videoPage: this.videoPage, rows: this.rows, loadmore: true})
    },
    loadStar () {
      this.starPage++
      this._getRecommendStar({starPage: this.starPage, rows: this.rows, loadmore: true})
    },
    focusHandle () {
      this.$router.push('/search');
    },
    getPlayer (item) {
      this.$router.push({
        path: `/player/${item.id}`
      })
      this.setVdoInfo(item)
      this.setMoviePage(this.videoPage)
    },
    getStarer (item) {
      this.$router.push({
        path: `/starer/${item.id}`
      })
      this.setStarInfo(item)
      this.setStarPage(this.starPage)
    },
    _getRecommendVideo (param = {}) {
      param.loadmore && (this.loading = true)
      getRelateVideo._post({
        type: 1,
        page: param.videoPage || 1,
        rows: param.rows || 10
      }).then(result => {
        this.loading = false
        if (result.status === 1) {
          if (result.data.recommendVideo.length !== 0) {
            this.vdoItems.list = result.data.recommendVideo
          } else {
            this.videoPage = 1
            if (param.loadmore) {
              toast('没有更多视频了哦', this.tips)
            }
          }
        } else {
          toast(result.msg, this.tips)
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    _getRecommendStar (param = {}) {
      param.loadmore && (this.loading = true)
      getRelateVideo._post({
        type: 2,
        page: param.starPage || 1,
        rows: param.rows || 10
      }).then(result => {
        this.loading = false
        if (result.status === 1) {
          if (result.data.recommendStar.length !== 0) {
            this.starItems.list = result.data.recommendStar
          } else {
            this.starPage = 1
            if (param.loadmore) {
              toast('没有更多明星了哦', this.tips);
            }
          }
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .wrapper
    width 100%
    .recommend-content
      padding-bottom 8.17rem
</style>
