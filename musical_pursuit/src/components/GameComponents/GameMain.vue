<template>
  <div>
    <div v-if="round === 0" class="game-details">
      <h1 class="headline">Get your rock brain ready!</h1>
      <p class="game-ex">RockDog Trivia works in rounds of 3 quetsions.<br />Search a rock or pop artist you think you
        know, then answer 3 questions about their discography. Each question gets you points. If you answer all 3
        correct you will increase your level. </p>
    </div>
    <div v-if="!searched" class="search">
      <form @submit="getAlbums">
        <input placeholder="Search Term" @change="handleChange" :value="searchQuery" name="search" type="text"
          :disabled="search_fail" />
        <button>Search</button>
      </form>
      <div v-if="search_fail">
        <h2>Invaldi Artist Name!</h2>
        <button @click="toggleSearchFail">Click to search again</button>
      </div>
    </div>
    <div v-else class="cur-artist">
      <h2 v-if="round === 0">Get ready to answer questions about {{ searchResults.album[0].strArtist }}!</h2>
      <img class="artist-logo" :src="artist_image_src" /><br />
      <button v-if="round === 0" class="go-btn" @click="start_round">GO!</button>
    </div>
    <div v-if="round === 1" class="round-one-q">
      <Question :user="user" :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect"
        :roundNum="round" :artistStartYr="artist_start_yr" />
    </div>
    <div v-if="round === 2" class="round-two-q">
      <Question :user="user" :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect"
        :roundNum="round" :artistStartYr="artist_start_yr" />
    </div>
    <div v-if="round === 3" class="round-three-q">
      <Question :user="user" :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect"
        :roundNum="round" :artistStartYr="artist_start_yr" />
    </div>
    <div v-if="round === 50" class="round-three-q">
      <h1>You leveled up!</h1>
      <h3>This round you scored {{ ses_score }}!</h3>
      <button @click="this.$router.push(`/dashboard`)">Back To You Dashboard</button>
    </div>
    <div v-if="round === 100" class="round-three-q">
      <h1>Sorry, wrong answer!</h1>
      <h3>You Lose 50 points!</h3>
      <button @click="this.$router.push(`/dashboard`)">Back To You Dashboard</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.VUE_APP_AUDIODB_KEY
import Question from './Question.vue'
import Client from '../../services/api'

export default {
  name: 'GameMain',
  components: { Question },
  props: {
    user: Object
  },
  data: () => ({
    searchQuery: "",
    artist_image_src: "",
    artist_start_yr: "",
    searchResults: {},
    searched: false,
    search_fail: false,
    round: 0,
    ses_score: 0,
    level_up: 0
  }),
  mounted() {
    this.printStats()
  },
  methods: {
    async getAlbums(e) {
      e.preventDefault();
      const res = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/searchalbum.php?s=${this.searchQuery}`);
      console.log(res.data)
      if (res.data.album === null) {
        this.search_fail = true
      } else {
        this.searchResults = res.data;
        this.searched = true
        this.makeImagePath()
      }
    },
    handleChange(event) {
      this.searchQuery = event.target.value
    },
    async makeImagePath() {
      const res = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=${this.searchQuery}`);
      this.artist_start_yr = res.data.artists[0].intFormedYear
      this.artist_image_src = res.data.artists[0].strArtistLogo
    },
    start_round() {
      if (this.round < 3) {
        this.round++
      } else {
        this.round = 50
      }
    },
    correct(points, lvl) {
      this.ses_score += points
      this.level_up += lvl
      this.submit_scores()
      this.start_round()
    },
    incorrect() {
      this.ses_score -= 50
      this.submit_scores()
      this.round = 100
    },
    async submit_scores() {
      const newTotal = parseInt(this.user.total_score) + this.ses_score
      const newLvl = parseInt(this.user.current_level) + this.level_up
      let newAllTime = 3
      let newSesScore = parseInt(this.user.high_ses_score)
      if (parseInt(this.user.alltime_level) < newLvl) {
        console.log(newAllTime)
        newAllTime = newLvl
      }
      if (parseInt(this.user.high_ses_score) < this.ses_score) {
        console.log(newSesScore)
        newSesScore = newTotal
      }
      const newStats = { current_level: newLvl, total_score: newTotal, alltime_level: newAllTime, high_ses_score: newSesScore }
      await Client.put(`/user/${this.user.id}`, newStats)
    },
    printStats() {
      console.log(this.user.high_ses_score)
      console.log(this.user.total_score)
      console.log(this.user.alltime_level)
      console.log(this.user.current_level)
      console.log(this.user.id)
    },
    toggleSearchFail() {
      this.searchQuery = ''
      this.search_fail = false
    }
  }
}

</script>

<style>
.game-details {
  margin: 2vh 4vw;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  border-radius: 10px;
  background-color: rgba(240, 255, 255, 0.195);
  padding: 2vw;
}

.go-btn {
  width: 60vw;
  height: 6vh;
  background-color: rgb(244, 118, 28);
  text-shadow: 2px 1px 3px;
  font-size: 4vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.artist-logo {
  width: 90vw;
}

.cur-artist {
  margin-bottom: 3vh;
}
</style>