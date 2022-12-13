<template>
  <div>
    <h2>Round {{ roundNum }} </h2>
    <div v-if="show_question" class="printed-question-div">
      <p class="printed-question">{{ question }}</p>
      <div v-if="q_type === 0">
        <form>
          <label>{{}}</label>
          <input type="radio" v-model="pick" :value="first" />
          <label></label>
          <input type="radio" v-model="pick" :value="first" />
          <label></label>
          <input type="radio" v-model="pick" :value="first" />
          <label></label>
          <input type="radio" v-model="pick" :value="first" />
        </form>
      </div>
      <div v-if="q_type === 1">
        <form>
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
        </form>
      </div>
      <div v-if="q_type === 2">
        <form>
          <input type="radio" v-model="pick" :value="Single" />
          <input type="radio" v-model="pick" :value="Album" />
          <input type="radio" v-model="pick" :value="Neither" />
        </form>
      </div>
      <div v-if="q_type === 3">
        <form>
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
          <input type="radio" v-model="pick" :value="first" />
        </form>
      </div>

    </div>
  </div>
</template>

<script>
// import { number } from 'prop-types'

export default {
  name: 'QuestionCard',
  props: {
    artistAlbumInfo: Object,
    artistStartYr: String,
    roundNum: Number
  },
  data: () => ({
    q_type: 9,
    round_one: 50,
    round_two: 100,
    round_three: 150,
    question: "",
    cur_answer: "",
    show_question: false,
    record_labels: ["Interscope Records", "Capitol Records", "Cool Dog Records", "4-AD", "Hyperbole Records", "Flammable Records", "Truth & Lies Records", "Elektra Records", "MetalScope Records", "FreeZone Records"],
    years: [],
    album_titles: [],
    choices_record_labels: [],

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
      ///artist name
      let artist = this.artistAlbumInfo.album[0].strArtist
      ///album at random
      let albumIdx = Math.floor(Math.random() * this.artistAlbumInfo.album.length)
      let album = this.artistAlbumInfo.album[albumIdx].strAlbum
      ///release year of that album
      let yearInt = this.artistAlbumInfo.album[albumIdx].intYearReleased
      let year = yearInt.toString()
      ///what type of question? 0,1,2,3
      let questionType = Math.floor(Math.random() * questions)
      ///Determin syntax for question
      if (questionType === 0) {
        this.questions = `What year was their album "${album}" released?`
      } else if (questionType === 1) {
        this.question = `What album did ${artist} release in the year ${year}?`
      } else if (questionType === 2) {
        this.question = `Was the album "${album}"" released as a full album or as a single?`
      } else if (questionType === 3) {
        if (this.artistAlbumInfo.album[albumIdx].strLabel !== null) {
          this.question = `What label was their album "${album}" released on?`
        } else {
          this.createQuestion(3)
        }
      }
      if (this.question !== "") {
        this.show_question = true
        this.showQuestion(questionType, albumIdx)
      }
    },
    showQuestion(type, albumIndex) {
      console.log(albumIndex)
      console.log(type)
      if (type === 0) {
        let artistStart = parseInt(this.artistStartYr)
        let years = [artistStart]
        let yrDiff = 2022 - artistStart
        const randYear = () => {
          let num = Math.floor(Math.random() * yrDiff)
          if (years.includes(num)) {
            randYear()
          } else {
            years.push(num)
          }
        }
        for (let i = 0; i < 3; i++) {
          randYear()
        }
        for (let i = 0; i < 4; i++) {
          let num = Math.floor(Math.random() * years.length)
          this.years.push(years[num])
          years.splice(num, 1)
        }
        console.log(years)
      } else if (type === 1) {
        console.log('question type 1')
      } else if (type === 2) {
        console.log('question type 2')
      } else if (type === 3) {
        console.log('question type 3')
      }
      this.q_type = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>