<template>
  <div class="nav-div">
    <div class="three-lines">
      <img src="../assets/menu-button-of-three-horizontal-lines.png" />
    </div>
  </div>
</template>


<script>
// import axios from 'axios'
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: "NavHeader",
  data: () => ({
    current_user: ""
  }),
  mounted() { },
  methods: {},
  components: {}
}
</script>


<style>
/* .nav-div {
  display: flex;
  justify-content: space-around;
} */

.three-lines {
  margin: 0;
}

img {
  width: 8vw;
}
</style>