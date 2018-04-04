<template>
  <div class="wrapper">
    <header-bar :title="starData.name"></header-bar>
    <div class="body">
      <star-intro :dataList="starData"></star-intro>
      <video-list @to-play="getPlayer" :items='vdoItems' @load="loadVdo" :className="classObj"></video-list>
      <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
      <loading v-model="loading" :text="text"></loading>
    </div>
  </div>
</template>

<script>
import headerBar from './header'
import starIntro from './star-introduction'
import videoList from './videoList'
import {getStarDetail} from 'api'
import {toast} from 'base/util'
import {Toast, Loading} from 'vux'

export default {
  components: {
    Toast,
    Loading,
    headerBar,
    starIntro,
    videoList
  },
  data () {
    return {
      starData: {},
      change: false,
      classObj: {
        item: 'item-width',
        imgWidth: 'item-img-width'
      },
      page: 1,
      vdoItems: {
        title: '主要作品',
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
    this._getStarDetail({id: this.$route.params.id, page: this.page})
  },
  methods: {
    loadVdo () {
      this.videoPage++
      this._getStarDetail({id: this.$route.params.id, page: ++this.page})
    },
    getPlayer (item) {
      this.$router.push({
        path: `/player/${item.id}`
      })
    },
    _getStarDetail (param) {
      getStarDetail._post({
        id: param.id,
        page: param.page,
        rows: 9
      }).then(result => {
        if (result.status === 1) {
          this.starData = result.data.starDetail
          if (result.data.starWorkList.length !== 0) {
            this.vdoItems.list = result.data.starWorkList
          } else {
            toast('已经加载完所有作品了', this.tips)
            this.page = 1
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
  background-color #fff
  overflow hidden
  .body
    margin-top 8.17rem
</style>
