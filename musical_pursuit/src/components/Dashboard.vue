<template>
  <div class="profile-space">
    <div class="user-info">
      <h1>{{ user_profile.handle }}</h1>
      <h3>{{ user_profile.city }}</h3>
    </div>
    <div class="user-stats">
      <h2>Your Level: {{ user_profile.current_level }}</h2>
    </div>
    <div class="user-watch">
      <h3 class="watch-header">See who is barking at you!</h3>
      <div v-if="has_watchlist">
        <div class="temp">
          <div class="watch-display" :key="watch.id" v-for="watch in watchlist">
            <div class="comp-div">
              <h4 class="competitor-name"><b>Name: </b>{{ watch.handle }} </h4>
              <h5 class="competitor-score"><b></b>Their Score: {{ watch.total_score }} </h5>
              <button>REMOVE FROM WATCHLIST</button>
            </div>

          </div>
        </div>
      </div>
      <div v-else class="user-watch">
        <h3 class="watch-header">look like you're not watcing anyone yet</h3>
        <h4>Find some other players and watch their progress!</h4>
        <div class="find-users">
          <router-link @click="toggle" to="/viewusers">View All Users</router-link>
        </div>
        <!-- <button class="user-list-button">Find Users</button> -->
      </div>
    </div>
    <div class="delete-yourself">
      <p>If you've had enough of RockDog trivia... go ahead and delete yourself. We'll be sad you
        left. But we still appreciate you playing!</p>
      <button class="delete-profile-btn" @click="deleteUser">Delete Yourself</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Client from '../services/api'
// import { LoginUser } from '@/services/Auth';
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: 'DashboardView',
  props: {
    user_handle: String,
    user_id: Number
  },
  data: () => ({
    user_profile: {},
    watchlist: [],
    has_watchlist: false
  }),
  components: {},
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const intId = this.user_id
      const Id = intId.toString()
      const res = await axios.get(`http://localhost:3001/api/user/userprof/${Id}`)
      // console.log(res.data)
      this.user_profile = res.data
      this.watchlist = res.data.watching
      console.log(this.user_profile)
      console.log(this.watchlist)
      if (this.watchlist.length > 0) {
        this.has_watchlist = true
      }
    }
  },
  async deleteUser() {
    const intId = this.user_id
    const Id = intId.toString()
    await Client.delete(`/user/${Id}`)
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

.delete-yourself {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 2vh;
  padding-bottom: 2vh;
}

.watch-display {
  display: grid;
  grid-template-columns: 1fr/1fr;
}

/* .competitor-name,
.competitor-score {
  display: inline;
} */

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

.find-users {
  background-color: rgb(227, 247, 247)))
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