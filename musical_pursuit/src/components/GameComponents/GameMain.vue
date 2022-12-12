<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: 'GameMain',
  components: {},
  mounted() { },
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
  }

</script>

<style>

</style>