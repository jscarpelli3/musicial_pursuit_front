<template>
  <div class="profile-space">
    <div class="user-info">
      <h1>{{ user_profile.handle }}</h1>
      <h4>from:{{ user_profile.city }}</h4>
    </div>
    <div class="user-stats">
      <h4>Current Level: {{ parseInt(user_profile.current_level) }}</h4>
      <h4>All Time Level: {{ parseInt(user_profile.alltime_level) }}</h4>
      <h4>High Session Score: {{ parseInt(user_profile.high_ses_score) }}</h4>
      <h3>Total Score: {{ parseInt(user_profile.total_score) }}</h3>
    </div>
    <div class="play-btn-div">
      <router-link to="game"><button class="play-btn">PLAY NOW!</button></router-link>
    </div>
    <div class="find-user">
      <div class="find-user">
        <router-link to="/viewusers"><button>View All Users</button></router-link>
        <router-link to="/viewbarks"><button>View Your Barks</button></router-link>
      </div>
    </div>
    <div class="user-watch">
      <h3 class="watch-header">Your watchlist:</h3>
      <div v-if="has_watchlist">
        <div class="temp">
          <div class="watch-display" :key="watch.id" v-for="watch in watchlist">
            <div class="comp-div">
              <h4 class="competitor-name"><b>Name: </b>{{ watch.handle }} </h4>
              <h5 class="competitor-score"><b></b>Their Score: {{ watch.total_score }} </h5>
              <button @click="removeFromList(watch.id, user_id)">REMOVE </button>
              <button @click="makeBark(watch.id, user_id)">BARK!</button>
            </div>

          </div>
        </div>
      </div>
      <div v-else class="user-watch">
        <h3 class="watch-header">look like you're not watching anyone yet</h3>
        <h4>Find some other players and watch their progress!</h4>
        <div class="find-user">
          <router-link to="/viewusers"><button>View All Users</button></router-link>
        </div>
        <!-- <button class="user-list-button">Find Users</button> -->
      </div>
    </div>
    <div class="new bark">
      <input placeholder="bark!" @input="handleChange" name="bark" type="text" /><br />
    </div>
    <div class="delete-yourself">
      <p>If you've had enough of RockDog trivia... go ahead and delete yourself. We'll be sad you
        left. But we still appreciate you playing!</p>
      <button class="delete-profile-btn" @click="deleteUser()">Delete Yourself</button>
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
    has_watchlist: false,
    new_bark: false
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
      console.log(this.user_handle)
      this.user_profile = res.data
      this.$emit('setUser', this.user_profile)
      this.watchlist = res.data.being_watched
      console.log(this.user_profile)
      if (this.watchlist.length > 0) {
        this.has_watchlist = true
      } else {
        this.has_watchlist = false
      }
    },
    async deleteUser() {
      const intId = this.user_id
      // const Id = intId.toString()
      await Client.delete(`/user/${intId}`)
      this.$router.push(`/bye`)
    },
    async removeFromList(being_watched, watcher) {
      await Client.delete(`/user/${being_watched}/${watcher}`)
      this.getUserInfo()
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

.watch-header {
  margin: 2vh 0 3vh 0;
  text-shadow: 2px 1px 3px black;
}

.delete-yourself {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 2vh 4vw;
  padding-bottom: 2vh;
}

.watch-display,
.user-stats {
  display: grid;
  grid-template-columns: 1fr/1fr;
  margin: 2vh 4vw 2vh 4vw;
  /* border: 1px solid black; */
  /* margin: 2vw; */
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 10px;
  background-color: rgba(240, 255, 255, 0.195);
  /* border-radius: 8px; */
}

.user-stats {
  margin: 2vh;
}

.play-btn-div {
  margin: 2vh;
  /* padding: 2vh */
}

.play-btn {
  width: 85vw;
  height: 8vh;
  background-color: rgb(244, 118, 28);
  text-shadow: 2px 1px 3px;
}

/* .user-barks {
  margin: 2vh;
}

.barks-display {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
} */

button {
  width: 40vw;
  height: 4vh;
  background-color: rgba(227, 247, 247, 0.467);
  border-radius: 8px;
  /* margin-bottom: 2vh; */
  margin: 1vh 1vw;
}

/* .bark-header {
  margin-bottom: 2vh;
} */

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