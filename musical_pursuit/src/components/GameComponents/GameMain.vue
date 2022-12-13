<template>
  <div>
    <div v-if="round === 0" class="game-details">
      <h1 class="headline">Get your rock brain ready!</h1>
      <p class="game-ex">RockDog Trivia works in rounds of 3 quetsions.<br />Search an rock or pop artist you think you
        know, then answer 3 questions about their discography. Each question gets you points. If you answer all 3
        correct you will increase your level. </p>
    </div>
    <div v-if="!searched" class="search">
      <form @submit="getAlbums">
        <input placeholder="Search Term" @change="handleChange" :value="searchQuery" name="search" type="text" />
        <button>Search</button>
      </form>
    </div>
    <div v-else class="cur-artist">
      <h2 v-if="round === 0">Get ready to answer questions about {{ searchResults.album[0].strArtist }}!</h2>
      <img class="artist-logo" :src="artist_image_src" /><br />
      <button v-if="round === 0" class="go-btn" @click="start_round">GO!</button>
    </div>
    <div v-if="round === 1" class="round-one-q">
      <Question :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect" :roundNum="round"
        :artistStartYr="artist_start_yr" />
    </div>
    <div v-if="round === 2" class="round-two-q">
      <Question :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect" :roundNum="round"
        :artistStartYr="artist_start_yr" />
    </div>
    <div v-if="round === 3" class="round-three-q">
      <Question :artistAlbumInfo="searchResults" @correct="correct" @incorrect="incorrect" :roundNum="round"
        :artistStartYr="artist_start_yr" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.VUE_APP_AUDIODB_KEY
import Question from './Question.vue'

export default {
  name: 'GameMain',
  components: { Question },
  mounted() { },
  props: [],
  data: () => ({
    searchQuery: "",
    artist_image_src: "",
    artist_start_yr: "",
    searchResults: {},
    searched: false,
    round: 0,
    ses_score: 0,
    level_up: 0
  }),
  methods: {
    async getAlbums(e) {
      e.preventDefault();
      const res = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/searchalbum.php?s=${this.searchQuery}`);
      console.log(res.data)
      this.searchResults = res.data;
      this.searched = true
      this.makeImagePath()
    },
    handleChange(event) {
      this.searchQuery = event.target.value
    },
    async makeImagePath() {
      const res = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=${this.searchQuery}`);
      console.log(res.data)
      console.log('making image path')
      this.artist_start_yr = res.data.artists[0].intFormedYear
      this.artist_image_src = res.data.artists[0].strArtistLogo
      console.log('placehold console log')
    },
    start_round() {
      this.round++
    },
    correct(points, lvl) {
      this.ses_score += points
      this.level_up += lvl
    },
    incorrect() {

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
</style>