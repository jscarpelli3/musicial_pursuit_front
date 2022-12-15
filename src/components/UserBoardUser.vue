<template>
  <div class="user-table">
    <p><b>Name:</b> <span class="w-list handle">{{ handle }}</span></p>
    <p><b>City:</b><span class="w-list city">{{ city }}</span></p>
    <p><b>Level:</b><span class="w-list level">{{ level }}</span></p>
    <p><b>Score:</b><span class="w-list score">{{ score }}</span></p>
    <!-- <p class="w-list handle">{{ handle }}</p>
    <p class="w-list city">{{ city }}</p>
    <p class="w-list level">{{ level }}</p>
    <p class="w-list score">{{ score }}</p> -->
    <div class="w-list-btn">
      <button @click="addList(comp_id, user_id)" class="add-btn">Add to Watchlist</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Client from '../services/api'

export default {
  name: 'UserBoardUSer',
  props: {
    handle: String,
    city: String,
    level: Number,
    score: Number,
    comp_id: Number,
    user_id: Number
  },
  methods: {
    async addList(adding, current_user) {
      let watchlistAdd = { being_watched: adding, watcher: current_user }
      await await Client.post(`/user/watch`, watchlistAdd)
      this.$router.push(`/dashboard`)
    }
  }
}
</script>


<style scoped>
.user-table {
  /* display: grid;
  grid-template: 1fr 1fr 1fr/1fr 1fr 1fr 1fr; */
  margin: 2vh 1vw 2vh 1vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 6px;
  background-color: rgba(240, 255, 255, 0.195);
  padding: 2vw;
  display: inline-table;
}

.w-list {
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: black;
}

.w-list-btn {
  grid-column: 1/5;
}

.add-btn {
  width: 40vw;
  height: 5vh;
  background-color: rgba(227, 247, 247, 0.467);
  border-radius: 8px;
  margin-bottom: 2vh;
}

button {
  font-family: Commissioner;
}

p,
.handle,
.city,
.level,
.score {
  background-color: rgba(0, 0, 0, 0.059);
  margin-bottom: 1vh;
  padding: 0.5vw;
  text-align: left;
}

.city {
  height: 5vh;
}
</style>