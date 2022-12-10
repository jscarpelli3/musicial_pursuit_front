<template>
  <div class="nav-div">
    <div class="three-lines">
      <h3 v-if="current_user.handle">Hey {{ current_user.handle }}</h3>
      <button id="nav-button" @click="toggle">
        <img src="../assets/menu-button-of-three-horizontal-lines.png" />
      </button>
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
      console.log(this.current_user.name)
    }
  },
  components: {}
}
</script>


<style>
/* .nav-div {
  display: flex;
  justify-content: space-around;
} */
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
}
</style>