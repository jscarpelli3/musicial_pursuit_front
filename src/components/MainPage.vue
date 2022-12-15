<template>
  <div>
    <div class="main">
      <div class="greeting">
        <h1 class="title">RockDog Trivia!</h1>
        <h4>A place for competative trivia nerds<br> and rock music enthusiasts</h4>
      </div>
      <div class="login">
        <LoginPage :handle="handle" :password="password" @handleFormChange="handleFormChange"
          @handleLoginSubmit="handleLoginSubmit" />
      </div>
      <h3 v-if="login_fail">Login Failed</h3>
      <div class="table-container">
        <h3 class="table-head-title">Top 10 Players!</h3>
        <div class="top-10">
          <table class="leader-table">
            <thead class="leader-table-head">
              <tr>
                <th>Handle</th>
                <!-- <th></th> -->
                <th>TopScore</th>
              </tr>
            </thead>
            <tbody class="leader-table-body" :key="leader.id" v-for="leader in leaders">
              <td>{{ leader.handle }}</td>
              <!-- <td class="dash">-</td> -->
              <td>{{ leader.total_score }}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from './LoginPage.vue'
import axios from 'axios'
import { LoginUser } from '@/services/Auth';
// import { LoginUser, CheckSession, RegisterUser } from '@/services/Auth';


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
      const res = await axios.get(`https://rockdog-trivia-server.herokuapp.com/api/user/users`);
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


.leader-table {
  background-color: rgba(36, 62, 85, 0.529);
  box-shadow: 8px 8px 2px 1px rgba(97, 97, 97, 0.2);
  border-radius: 3px;
  padding: 4vh;
}

th {
  text-align: center;
  background-color: rgba(83, 88, 91, 0.704);
  margin: 0;
}

td {
  background-color: rgba(85, 120, 143, 0.704);
  text-align: center;
  width: 30vw;
}

.table-container {
  box-shadow: 8px 8px 2px 1px rgba(97, 97, 97, 0.348);
  border-radius: 3px;
  background-color: rgba(109, 123, 130, 0.704);
  margin: 7vw;
  padding: 2vh 0;
}

.title {
  font-family: Holtwood One SC;
  color: azure;
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.647);
}

.table-head-title {
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.647);
  margin: 0 0 2vh 0;
}

.login {
  margin-top: 3vh;
}

button {
  font-family: Commissioner;
}
</style>