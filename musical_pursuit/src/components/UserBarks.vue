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
export default {
  name: 'UserBarks',
  props: {},
  data: () => ({
    user_profile: {},
    barks: [],
    has_barks: false
  }),
  mounted() {
    // getUserBarks()
  },
  methods: {
    // async getUserBarks() {
    //   const intId = this.user_id
    //   const Id = intId.toString()
    //   const res = await axios.get(`http://localhost:3001/api/userbarked/${Id}`)
    //   console.log(res.data)
    //   this.user_profile = res.data
    //   this.barks = res.data.barked
    //   console.log(this.barks)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
