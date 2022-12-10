<template>
  <div>
    <div class="user-info">
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
  props: {
    user_city: String,
    user_handle: String,
    user_id: Number
  },
  data: () => ({
    user_profile: {}
  }),
  components: {},
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const intId = this.user_id
      const Id = intId.toString()
      console.log(Id)
      const res = await axios.get(`http://localhost:3001/api/user/userbarked/${Id}`)
      console.log(res)
      this.user_profile = res.data
    }
  }
}
</script>

<style>

</style>