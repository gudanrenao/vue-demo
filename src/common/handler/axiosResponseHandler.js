export const responseHandler = {
  methods: {
    errorHandler(error) {
      if (error.response.status === 401) {
        this.$router.push("/login")
      } else {
        this.$notify.error({
          title: '请求异常(status=' + error.response.status + ')',
          message: error.message
        })
      }
    }
  }
}