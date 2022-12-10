<template>
  <div>
    <div class="usef-info">
      <h1>{{ user_profile.handle }}</h1>
      <h1>{{ user_profile.city }}</h1>
      <h1>{{ user_profile.current_level }}</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: 'DashboardView',
  data: () => ({
    user_city: String,
    user_handle: String,
    user_profile: {}
  }),
  components: {},
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      console.log(this.user_city)
      const Id = this.current_user.id
      const res = await axios.get(`http://localhost:3001/api/user/userbarked/${Id}`)
      console.log(res)
      this.user_profile = res.data
    }
  }
}
</script>

<style>

</style>