<template>
  <div>
    <h1>The Player Roster</h1>
    <div class="list">
      <div class="all-users" :key="user.id" v-for="user in users">
        <UserBoardUser :user_id="user_id" :handle="user.handle" :city="user.city" :level="user.current_level"
          :comp_id="user.id" :score="user.total_score" />
      </div>
    </div>
  </div>
</template>

<script>
import UserBoardUser from './UserBoardUser.vue';
import axios from 'axios'

export default {
  name: "AllUserBoard",
  props: {
    user_id: Number
  },
  data: () => ({
    users: []
  }),
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const res = await axios.get(`https://rockdog-trivia-server.herokuapp.com/api/user/users`);
      this.users = res.data;
    }
  },
  components: { UserBoardUser }
}
</script>

<style scoped>
/* .all-users {
} */

.list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 2vw
}
</style>
