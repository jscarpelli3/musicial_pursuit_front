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
// import Client from '../services/api'
import axios from 'axios'

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
      // await Client.post(`/user/watch`, watchlistAdd)
      await axios.post(`http://localhost:3001/api/user/watch`, watchlistAdd)
      this.$router.push(`/dashboard`)
    }
  }
}
</script>


<style scoped>
.user-table {
  display: grid;
  grid-template: 1fr 1fr 1fr/1fr 1fr 1fr 1fr;
  /* border: 1px solid black; */
  margin: 2vw;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.407);
  border-radius: 17px;
  background-color: rgba(240, 255, 255, 0.195);
}

.w-list {
  margin: 0 0 0 0;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* align-content: center; */
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

/* .user {

} */
</style>