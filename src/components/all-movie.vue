<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <tab class="tab" :line-width=0 active-color='#F55640' v-model="index" ref="tabs">
        <tab-item v-for="(item, index) in list" @on-item-click="clickToggle" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper class="swiper" :height="setHeight" v-model="index" :show-dots="false">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <video-list @to-play="getPlayer" :items='videoList' @load="loadVdo"></video-list>
        </swiper-item>
      </swiper>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import videoList from './videoList'
import {Tab, TabItem, Swiper, SwiperItem, Toast, Loading} from 'vux'
import {getVideoSortList} from 'api'
import {toast} from 'base/util'
import {mapMutations} from 'vuex'

const list = () => ['最热', '点赞', '最新', '国内', '日本', '随机']

const clientHeight = document.body.clientHeight;
const fontSize = document.documentElement.style.fontSize.replace(/px/, '')
const setHeight = (clientHeight - fontSize * 14.67) + 'px'

export default {
  components: {
    headerBar,
    videoList,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Toast,
    Loading
  },
  data () {
    return {
      title: '电影',
      list: list(),
      index: 0,
      pagesArr: [1, 1, 1, 1, 1, 1, 1],
      demo2: '美食',
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载',
      videoList: {
        list: []
      },
      setHeight: setHeight
    }
  },
  created () {
    this._getVideoSortList({type: this.index + 1, page: this.pagesArr[this.index]})
  },
  methods: {
    ...mapMutations({
      setVdoInfo: 'SET_VDOITEM'
    }),
    clickToggle () {
      this._getVideoSortList({type: this.index + 1, page: this.pagesArr[this.index]})
    },
    getPlayer (item) {
      this.$router.push({
        path: `/player/${item.id}`
      })
      this.setVdoInfo(item)
    },
    loadVdo () {
      this._getVideoSortList({type: this.index + 1, page: ++this.pagesArr[this.index]})
    },
    _getVideoSortList (param = {}) {
      getVideoSortList._post({
        type: param.type,
        page: param.page,
        rows: 9
      }).then(result => {
        if (result.status === 1) {
          if (result.data.videoList.length !== 0) {
            this.videoList.list = result.data.videoList
          } else {
            toast('没有更多的电影了哦', this.tips)
          }
        } else {
          toast(result.msg, this.tips)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  .body
    margin-top 9.17rem
    // background-color #ccc
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
