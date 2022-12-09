<template>
  <img alt="rd-logo" class="rd-logo" src="./assets/RockDog_icn.png">
  <Main msg="RockDog Trivia." />
  <GameMain />
</template>

<script>
import Main from './components/MainPage.vue'
import GameMain from './components/GameMain.vue'

export default {
  name: 'App',
  components: {
    Main, GameMain
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

#app {
  font-family: Calistoga;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* VUE green */
  /* color: #2c3e50; */
  color: #000000;
  margin-top: 60px;
}

.rd-logo {
  width: 80vw;
  shape-image-threshold: initial;
}
</style>
