<template>
  <div class="comments">
    <header-bar :title="title"></header-bar>
    <div class="add">
      <add-comment @publish="publish"></add-comment>
    </div>
    <div class="content">
       <comment-list :hasMore="hasMore" :comments="comments" @load="load"></comment-list>
    </div>
    <toast v-model="tips.show" :type="tips.type" :width="tips.width" :position="tips.position" :text="tips.text"></toast>
  </div>
</template>

<script>
import headerBar from './header'
import commentList from './comment-list'
import addComment from './add-comment'
import {addVideoComment, getRelateComment} from 'api'
import {Toast} from 'vux'
import {toast} from 'base/util'

export default {
  components: {headerBar, addComment, Toast, commentList},
  data () {
    return {
      tips: {
        show: false,
        width: '25rem',
        type: 'text',
        position: 'middle',
        text: ''
      },
      title: '评论',
      commentPage: 1,
      comments: [],
      hasMore: false
    }
  },
  created () {
    this._getRelateComment({page: this.commentPage})
  },
  methods: {
    load () {
      this._getRelateComment({page: ++this.commentPage, notFirst: false})
    },
    publish (value) {
      addVideoComment._post({
        comment: value.trim(),
        videoId: this.$route.params.id
      }).then(result => {
        if (result.status === 1) {
          this._getRelateComment({page: 1, notFirst: true})
        } else {
          toast(result.msg, this.tips)
          if (result.status === -1) {
            window.setTimeout(() => {
              this.$router.push({path: '/login'})
            }, 100)
          }
        }
      })
    },
    _getRelateComment (param = {}) {
      getRelateComment._post({
        videoId: this.$route.params.id,
        page: param.page,
        rows: this.recommendRows || 20
      }).then(result => {
        if (result.status === 1) {
          if (result.data.commentList.length === 20) {
            this.hasMore = true
          } else {
            this.hasMore = false
          }
          if (result.data.commentList && param.notFirst) {
            this.comments = result.data.commentList
          } else {
            for (let comment of result.data.commentList) {
              this.comments.push(comment)
            }
          }
          // if (result.data.commentList && result.data.commentList.length !== 0) {
          //   for (let comment of result.data.commentList) {
          //     this.comments.push(comment)
          //   }
          //   if (result.data.commentList.length !== 20) {
          //     this.hasMore = false
          //   } else {
          //     this.hasMore = false
          //   }
          //   // this.comments = result.data.commentList
          // } else {
          //   if (!param.notFirst) {
          //     this.commentPage--
          //     toast('没有更多评论了哦', this.tips);
          //   }
          // }
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

.comments
  width 100%
  .add
    position fixed
    top 8.17rem
  .content
    margin-top 16.34rem
</style>
