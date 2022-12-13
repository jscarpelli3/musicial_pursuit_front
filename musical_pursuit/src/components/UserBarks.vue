<template>
  <div class="profile-space">
    <div class="user-info">
      <h1>What is your competition barking at you?</h1>
    </div>
    <div class="user-barks">
      <!-- <div v-if="has_barks"> -->
      <div class="barks-container">
        <div class="barks-display" :key="bark.id" v-for="bark in barks">
          <h4 class="bark-head">{{ bark.handle }}</h4>
          <h5 class="bark-head-lvl">Lvl:{{ bark.alltime_level }}</h5>
          <!-- <h5 class="bark">Bark!</h5> -->
          <p>{{ bark.Bark.bark }}</p>
          <button @click="this.$router.push(`/newbark/${bark.id}/${bark.handle}`)">Bark Back!</button>
        </div>
      </div>
      <div class="user-info">
        <h1>View your own barks!</h1>
      </div>
      <div class="barked-container">
        <div class="barked-display" :key="bark.id" v-for="bark in barked">
          <h4 class="barked-head">To:{{ bark.handle }}</h4>
          <!-- <h5 class="barked-head-lvl">Lvl:{{ bark.alltime_level }}</h5> -->
          <!-- <h5 class="bark">Bark!</h5> -->
          <p>{{ bark.Bark.bark }}</p>
          <!-- <button @click="this.$router.push(`/newbark/${bark.id}/${bark.handle}`)">Bark Back!</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
      const intId = this.user_id
      // const Id = intId.toString()
      const res = await axios.get(`http://localhost:3001/api/user/userbarked/${intId}`)
      this.user_profile = res.data
      this.barks = res.data.barked
      const res_barked = await axios.get(`http://localhost:3001/api/user/userbarker/${intId}`)
      console.log(res_barked)
      this.barked = res_barked.data.barker
    }
  }
}
</script>


<style scoped>
button {
  width: 40vw;
  height: 4vh;
  background-color: rgba(227, 247, 247, 0.467);
  border-radius: 8px;
  margin: 1vh 1vw;
  text-align: center;
}

.bark-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 2vw
}

.barks-display,
.barked-display {
  padding: 2vh 6vw;
  text-align: left;
  margin: 2vh 4vw 2vh 6vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 10px;
  background-color: rgba(240, 255, 255, 0.195);
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
}
</style>
