<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <video-list @to-play="getPlayer" :items='vdoItems' :isChange="false"></video-list>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
    <loading v-model="loading" :text="text"></loading>
  </div>
</template>

<script>
import headerBar from './header'
import {getCollectVideo} from 'api'
import videoList from './videoList'
import {mapMutations} from 'vuex'
import {Toast, Loading} from 'vux'
import {toast} from 'base/util'

export default {
  components: {headerBar, videoList, Toast, Loading},
  data () {
    return {
      title: '收藏',
      vdoItems: {
        list: []
      },
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      loading: false,
      text: '正在加载'
    }
  },
  created () {
    this._getCollectVideo()
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
    _getCollectVideo () {
      getCollectVideo._post({
        page: 1,
        rows: 50
      }).then(result => {
        if (result.status === 1) {
          this.vdoItems.list = result.data.videoList
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

  .wrapper
    width 100%
    .body
      margin-top 8.17rem
      padding 1.67rem
</style>
