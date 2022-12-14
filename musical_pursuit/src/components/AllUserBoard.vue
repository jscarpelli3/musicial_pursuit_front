<template>
  <div>
    <h1>The Player Roster</h1>
    <div class="all-users" :key="user.id" v-for="user in users">
      <UserBoardUser :user_id="user_id" :handle="user.handle" :city="user.city" :level="user.current_level"
        :comp_id="user.id" :score="user.total_score" />
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
      const res = await axios.get(`http://localhost:3001/api/user/users`);
      this.users = res.data;
      console.log(this.users)
    }
  },
  components: { UserBoardUser }
}
</script>

<style scoped>

</style>
