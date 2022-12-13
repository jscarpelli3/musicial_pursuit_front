<template>
  <div>
    <div class="main">
      <div class="greeting">
        <h1>RockDog Trivia!</h1>
        <h4>A place for competative trivia nerds<br> and rock music enthusiasts</h4>
      </div>
      <div class="login">
        <LoginPage :handle="handle" :password="password" @handleFormChange="handleFormChange"
          @handleLoginSubmit="handleLoginSubmit" />
      </div>
      <h3 v-if="login_fail">Login Failed</h3>
      <h3>Top10!</h3>
      <div class="top-10">
        <table class="leader-table">
          <thead class="leader-table-head">
            <tr>
              <th>Handle</th>
              <th></th>
              <th>TopScore</th>
            </tr>
          </thead>
          <tbody class="leader-table-body" :key="leader.id" v-for="leader in leaders">
            <td>{{ leader.handle }}</td>
            <td class="dash">-</td>
            <td>{{ leader.total_score }}</td>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import Dashboard from './Dashboard.vue'
import LoginPage from './LoginPage.vue'
import axios from 'axios'
import { LoginUser } from '@/services/Auth';
// import { LoginUser, CheckSession, RegisterUser } from '@/services/Auth';
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: "MainPage",
  data: () => ({
    handle: '',
    password: '',
    current_user: {},
    leaders: [],
    login_fail: false
  }),
  mounted() {
    this.getLeaderBoard();
  },
  methods: {
    async getLeaderBoard() {
      const res = await axios.get(`http://localhost:3001/api/user/users`);
      let data = res.data
      let sorted_data = data.sort(({ total_score: a }, { total_score: b }) => b - a)
      let top_ten = []
      for (let i = 0; i < 10; i++) {
        top_ten.push(sorted_data[i])
      }
      this.leaders = top_ten
    },
    handleFormChange(name, value) {
      this[name] = value
    },
    async handleLoginSubmit() {
      const payload = await LoginUser(this.handle, this.password)
      console.log(payload)
      if (payload) {
        this.$emit('setUser', payload)
        this.current_user = payload
        this.handle = ''
        this.password = ''
        this.$router.push(`/dashboard`)
      } else {
        this.login_fail = true
        this.handle = ''
        this.password = ''
        alert('Login Failed')
        this.login_fail = false
      }
    }
  },
  components: { LoginPage }
}
</script>

<style>
.top-10 {
  display: flex;
  justify-content: center;
  text-align: left;
}

.dash {
  text-align: center;
  padding: 0 4vw;
}

table {
  background-color: rgba(33, 51, 67, 0.529);
  /* border: 1px solid black; */
  box-shadow: 8px 8px 2px 1px rgba(97, 97, 97, 0.2);
  border-radius: 3px;
  padding: 2vh;
}

th {
  border-bottom: 1px solid black;
}
</style>