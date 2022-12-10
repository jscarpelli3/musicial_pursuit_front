<template>
  <div class="nav-div">
    <div class="three-lines">
      <button id="nav-button" @click="toggle">
        <img src="../assets/menu-button-of-three-horizontal-lines.png" />
      </button>
      <div class="menu">
        <div v-if="active" class="menu">
          <div>
            <router-link to="/">Home</router-link>
          </div>
          <div>
            <router-link to="/viewusers">View All Users</router-link>
          </div>
          <div>
            <router-link to="/dashboard" name="Dashboard">Dashboard</router-link>
          </div>
          <div>
            <router-link to="/logout">Logout</router-link>
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
    active: false,
    current_user: ""
  }),
  mounted() { },
  methods: {
    toggle() {
      this.active = !this.active
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