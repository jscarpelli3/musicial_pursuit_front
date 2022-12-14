<template>
  <div>
    <header>
      <NavHeader :current_user="current_user" />
    </header>
    <div class="main-area">
      <div>
        <img alt="rd-logo" class="rd-logo" src="./assets/RockDog_icn_shdw.png">
      </div>
      <router-view :user="current_user" :user_handle="current_user.handle" :user_id="current_user.id"
        :user_total="current_user.total_score" :authenticated="authenticated" @handleLogOut="handleLogOut"
        @setUser="setUser"></router-view>
    </div>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue'

export default {
  name: 'App',
  data: () => ({
    current_user: {},
    authenticated: false
  }),
  components: {
    NavHeader
  },
  methods: {
    handleLogOut() {
      this.current_user = {}
      this.authenticated = false
      localStorage.clear()
    },
    setUser(payload) {
      this.current_user = payload
      console.log(this.current_user)
      this.authenticated = true
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(161, 182, 204)
}

#app {
  /* font-family: Calistoga; */
  /* font-family: DM Serif Display; */
  /* font-family: Commissioner; */
  /* font-family: Gowun Dodum; */
  font-family: Lexend;
  /* font-family: RocknRoll One; */
  /* font-family: Vollkorn; */
  /* font-family: Wallpoet; */
  /* font-family: Holtwood One SC; */
  /* font-family: Lobster; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #efefef;

}

.rd-logo {
  width: 80vw;
  padding-top: 8vh;
}

header {
  width: 100vw;
  padding-top: 1vh;
  position: fixed;
  margin-bottom: 3vh;
  background-color: darkslategray;
}

a {
  color: rgb(25, 25, 25);
  text-decoration: none;
}
</style>
