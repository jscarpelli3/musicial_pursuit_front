<template>
  <div>
    <header>
      <NavHeader />
    </header>
    <div class="main-area">
      <div>
        <img alt="rd-logo" class="rd-logo" src="./assets/RockDog_icn_shdw.png">
      </div>
      <MainPage />
      <router-view :current_user="current_user" :authenticated="authenticated"></router-view>
    </div>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import GameMain from './components/GameMain.vue'
import NavHeader from './components/NavHeader.vue'
import LoggedOut from './components/LoggedOut.vue'

export default {
  name: 'App',
  data: () => ({
    current_user: {},
    authenticated: false
  }),
  components: {
    MainPage, GameMain, NavHeader, LoggedOut
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgb(135, 146, 157)
}

#app {
  font-family: Calistoga;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* VUE green */
  /* color: #2c3e50; */
  color: #d6d6d6;
  /* margin-top: 60px; */
}

.rd-logo {
  width: 80vw;
  padding-top: 8vh;
}

header {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  padding-top: 1vh;
  position: fixed;
  margin-bottom: 3vh;
  background-color: darkslategray;
}

/* .main-area {
  margin-top: 60px;
  margin-top: 5vh;
} */

a {
  color: rgb(25, 25, 25);
  text-decoration: none;
}
</style>
