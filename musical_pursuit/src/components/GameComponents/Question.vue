<template>
  <div>
    <h2>Round {{ roundNum }} </h2>
    <div v-if="show_question" class="printed-question-div">
      <p class="printed-question">{{ question }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    artistAlbumInfo: Object,
    roundNum: Number
  },
  data: () => ({
    round_one: 50,
    round_two: 100,
    round_three: 150,
    question: "",
    cur_answer: "",
    show_question: false
  }),
  mounted() {
    this.createQuestion(4)
  },
  methods: {
    coreectAns(value1, value2) {
      this.$emit('correct', value1, value2)
    },
    incorrectAns() {
      this.$emit('incorrect')
    },
    checkAnswer() {
      console.log('check answer')
    },
    createQuestion(questions) {
      ///establish data for question
      ///generate random numbers to choose data
      let artist = this.artistAlbumInfo.album[0].strArtist
      let albumIdx = Math.floor(Math.random() * this.artistAlbumInfo.album.length)
      let album = this.artistAlbumInfo.album[albumIdx].strAlbum
      let yearInt = this.artistAlbumInfo.album[albumIdx].intYearReleased
      let year = yearInt.toString()
      let questionType = Math.floor(Math.random() * questions)
      ///Determin syntax for question
      if (questionType === 0) {
        this.questions = `What year was their album ${album} released?`
      } else if (questionType === 1) {
        this.question = `What album did ${artist} release in the year ${year}?`
      } else if (questionType === 2) {
        this.question = `Was the album ${album} released as a full album or as a single?`
      } else if (questionType === 3) {
        if (this.artistAlbumInfo.album[albumIdx].strLabel !== null) {
          this.question = `What label was their album ${album} released on?`
        } else {
          this.createQuestion(3)
        }
      }
      if (this.question !== "") {
        this.show_question = true
        this.showQuestion(questionType)
      }
    },
    showQuestion(type) {
      console.log(type)
      console.log(this.question)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>