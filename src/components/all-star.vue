<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
       <tab class="tab" :line-width=0 active-color='#F55640' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper :threshold="threshold" v-model="index" :height="setHeight" :show-dots="false">
        <swiper-item v-for="(item, index) in list" :key="index">
           <star-list @to-star="getStarer" :items='starData[index]' @load="loadStar"></star-list>
        </swiper-item>
      </swiper>
      <!-- <tab class="tab" :line-width=0 active-color='#F55640' v-model="index" ref="tabs">
        <tab-item v-for="(item, index) in list" @on-item-click="clickToggle" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper :height="setHeight" v-model="index" :show-dots="false">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <star-list @to-star="getStarer" :items='starList' @load="loadStar"></star-list>
        </swiper-item>
      </swiper> -->
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
import {mapMutations} from 'vuex'

const list = () => ['最热', '最新', '亚洲', '欧美', '原创', '日本', '随机']
const starData = (n) => {
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
    starList,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Toast,
    Loading
  },
  data () {
    return {
      threshold: 50,
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
      starData: starData(7),
      setHeight: setHeight
    }
  },
  created () {
    this.index = Number(this.$route.params.id)
    for (let j = 0; j < 7; j++) {
      this._getStarSortList({type: j + 1, page: this.pagesArr[j]})
    }
  },
  methods: {
    ...mapMutations({
      setStarInfo: 'SET_STARITEM'
    }),
    clickToggle () {
      console.log(this.index)
      this._getStarSortList({type: this.index + 1, page: this.pagesArr[this.index]})
    },
    getStarer (item) {
      console.log('n')
      this.$router.push({
        path: `/starer/${item.id}`
      })
      this.setStarInfo(item)
    },
    loadStar () {
      this._getStarSortList({type: this.index + 1, page: ++this.pagesArr[this.index]})
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
            this.starData[param.type - 1].list = result.data.starList
          } else {
            param.page--
            if (this.index === param.page - 1) {
              toast('没有更多的明星了哦', this.tips)
            }
            this.starData[param.type - 1].text = '没有找到明星'
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
