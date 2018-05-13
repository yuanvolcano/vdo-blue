<template>
  <div class="wrapper">
    <search-bar @focus="focusHandle" @quick="quickClick" @all="allCLick" :toggle="toggle"></search-bar>
    <swiper :list="list" :auto="true" :height="'36rem'" :loop="true"></swiper>
    <div class="movie-content">
      <video-list v-for="(data, k) in videoData" :key="k" :items='data' @next="next(k)" @to-play="getPlayer" @load="loadVdo(k)"></video-list>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import videoList from './videoList'
import starList from './starList'
import searchBar from './search-bar'
import {Swiper, Toast, Loading} from 'vux'
import {toast, _getBanner} from 'base/util'
import {getVideoList} from 'api'
import {mapMutations} from 'vuex'
import base from 'base/mixin'

export default {
  mixins: [base],
  components: {
    Swiper,
    Toast,
    Loading,
    searchBar,
    videoList,
    starList
  },
  data () {
    return {
      toggle: {
        hasToggle: true,
        txt: '最热',
        all: '全部分类'
      },
      list: [],
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      text: '正在提交',
      loading: false,
      videoData: [
        {
          title: '最热电影',
          list: [],
          text: '当前没有电影！'
        },
        {
          title: '点赞最多',
          list: [],
          text: '当前没有电影！'
        },
        {
          title: '最新电影',
          list: [],
          text: '当前没有电影！'
        }
      ],
      indexArr: [1, 1, 1]
    }
  },
  created () {
    _getBanner({position: 'video'}, this.list)
    for (let i = 1; i < 4; i++) {
      this._getVideoList({type: i, page: 1})
    }
  },
  methods: {
    ...mapMutations({
      setVdoInfo: 'SET_VDOITEM'
    }),
    next (index) {
      this.$router.push({name: 'allMovie', params: {id: index}})
    },
    quickClick () {
      this.$router.push({path: '/allMovie/0'})
    },
    allCLick () {
      this.$router.push({path: '/allMovie/0'})
    },
    loadVdo (index) {
      this.videoPage++
      this._getVideoList({type: index + 1, page: ++this.indexArr[index], loadMore: true})
    },
    getPlayer (item) {
      this.$router.push({
        path: `/player/${item.id}`
      })
      this.setVdoInfo(item)
    },
    focusHandle () {
      this.$router.push('/search');
    },
    _getVideoList (param = {}) {
      getVideoList._post({
        type: param.type,
        page: param.page,
        rows: 10
      }).then(result => {
        if (result.status === 1) {
          if (result.data.videoList.length !== 0) {
            this.videoData[param.type - 1].list = result.data.videoList
          } else {
            param.page--
            if (param.loadMore) {
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
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/mixin.styl"

  .wrapper
    width 100%
    .movie-content
      padding-bottom 8.17rem
</style>
