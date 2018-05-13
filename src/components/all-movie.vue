<template>
  <div class="allMovie">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <scroll-nav :index="index" :height="height">
        <scroll-nav-panel :label="item" v-for="(item, key) in list" :key="key">
          <!-- 内容 -->
          <p>{{item}}</p>
          <video-list @to-play="getPlayer" :items='videos[key]' @load="loadVdo"></video-list>
          <!-- 内容 -->
        </scroll-nav-panel>
      </scroll-nav>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import videoList from './videoList'
import {Toast, Loading} from 'vux'
import {getVideoSortList} from 'api'
import {toast} from 'base/util'
import {mapMutations} from 'vuex'
import base from 'base/mixin'
import {ScrollNav, ScrollNavPanel} from 'vue-ydui/dist/lib.rem/scrollnav'

const list = () => ['最热', '点赞', '最新', '国内', '日本', '随机']
const videoData = (n) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    let obj = {title: '', list: [], text: '', loadMore: false}
    arr.push(obj)
  }
  return arr
}

const clientHeight = document.body.clientHeight;
const fontSize = document.documentElement.style.fontSize.replace(/px/, '')
const setHeight = (clientHeight - fontSize * 14.67) + 'px'

export default {
  mixins: [base],
  components: {
    headerBar,
    videoList,
    Toast,
    Loading,
    ScrollNav,
    ScrollNavPanel
  },
  data () {
    return {
      height: '8rem',
      title: '电影',
      list: list(),
      index: 0,
      defaultkey: 0,
      pagesArr: [1, 1, 1, 1, 1, 1],
      demo2: '最热',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载',
      videos: videoData(6),
      setHeight: setHeight
    }
  },
  created () {
    this.index = Number(this.$route.params.id)
    for (let j = 0; j < 6; j++) {
      this._getVideoSortList({type: j + 1, page: this.pagesArr[j], loadMore: this.videos[j].loadMore})
    }
  },
  methods: {
    ...mapMutations({
      setVdoInfo: 'SET_VDOITEM'
    }),
    getPlayer (item) {
      this.$router.push({
        path: `/player/${item.id}`
      })
      this.setVdoInfo(item)
    },
    loadVdo () {
      this._getVideoSortList({type: this.index + 1, page: ++this.pagesArr[this.index], loadMore: true})
    },
    _getVideoSortList (param = {}) {
      getVideoSortList._post({
        type: param.type,
        page: param.page,
        rows: 10
      }).then(result => {
        this.videos[param.type - 1].list.length = 0
        if (result.status === 1) {
          if (result.data.videoList.length !== 0) {
            this.videos[param.type - 1].list = result.data.videoList
          } else {
            param.page = 1;
            if (param.loadMore) {
              toast('没有更多的电影了哦', this.tips)
            }
            this.videos[param.type - 1].text = '没有找到小电影!'
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

<style lang="stylus" scoped>
.body .yd-scrollnav
  top 8.17rem
.yd-scrollnav-tab-item
  display flex
.yd-scrollnav-tab-item > li
  flex 0 0 20%

.allMovie
  width 100%
  height 100%
  z-index 10
  position fixed
  left 0
  top 0
  .body
    padding-top 19.17rem
    .tab
      padding-bottom 1.5rem
      overflow-y hidden
      overflow-x auto
      height 4rem
      line-height 4rem
      background-color #fff
      .vux-tab-item
        flex 0 0 22%
      .vux-tab-ink-bar
        position absolute
        bottom 1.5rem
    .vux-tab.tab .vux-tab-item
      background #fff
    .swiper
      background-color #fff
      .swiper-item
        overflow auto
</style>
