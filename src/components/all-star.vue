<template>
  <div class="all-star">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <scroll-nav :index="index" :height="height">
        <scroll-nav-panel :label="item" v-for="(item, key) in list" :key="key">
          <!-- 内容 -->
          <p>{{item}}</p>
          <star-list @to-star="getStarer" :items='starData[key]' @load="loadStar(key)"></star-list>
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
import starList from './starList'
import {Tab, TabItem, Swiper, SwiperItem, Toast, Loading} from 'vux'
import {getStarSortList} from 'api'
import {toast} from 'base/util'
import {mapMutations, mapGetters} from 'vuex'
import base from 'base/mixin'
import {ScrollNav, ScrollNavPanel} from 'vue-ydui/dist/lib.rem/scrollnav'

const list = () => ['最热', '最新', '亚洲', '欧美', '原创', '日本', '随机']
const starData = (n) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    let obj = {title: '', list: [], text: ''}
    arr.push(obj)
  }
  return arr
}

// const clientHeight = document.body.clientHeight;
// const fontSize = document.documentElement.style.fontSize.replace(/px/, '')
// const setHeight = (clientHeight - fontSize * 14.67) + 'px'

export default {
  mixins: [base],
  components: {
    headerBar,
    starList,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Toast,
    Loading,
    ScrollNav,
    ScrollNavPanel
  },
  data () {
    return {
      height: '8rem',
      title: '明星',
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
      starList: {
        list: []
      },
      starData: starData(7)
      // setHeight: setHeight
    }
  },
  computed: {
    ...mapGetters(['allStarIndex'])
  },
  created () {
    this.index = Number(this.$route.params.id)
    this.pagesArr = this.allStarIndex
    for (let j = 0; j < 7; j++) {
      this._getStarSortList({type: j + 1, page: this.pagesArr[j]})
    }
  },
  methods: {
    ...mapMutations({
      setStarInfo: 'SET_STARITEM',
      setAllStarIndex: 'ALLSTAR_INDEX'
    }),
    clickToggle () {
      this._getStarSortList({type: this.index + 1, page: this.pagesArr[this.index]})
    },
    getStarer (item) {
      this.$router.push({
        path: `/starer/${item.id}`
      })
      this.setStarInfo(item)
      this.setAllStarIndex(this.pagesArr)
    },
    loadStar (key) {
      this._getStarSortList({type: key + 1, page: ++this.pagesArr[key], loadMore: true})
    },
    _push (list, listData) {
      for (let item of list) {
        listData.push(item);
      }
    },
    _getStarSortList (param = {}) {
      getStarSortList._post({
        type: param.type,
        page: param.page,
        rows: 9
      }).then(result => {
        this.starData[param.type - 1].list.length = 0
        if (result.status === 1) {
          if (result.data.starList.length !== 0) {
            // this._push(result.data.starList, this.starData[param.type - 1].list);
            this.starData[param.type - 1].list = result.data.starList
          } else {
            param.page = 1
            if (param.loadMore) {
              toast('没有更多的电影了哦', this.tips)
            }
            this.starData[param.type - 1].text = '没有找到明星!'
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

.all-star
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
