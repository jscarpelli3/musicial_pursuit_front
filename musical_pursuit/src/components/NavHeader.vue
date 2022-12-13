<template>
  <div>
    <div class="nav-div">
      <div>
        <h3 class="greet-tag" v-if="current_user.handle">Hey {{ current_user.handle }}!</h3>
        <h3 class="greet-tag" v-else>Join the fun!</h3>
      </div>
      <div class="three-lines">
        <button id="nav-button" @click="toggle">
          <img src="../assets/menu-button-of-three-horizontal-lines.png" />
        </button>
      </div>
    </div>
    <div class="menu">
      <Transition>
        <div v-if="active" class="menu">
          <div>
            <router-link @click="toggle" to="/dashboard" name="Dashboard">Dashboard</router-link>
          </div>
          <div>
            <router-link @click="toggle" to="/viewusers">View All Users</router-link>
          </div>
          <div>
            <router-link @click="toggle" to="/register">Register New Player</router-link>
          </div>
          <div>
            <router-link @click="toggle" to="/">FrontPage</router-link>
          </div>
          <div>
            <router-link @click="toggle" to="/loggedout">Logout</router-link>
          </div>
        </div>
      </Transition>
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
  align-items: flex-start;
}

.greet-tag {
  margin: 0;
  padding: 0;
}

.menu {
  font-family: 'Commissioner';
  font-size: 24px;
  text-align: right;
  color: rgb(244, 244, 244);
  margin-right: 1vw;
}

.three-lines {
  margin: 0;
}

img {
  width: 8vw;
  margin: 0;
  padding: 0;
  align-self: flex-end;
}

#nav-button {
  align-self: flex-end;
  margin-left: auto;
  border: none;
  background-color: rgba(250, 235, 215, 0);
}

.v-enter-active {
  transition: opacity 0.3s ease;
}

.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>