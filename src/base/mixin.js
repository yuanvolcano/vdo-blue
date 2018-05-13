export default {
  mounted () {
    if (!window.sessionStorage.getItem('token')) {
      this.$router.push({path: '/login'})
    }
  }
}
