<template>
  <div>
    <div class="main">
      <div class="greeting">
        <h1>RockDog Trivia.</h1>
      </div>
      <div class="login">
        <LoginPage />
        <UserLanding />
      </div>
    </div>
    <!-- <div class="search">
      <form @submit="getSearchResults">
        <input placeholder="Search Term" @change="handleChange" :value="searchQuery" name="search" type="text" />
        <button>Search</button>
      </form>
      <h2>Search Results</h2>
      <section class="search-results container-grid">
        <div :key="game.id" v-for="game in searchResults">
          <GameCard @click="selectGame(game.id)" :image="game.background_image" :name="game.name" />
        </div>
      </section>
    </div>

    <div v-if="!this.searched" class="genres">
      <h2>Genres</h2>
      <section class="container-grid">
        <div :key="genre.id" v-for="genre in genres">
          <GenreCard @click="selectGenre(genre.id)" :genre_image="genre.image_background" :genre_name="genre.name" />
        </div>
      </section>
    </div> -->

  </div>
</template>

<script>
import UserLanding from './UserLanding.vue'
import LoginPage from './LoginPage.vue'
import axios from 'axios'
const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: "HomePage",
  data: () => ({
    genres: [],
    searchQuery: "",
    searchResults: [],
    searched: false
  }),
  mounted() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const res = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=metallica`);
      this.genres = res;
      console.log(res.data)
    }
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
  components: { LoginPage, UserLanding }
}
</script>