<template>
  <div class="profile-space">
    <div class="user-info">
      <h1>{{ user_profile.handle }}</h1>
      <h3>{{ user_profile.city }}</h3>
    </div>
    <div class="user-stats">
      <h1>{{ user_profile.current_level }}</h1>
    </div>
    <div class="user-barks">
      <h3 class="bark-header">See who is barking at you!</h3>
      <!-- <div v-if="has_barks"> -->
      <div class="temp">
        <div class="barks-display" :key="bark.id" v-for="bark in barks">
          <h4>Your competitor:{{ bark.handle }}</h4>
          <h5>Their level:{{ bark.alltime_level }}</h5>
          <h6>What they had to say to you:</h6>
          <p>{{ bark.Bark.bark }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: 'DashboardView',
  props: {
    user_handle: String,
    user_id: Number
  },
  data: () => ({
    user_profile: {},
    barks: [],
    has_barks: false
  }),
  components: {},
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const intId = this.user_id
      const Id = intId.toString()
      const res = await axios.get(`http://localhost:3001/api/user/userbarked/${Id}`)
      console.log(res.data)
      this.user_profile = res.data
      this.barks = res.data.barked
      console.log(this.barks)
    }
  }
}
</script>

<style scoped>
.profile-space {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.user-stats {
  margin: 2vh;
}

.user-barks {
  margin: 2vh;
}

.barks-display {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* align-content: flex-start; */
}

.bark-header {
  margin-bottom: 2vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
</style>