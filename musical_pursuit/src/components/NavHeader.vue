<template>
  <div class="nav-div">
    <div>
      <h3 class="greet-tag" v-if="current_user.handle">Hey {{ current_user.handle }}</h3>
      <h3 class="greet-tag" v-else>Join the fun!</h3>
    </div>
    <div class="three-lines">
      <button id="nav-button" @click="toggle">
        <img src="../assets/menu-button-of-three-horizontal-lines.png" />
      </button>
    </div>
    <div class="menu">
      <div v-if="active" class="menu">
        <div>
          <router-link @click="toggle" to="/">Home</router-link>
        </div>
        <div>
          <router-link @click="toggle" to="/viewusers">View All Users</router-link>
        </div>
        <div>
          <router-link @click="toggle" to="/dashboard" name="Dashboard">Dashboard</router-link>
        </div>
        <div>
          <router-link @click="toggle" to="/loggedout">Logout</router-link>
        </div>
        <div>
          <router-link @click="toggle" to="/register">Register New Player</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import axios from 'axios'
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: "NavHeader",
  data: () => ({
    active: false
  }),
  props: {
    current_user: Object
  },
  mounted() { },
  methods: {
    toggle() {
      this.active = !this.active
    }
  },
  components: {}
}
</script>


<style scoped>
.nav-div {
  margin: 1vw;
  display: flex;
  justify-content: space-between;
}

.greet-tag {
  margin: 0;
  padding: 0;
}

.menu {
  font-family: 'Commissioner';
  font-size: 24px;
  color: rgb(244, 244, 244);
}

.three-lines {
  margin: 0;
}

img {
  width: 8vw;
}

#nav-button {
  border: none;
  background-color: rgba(250, 235, 215, 0);
  margin: 0;
  padding: 0;
}
</style>