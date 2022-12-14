<template>
  <div>
    <h2>Bark at {{ rec_handle }}</h2>
    <div class="new bark">
      <form>
        <label for="bark">Enter your bark below!</label><br />
        <textarea placeholder="bark" @input="handleChange" name="bark" type="text" rows="8" cols="42" /><br />
      </form>
    </div>
    <button @click="submitBark">Submit & Go Back to Dashboard</button>
  </div>
</template>

<script>
import Client from '../services/api'
export default {
  name: 'NewBark',
  props: {
    user_id: Number
  },
  data: () => ({
    rec_handle: "",
    rec_id: 0,
    bark_txt: ""
  }),
  mounted() {
    this.setRecipient()
  },
  methods: {
    setRecipient() {
      this.rec_handle = this.$route.params.recipientHandle
      this.rec_id = this.$route.params.recipientId
      console.log(this.rec_handle)
      console.log(this.rec_id)
    },
    async submitBark(e) {
      e.preventDefault()
      let newBark = { bark: this.bark_txt, barker: this.user_id, barked: this.rec_id }
      await Client.post(`/bark`, newBark)
      this.$router.push('/dashboard')
    },
    handleChange(e) {
      this.bark_txt = e.target.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  font-family: Commissioner;
  width: 50vw;
  height: 12vh;
  background-color: rgba(227, 247, 247, 0.467);
  border-radius: 8px;
  margin: 1vh 1vw;
  font-size: 3vh;
}
</style>