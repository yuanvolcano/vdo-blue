<template>
  <div class="wrapper">
    <header-bar :title="title"></header-bar>
    <div class="body">
      <video-list @to-play="getPlayer" :items='vdoItems' :isChange="false"></video-list>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import {getCollectVideo} from 'api'
import videoList from './videoList'
import {mapMutations} from 'vuex'

export default {
  components: {headerBar, videoList},
  data () {
    return {
      title: '收藏',
      vdoItems: {
        list: []
      }
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
