<template>
  <div>
    <form v-on:submit="handleSubmit">
      <div class="login-form">
        <div class="login-inputs">
          <input placeholder="enter your handle" @input="handleChange" name="handle" type="text" /><br />
          <input placeholder="enter your password" @input="handleChange" name="password" type="password" /><br />
        </div>
        <div class="login-button">
          <button id="login-button" :disabled="!handle || !password"><img
              src="../assets/horns.png" /><br />login</button>
        </div>
      </div>
    </form>
    <div>
      <p>to login:<br /><b>handle:</b> admin <br /><b>password:</b> admin </p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'LoginPage',
  props: {
    handle: String,
    password: String,
  },
  data: () => ({
  }),
  components: {},
  methods: {
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
  border: 1px solid white;
  border-radius: 2px;
  margin: 1vh;
}

#login-button {
  box-shadow: 3px 3px 2px 1px rgba(97, 97, 97, 0.2);
  border: 1px solid rgb(170, 170, 170);
  border-radius: 4px;
  color: black;
  width: 18vw;
  height: 8vh;
}

button {
  font-family: Commissioner;
}
</style>