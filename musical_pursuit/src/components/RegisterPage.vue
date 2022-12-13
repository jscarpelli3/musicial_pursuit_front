<template>
  <div>
    <h2>Register</h2>
    <div class="register-form">
      <form v-if="!registered" v-on:submit="handleRegisterSubmit">
        <div class="register-inputs">
          <input placeholder="create your handle" @input="handleChange" name="handle" type="text" /><br />
          <input placeholder="create your password" @input="handleChange" name="password" type="password" /><br />
          <input placeholder="tell us what city you are from" @input="handleChange" name="city" type="city" /><br />
        </div>
        <div class="register-button">
          <button id="register-button" :disabled="!handle || !password"><img
              src="../assets/paw.png" /><br />Register</button>
        </div>
      </form>
      <div v-if="registered">
        <h2>Thanks for Registering!</h2>
        <router-link to='/'>
          <h3>Head to the homepage, login and start barking!</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RegisterUser } from '@/services/Auth';

export default {
  name: 'RegisterPage',
  data: () => ({
    registered: false,
    handle: '',
    password: '',
    city: ''
  }),
  mounted() {
  },
  methods: {
    toggle() {
      this.registered = !this.registered
    },
    async handleRegisterSubmit(e) {
      e.preventDefault()
      console.log('Register Button')
      await RegisterUser({ handle: this.handle, password: this.password, city: this.city, alltime_level: 1, current_level: 1, high_ses_score: 0, total_score: 0 })
      this.handle = ''
      this.password = ''
      this.city = ''
      this.$router.push(`/`)
    },
    goHome() {

    },
    handleChange(e) {
      this[e.target.name] = e.target.value
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-form {
  text-align: center;
}

button {
  text-align: center;
}
</style>