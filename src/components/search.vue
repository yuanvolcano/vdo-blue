<template>
  <div class="wrapper">
    <div class="search">
      <div class="search-box">
        <i class="icon-search" @click="clickQuery"></i>
        <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
        <i @click="clear" v-show="queryTrim" class="icon-dismiss"></i>
      </div>
      <div class="search-cancel" @click="goBack">取消</div>
    </div>
    <txt-block v-show="isShortCut" @cell-click="clickHandle" v-for="(item, index) in items" :key="index" :data="item"></txt-block>
    <search-list v-show="!isShortCut" :data="searchResult" @select="select"></search-list>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
import txtBlock from './txt-block'
import searchList from './search-list'
import {searchVideo} from 'api'
import {toast} from 'base/util'
import {Loading, Toast} from 'vux'
import base from 'base/mixin'

export default {
  mixins: [base],
  components: {txtBlock, searchList, Loading, Toast},
  data () {
    return {
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载',
      placeholder: '搜索你想要的',
      query: '',
      isShortCut: false,
      items: {
        history: {
          title: '历史搜索',
          del: true,
          list: ['濑亚美莉', '西游记', '濑亚美莉', '西游降魔篇', '冷面焊枪', '网吧天子', '濑亚美莉', '西游记']
        } /* ,
        hot: {
          title: '历史搜索',
          del: true,
          list: ['濑亚美莉', '西游记', '濑亚美莉', '西游降魔篇', '冷面焊枪', '网吧天子', '濑亚美莉', '西游记']
        } */
      },
      searchResult: {
        text: '当前搜索为空',
        list: [
          // {
          //   title: '王宝强速报，惊现宝强前妻马蓉和其经纪人老王大战，一分钟短视频',
          //   times: 69900,
          //   agreeRatio: '70%',
          //   imgSrc: require('../assets/images/111@2x.png'),
          //   vdoSrc: ''
          // }
        ]
      }
    }
  },
  methods: {
    select (item) {
      this.$router.push({path: `/player/${item.id}`})
    },
    searchQuery () {
      searchVideo._post({
        content: this.queryTrim,
        page: 1,
        rows: 50
      }).then(result => {
        if (result.status === 1) {
          this.searchResult.list = result.data.videoList
          this.saveHistory();
        } else {
          toast(result.msg, this.tips);
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    clear () {
      this.query = ''
    },
    clickHandle (item) {
      this.query = item;
    },
    goBack () {
      this.$router.go(-1);
    },
    clickQuery () {},
    saveHistory () {
      let historyQuery = window.localStorage.getItem('query') || []
      if (historyQuery.length < 11) {
        historyQuery.push(this.queryTrim)
      }
    }
  },
  computed: {
    queryTrim () {
      return this.query.trim()
    }
  },
  watch: {
    query (newVal) {
      if (newVal.trim() !== '') {
        this.isShortCut = false
        this.searchQuery()
      } else {
        this.isShortCut = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.wrapper
  width 100%
  .search
    padding 0 2.5rem
    height 8.42rem
    background-color #F8F8F8
    display flex
    align-items center
    justify-content space-between
    border-bottom 1px solid #E5E5E5
    .search-box
      flex-grow 1
      width 32.5rem
      padding-left 1.5rem
      padding-right 1.5rem
      background-color #fff
      height 5.17rem
      border-radius 7.33rem
      display flex
      align-items center
      justify-content around
      color #DBC08F
      font-size 2.33rem
      .icon-search
        font-size 4rem
      .box
        width 22rem
        flex-grow 1
        color #DBC08F
        height 3.33rem
        line-height 3.33rem
      .icon-dismiss
        font-size 2.5rem
        color $color-background
    .search-cancel
      margin-left 1.67rem
      font-size 2.67rem
      color #666
      width 6rem
</style>
