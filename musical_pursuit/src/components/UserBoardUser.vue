<template>
  <div class="user-table">
    <p>
      <b>Name:</b>{{ handle }}
    </p>
    <p>
      <b>City:</b>{{ city }}
    </p>
    <p>
      <b>Level:</b>{{ level }}
    </p>
    <p>
      <b>Score:</b>{{ score }}
    </p>
    <div>
      <button class="add-btn" @click="addToList">Add to Watchlist</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'UserBoardUSer',
  props: {
    handle: String,
    city: String,
    level: Number,
    score: Number,
    comp_id: Number,
    user_id: Number
  },
  data: () => {

  },
  method: {
    addToList() {
      console.log('adding!')

      this.$router.push(`/dashboard`)
    }
  }
}
</script>


<style scoped>
.user-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

/* .user {

} */
</style>