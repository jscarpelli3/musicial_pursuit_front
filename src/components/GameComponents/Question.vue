<template>
  <div>
    <h2>Round {{ roundNum }} </h2>
    <div class="game-space">
      <div v-if="show_question" class="printed-question-div">
        <div class="answer-options">
          <p class="printed-question">{{ question }}</p>
          <label v-for="(answer, i) in answers" :key="i" class="ans-choice">
            {{ answer }}<br />
            <input :id="answer" name="choice" type="radio" @input="onChange(answer)" />
          </label>
          <button @click="checkAnswer">Submit Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    // current_user: Object,
    user: Object,
    artistAlbumInfo: Object,
    artistStartYr: String,
    roundNum: Number,
    lvl_up: Number
  },
  data: () => ({
    checked: [],
    answers: [],
    chosen_answer: "",
    pick: [],
    q_type: 0,
    round_one: 50,
    round_two: 100,
    round_three: 150,
    question: "",
    cur_answer: "",
    show_question: false,
    possible_labels: ["Interscope Records", "Capitol Records", "Blood Sweat & Money MG", "Cool Dog Records", "4-AD", "Hyperbole Records", "Flammable Records", "Truth & Lies Records", "Elektra Records", "MetalScope Records", "FreeZone Records", "Fantastic", "Trauma", "Tender Records", "Paramount Records", "Simple Vibes", "Carpathian", "Hubsuscus", "MetalZone", "Pop Magic", "Scraperelli Records", "JJEasy Records", "ATtheTA Music Group", "Hi Im Jeremy Recordings", "Mad Ash Music", "MoMed-Only-Head Records", "SMW Hot-Mic Records", "RyTy Music Group", "JC Endzone Records", "GA Shuld Pay Records", "KustMud Custom Music Group", "Has Read Or Likes To Read Records", "BriLl Style Records", "Kerabatsos Records", "It's Already the 10th Records", "GGP LPs", "Alveal Recordings", "CyberGonzo Music", "K White Records", "Not Steven Records", "TomTomKickSnare Music", "LaSheGone Music"],
    current_labels: [],
    years: [],
    album_titles: [],
    choices_record_labels: [],

  }),
  mounted() {
    this.createQuestion(4)
  },
  methods: {
    onChange(answer) {
      this.chosen_answer = answer
    },
    correctAns(score, lvl) {
      this.$emit('correct', score, lvl)
    },
    incorrectAns() {
      this.$emit('incorrect')
    },
    checkAnswer() {
      let lvl = 0
      let score = 0
      if (this.roundNum === 1) {
        score = this.round_one
      } else if (this.roundNum === 2) {
        score = this.round_two
      } else if (this.roundNum === 3) {
        lvl = 1
        score = this.round_three
      }
      if (this.cur_answer === this.chosen_answer) {
        this.correctAns(score, lvl)
      } else {
        this.incorrectAns()
      }
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
        this.question = `What year was their album "${album}" released?`
      } else if (questionType === 1) {
        this.question = `What album did ${artist} release in the year ${year}?`
      } else if (questionType === 2) {
        this.question = `In what format was the album "${album}" released?`
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
      ///ALBUM YEARS QUESTION
      if (type === 0) {
        this.answers = []
        let artistStart = parseInt(this.artistStartYr)
        let releaseYr = parseInt(this.artistAlbumInfo.album[albumIndex].intYearReleased)
        let years = [releaseYr]
        this.cur_answer = releaseYr
        let yrDiff = 2022 - artistStart
        const randYear = () => {
          let num = Math.floor(Math.random() * yrDiff)
          if (years.includes(num)) {
            randYear()
          } else {
            years.push(num + artistStart)
          }
        }
        for (let i = 0; i < 3; i++) {
          randYear()
        }
        for (let i = 0; i < 4; i++) {
          let num = Math.floor(Math.random() * years.length)
          this.answers.push(years[num])
          years.splice(num, 1)
        }
        ///ALBUM TITLES QUESTION
      } else if (type === 1) {
        this.answers = []
        ///transfer album info from data to function-local
        let albums = this.artistAlbumInfo.album
        ///create temp array for 4 album titles
        let albumTitles = []
        ///include the correct answer
        albumTitles.push(albums[albumIndex].strAlbum)
        ///set the answer in data
        this.cur_answer = albums[albumIndex].strAlbum
        ///remove answer from all available artist albums
        albums.splice(albumIndex, 1)
        ///do a loop to add a random album to the temp albums array
        for (let i = 0; i < 3; i++) {
          let num = Math.floor(Math.random() * albums.length)
          albumTitles.push(albums[num].strAlbum)
          albums.splice(num, 1)
        }
        ///randomly send one of the 4 album titles to the answer array
        for (let i = 0; i < 4; i++) {
          let num = Math.floor(Math.random() * albumTitles.length)
          this.answers.push(albumTitles[num])
          albumTitles.splice(num, 1)
        }
        ///ALBUM SINGLE QUESTION
      } else if (type === 2) {
        this.answers = []
        ///simply set the current answer to the release format in the chosen album record
        this.cur_answer = this.artistAlbumInfo.album[albumIndex].strReleaseFormat
        this.answers.push("Single")
        this.answers.push("Album")
        this.answers.push("Other")
        this.answers.push("Compilation")
        ///ALBUM LABEL QUESTION
      } else if (type === 3) {
        this.answers = []
        ///set answer
        this.cur_answer = this.artistAlbumInfo.album[albumIndex].strLabel
        ///add answer to answer choices
        let pre_current_labels = []
        pre_current_labels.push(this.artistAlbumInfo.album[albumIndex].strLabel)
        ///add three wrong answers
        for (let i = 0; i < 3; i++) {
          let num = Math.floor(Math.random() * this.possible_labels.length - 1)
          pre_current_labels.push(this.possible_labels[num])
          this.possible_labels.splice(num, 1)
        }
        ///randomly choose from the previous array to place in final answers array
        for (let i = 0; i < 4; i++) {
          let num = Math.floor(Math.random() * pre_current_labels.length)
          this.answers.push(pre_current_labels[num])
          pre_current_labels.splice(num, 1)
        }
      }
      this.q_type = type
    }
  }
}
</script>

<style scoped>
.game-space {
  display: flex;
  justify-content: center;
  margin: 2vw;
}

.answer-options>input:checked {

  background-color: rgb(146, 146, 146);
}

.question,
.answer-options {
  display: grid;
  grid-template-columns: 1fr;

  background-color: rgba(105, 105, 105, 0.247);
  padding: 1vh 2vw 1vh 2vw;
  border-radius: 8px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
}

button {
  background-color: rgb(244, 118, 28);
  border-radius: 4px;
  height: 4vh;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.347);
  margin: 2vh
}
</style>