export default {
  mounted () {
    // debugger
    console.log(document.cookie)
    if (!window.sessionStorage.getItem('token')) {
      this.$router.push({path: '/login'})
    }
  }
}
