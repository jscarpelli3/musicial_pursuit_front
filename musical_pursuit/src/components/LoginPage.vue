<template>
  <div>
    <form v-on:submit="handleSubmit">
      <div class="login-form">
        <div class="login-inputs">
          <input placeholder="enter your handle" @input="handleChange" name="handle" type="text" /><br />
          <input placeholder="enter your password" @input="handleChange" name="password" type="password" /><br />
        </div>
        <div class="login-button">
          <button :disabled="!handle || !password"><img src="../assets/paw.png" /><br />login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
// const API_KEY = process.env.VUE_APP_AUDIODB_KEY

export default {
  name: 'LoginPage',
  data: () => ({
    handle: String,
    password: String,
  }),
  components: {},
  methods: {
    // handleChange(e) {
    //   this.loginInfo = { [e.target.name]: e.target.value }
    //   console.log(event);
    // }
    handleChange(e) {
      this.$emit('handleFormChange', e.target.name, e.target.value)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.$emit('handleLoginSubmit')
    }
  }
}
</script>

<style>
.login-form {
  display: grid;
  grid-template-columns: 1fr/1fr;
}

.login-input {
  grid-column: 1/2;
  display: flex;
  justify-content: center;
}

.login-button {
  text-align: left;
  grid-column: 2/3;
  align-self: center;
}

input {
  width: 47vw;
  height: 3vh;
  box-shadow: 3px 3px 2px 1px rgba(97, 97, 97, 0.2);
  border-radius: 3px;
}

button {
  box-shadow: 3px 3px 2px 1px rgba(97, 97, 97, 0.2);
}
</style>