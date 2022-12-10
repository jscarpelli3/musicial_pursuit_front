<template>
  <div>
    <div class="main">
      <div class="greeting">
        <h1>RockDog Trivia.</h1>
        <h5>A place for competative trivia nerds and rock enthusiasts</h5>
      </div>
      <div class="login">
        <LoginPage :handle="handle" :password="password" @handleFormChange="handleFormChange"
          @handleLoginSubmit="handleLoginSubmit" />
      </div>
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
      <UserLanding />
    </div>
  </div>
</template>

<script>
import UserLanding from './UserLanding.vue'
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
    user: {},
    leaders: []
  }),
  mounted() {
    this.getLeaderBoard();
  },
  methods: {
    async getLeaderBoard() {
      const res = await axios.get(`http://localhost:3001/api/user`);
      let data = res.data
      let sorted_data = data.sort(({ total_score: a }, { total_score: b }) => b - a)
      console.log(sorted_data)
      let top_ten = []
      for (let i = 0; i < 10; i++) {
        top_ten.push(sorted_data[i])
      }
      this.leaders = top_ten
      console.log(this.leaders)
    },
    handleFormChange(name, value) {
      this[name] = value
    },
    async handleLoginSubmit() {
      console.log('blow me')
      const payload = await LoginUser(this.handle, this.password)
      this.user = payload
      this.handle = ''
      this.password = ''

    }
    // handleChange() {
    //   this[e.target.name] = e.target.value
    // },
    // handleSubmit(e) {
    //   e.preventDefault()
    //   alert('Form Submitted')
    //   this.handle = ''
    //   this.password = ''
    // }
    // async getSearchResults(e) {
    //   e.preventDefault();
    //   const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${this.searchQuery}`);
    //   this.searchResults = res.data.results;
    //   console.log(this.searchResults);
    //   if (this.searchResults) {
    //     this.searched = true
    //   }
    //   console.log(res)
    // },
    // handleChange(event) {
    //   this.searchQuery = event.target.value
    //   console.log(event);
    // },
    // selectGame(gameId) {
    //   this.$router.push(`/details/${gameId}`)
    //   console.log(gameId);
    // },
    // selectGenre(genreId) {
    //   this.$router.push(`/genre/${genreId}`)
    //   console.log(genreId);
    // }
  },
  components: { LoginPage, UserLanding, }
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
  border: 1px solid black;
  box-shadow: 8px 8px 2px 1px rgba(97, 97, 97, 0.2);
}

th {
  border-bottom: 1px solid black;
}
</style>