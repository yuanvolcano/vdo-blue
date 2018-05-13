<template>
  <div class="wrapper">
    <search-bar @focus="focusHandle" :toggle="toggle" @quick="quickClick" @all="allClick"></search-bar>
    <swiper :list="list" :auto="true" :height="'36rem'" :loop="true"></swiper>
    <div class="star-content">
      <star-list v-for="(data, k) in starData" :key="k" @next="next(k)" :items='data' @to-star="getStarer" @load="loadStar(k)"></star-list>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
import starList from './starList'
import searchBar from './search-bar'
import {Swiper, Toast, Loading} from 'vux'
import {toast, _getBanner} from 'base/util'
import {getStarList} from 'api'
import {mapMutations} from 'vuex'

export default {
  components: {
    Swiper,
    Toast,
    Loading,
    searchBar,
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
      starData: [
        {
          title: '亚洲专区',
          list: [],
          text: '当前没有明星！'
        },
        {
          title: '欧美专区',
          list: [],
          text: '当前没有明星！'
        },
        {
          title: '原创专区',
          list: [],
          text: '当前没有明星！'
        }
      ],
      indexArr: [1, 1, 1]
    }
  },
  created () {
    _getBanner({position: 'star'}, this.list)
    for (let i = 1; i < 4; i++) {
      this._getStarList({type: i, page: 1})
    }
  },
  methods: {
    ...mapMutations({
      setStarInfo: 'SET_STARITEM'
    }),
    next (index) {
      index = index + 2
      this.$router.push({name: 'allStar', params: {id: index}})
    },
    quickClick () {
      this.$router.push({path: '/allStar/0'})
    },
    allClick () {
      this.$router.push({path: '/allStar/0'})
    },
    getStarer (item) {
      this.$router.push({
        path: `/starer/${item.id}`
      })
      this.setStarInfo(item)
    },
    loadStar (index) {
      this.starPage++
      this._getStarList({type: index + 1, page: ++this.indexArr[index], loadMore: true})
    },
    focusHandle () {
      this.$router.push('/search');
    },
    _getStarList (param = {}) {
      getStarList._post({
        type: param.type,
        page: param.page,
        rows: 10
      }).then(result => {
        if (result.status === 1) {
          if (result.data.starList.length !== 0) {
            this.starData[param.type - 1].list = result.data.starList
          } else {
            param.page--
            if (param.loadMore) {
              toast('没有更多明星了哦', this.tips)
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
    .star-content
      padding-bottom 8.17rem
</style>
