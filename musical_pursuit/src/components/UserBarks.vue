<template>
  <div class="profile-space">
    <div class="user-info">
      <h1 class="bark-title">RockDogs are barking!</h1>
    </div>
    <div class="user-barks">
      <div class="barks-container">
        <div class="barks-display" :key="bark.id" v-for="bark in barks">
          <h3 @click="deleteBark(bark.barked, bark.createdAt, false)" class="x">x</h3>
          <h4 class="bark-head">From: <b>{{ bark.handle }}</b></h4>
          <p>{{ bark.bark }}</p>
          <h6>{{ barkTime(bark.createdAt) }}</h6>
          <button @click="this.$router.push(`/newbark/${bark.barked}/${bark.handle}`)">Bark Back!</button>
        </div>
      </div>
      <div class="user-info">
        <h2 class="bark-title yours">your barks...</h2>
      </div>
      <div class="barked-container">
        <div class="barks-display" :key="bark.id" v-for="bark in barked">
          <h3 @click="deleteBark(bark.barked, bark.createdAt, true)" class="x">x</h3>
          <h4 class="barked-head">To: <b>{{ bark.handle }} </b></h4>
          <p>{{ bark.bark }}</p>
          <h6>{{ barkTime(bark.createdAt) }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Client from '../services/api'

export default {
  name: 'UserBarks',
  props: {
    user_id: Number,
    user_handle: String
  },
  data: () => ({
    user_profile: {},
    barks: [],
    has_barks: false,
    barked: [],
    has_barked: false
  }),
  mounted() {
    this.getUserBarks()
  },
  methods: {
    async getUserBarks() {
      // const intId = this.user_id
      // const res = await axios.get(`http://localhost:3001/api/user/userbarked/${intId}`)
      // this.user_profile = res.data
      // console.log(res)
      // this.barks = res.data
      this.getBarks()
      this.getBarked()
    },
    async deleteBark(barker, created, self) {
      await Client.delete(`bark/${barker}/${created}`)
      console.log(created)
      console.log(barker)
      if (self) {
        this.getBarked()
      } else {
        this.getBarks()
      }
    },
    async getBarks() {
      const intId = this.user_id
      // const res = await axios.get(`http://localhost:3001/api/user/userbarked/${intId}`)
      const res = await axios.get(`https://rockdog-trivia-server.herokuapp.com/api/user/userbarker/${intId}`)
      this.user_profile = res.data
      console.log(res)
      this.barks = res.data
    },
    async getBarked() {
      const intId = this.user_id
      // const res_barked = await axios.get(`http://localhost:3001/api/user/userbarker/${intId}`)
      const res_barked = await axios.get(`https://rockdog-trivia-server.herokuapp.com/api/user/userbarked/${intId}`)
      console.log(res_barked)
      this.barked = res_barked.data
    },

    // async getUserBarks() {
    //   const intId = this.user_id
    //   // const Id = intId.toString()
    //   const res = await axios.get(`http://localhost:3001/api/user/userbarked/${intId}`)
    //   this.user_profile = res.data
    //   this.barks = res.data.barked
    //   const res_barked = await axios.get(`http://localhost:3001/api/user/userbarker/${intId}`)
    //   console.log(res_barked)
    //   this.barked = res_barked.data.barker
    // },
    barkTime(timestamp) {
      let split = timestamp.split(/[T:]/)
      let date = `${split[0]}`
      let time = `${split[1]}:${split[2]}`
      return `Barked at ${time} on ${date}`
    }
  }
}
</script>


<style scoped>
button {
  font-family: Commissioner;
  width: 40vw;
  height: 4vh;
  background-color: rgba(227, 247, 247, 0.467);
  border-radius: 8px;
  margin: 1vh 1vw;
  text-align: center;
}

.barks-container,
.barked-container {
  display: flex;
  align-content: flex-end;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 2vw
}

.barks-display {
  flex: 0 0 auto;
  padding: 1vh 3vw;
  text-align: center;
  margin: 2vh 4vw 2vh 6vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 6px;
  background-color: rgba(240, 255, 255, 0.195);
  width: 50vw;
  height: 21vh;
  overflow: scroll;
}

a {
  color: #42b983;
}

.bark {
  margin-top: 2vh;
  margin-bottom: 0;
}

.bark-head,
.bark-head-lvl {
  display: inline;
}

.bark-head-lvl {
  margin-left: 4vw;
  color: black;
}

h2,
h3,
h3,
h4,
h5,
h6 {
  margin: 0;
}

p {
  margin-top: 1vh;
  margin-bottom: 0;
  color: black;
  background-color: rgba(128, 128, 128, 0.559);
  padding: 2vw;
  width: 44vw;
  height: 7vh;
}

.bark-title {
  text-align: left;
  color: azure;
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.647);
  margin: 1vh 4vw;
}

.user-info {
  border-top: 1px solid black;
  margin: 3vh 3vw 0 3vw;
}

.x {
  display: block;
  float: left;
  margin: -1vh 0 0 -2vw;
  padding: 0;
  text-align: center;
  font-style: normal;
  color: rgba(0, 0, 0, 0.168);
  cursor: pointer;
}
</style>
