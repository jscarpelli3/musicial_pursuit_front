<template>
  <div>
    <h1>The Player Roster</h1>
    <div class="all-users" :key="user.id" v-for="user in users"></div>
    <UserBoardUser :handle="user.handle" :city="user.city" :level="user.current_level" :comp_id="user.id"
      :score="user.total_score" />
  </div>
</template>

<script>
import UserBoardUser from './UserBoardUser.vue';
import axios from 'axios'

export default {
  name: "AllUserBoard",
  data: () => ({
    users: []
  }),
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const res = await axios.get(`http://localhost:3001/api/user/users`);
      this.users = res;
    }
  },
  components: { UserBoardUser }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
