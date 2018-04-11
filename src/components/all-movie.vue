<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <tab :line-width=0 active-color='#F55640' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
      <!-- <tab class="tab" :line-width=0 active-color='#F55640' v-model="defaultkey" ref="tabs">
        <tab-item v-for="(item, index) in list" @click="defaultkey = index" :key="index">{{item}}</tab-item>
      </tab>
      <swiper class="swiper" :height="setHeight" v-model="defaultkey" :show-dots="false">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <video-list @to-play="getPlayer" :items='videos[index]' @load="loadVdo"></video-list>
        </swiper-item>
      </swiper>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading> -->
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
const videoData = (n) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    let obj = {title: '', list: [], text: ''}
    arr.push(obj)
  }
  return arr
}

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
      defaultkey: 0,
      pagesArr: [1, 1, 1, 1, 1, 1, 1],
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
      videos: videoData(7),
      setHeight: setHeight
    }
  },
  created () {
    for (let j = 0; j < 7; j++) {
      this._getVideoSortList({type: j + 1, page: this.pagesArr[j]})
    }
  },
  methods: {
    ...mapMutations({
      setVdoInfo: 'SET_VDOITEM'
    }),
    clickToggle () {
      // this._getVideoSortList({type: this.index + 1, page: this.pagesArr[this.index]})
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
        this.videos[param.type - 1].list.length = 0
        if (result.status === 1) {
          if (result.data.videoList.length !== 0) {
            this.videos[param.type - 1].list = result.data.videoList
          } else {
            param.page--
            toast('没有更多的电影了哦', this.tips)
            this.videos[param.type - 1].text = '没有找到小电影'
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
