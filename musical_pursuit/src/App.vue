<template>
  <div>
    <header>
      <NavHeader />
    </header>
    <img alt="rd-logo" class="rd-logo" src="./assets/RockDog_icn_shdw.png">
    <MainPage />
    <GameMain />
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import GameMain from './components/GameMain.vue'
import NavHeader from './components/NavHeader.vue'

export default {
  name: 'App',
  components: {
    MainPage, GameMain, NavHeader
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgb(131, 131, 131);
}

#app {
  font-family: Calistoga;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* VUE green */
  /* color: #2c3e50; */
  color: #000000;
  /* margin-top: 60px; */
}

.rd-logo {
  width: 80vw;
  shape-image-threshold: initial;
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
</style>
