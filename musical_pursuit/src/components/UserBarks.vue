<template>
  <div class="profile-space">
    <div class="user-info">
      <h1>What is your competition saying barking at you?</h1>
    </div>
    <div class="user-stats">
      <h1>{{ user_profile.current_level }}</h1>
    </div>
    <div class="user-barks">
      <h3 class="bark-header">See who is barking at you!</h3>
      <!-- <div v-if="has_barks"> -->
      <div class="barks-container">
        <div class="barks-display" :key="bark.id" v-for="bark in barks">
          <h4 class="bark-head">{{ bark.handle }}</h4>
          <h5 class="bark-head-lvl">Lvl:{{ bark.alltime_level }}</h5>
          <h5 class="bark">Bark!</h5>
          <p>{{ bark.Bark.bark }}</p>
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
    has_barks: false
  }),
  mounted() {
    this.getUserBarks()
  },
  methods: {
    async getUserBarks() {
      const intId = this.user_id
      // const Id = intId.toString()
      const res = await axios.get(`http://localhost:3001/api/user/userbarked/${intId}`)
      console.log(res.data)
      this.user_profile = res.data
      this.barks = res.data.barked
      console.log(this.barks)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
} */

/* ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
} */

.bark-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;

}

.barks-display {
  padding: 2vh 4vw;
  text-align: left;
  /* display: grid;
  grid-template-columns: 1fr/1fr; */
  margin: 2vh 4vw 2vh 4vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 10px;
  background-color: rgba(240, 255, 255, 0.195);
  /* border: 1px solid black; */
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
}
</style>
