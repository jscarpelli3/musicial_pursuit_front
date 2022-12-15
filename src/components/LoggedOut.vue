<template>
  <div>
    <h2>Logged Out</h2>
    <router-link to='/'>Back to Main Page</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoggedOut',
  props: {},
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      this.$emit('handleLogOut')
    }
  }
}
</script>

<style scoped>

</style>