<template>
  <div class="user-table">
    <p><b>Name:</b></p>
    <p><b>City:</b></p>
    <p><b>Level:</b></p>
    <p><b>Score:</b></p>
    <p class="w-list">{{ handle }}</p>
    <p class="w-list">{{ city }}</p>
    <p class="w-list">{{ level }}</p>
    <p class="w-list">{{ score }}</p>
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
      console.log(this.user_id)
      let watchlistAdd = { being_watched: adding, watcher: current_user }
      await await Client.post(`/user/watch`, watchlistAdd)
      this.$router.push(`/dashboard`)
    }
  }
}
</script>


<style scoped>
.user-table {
  display: grid;
  grid-template: 1fr 1fr 1fr/1fr 1fr 1fr 1fr;
  margin: 2vh 8vw 2vh 8vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 6px;
  background-color: rgba(240, 255, 255, 0.195);
  padding: 0vw;
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
</style>