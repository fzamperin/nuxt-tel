<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Bem vindo a área administrativa do BliiveTel</h2>
          <h3 class="subtitle has-text-centered">
            Para ter acesso aos logs das consultas é necessário realizar o login digitando seu email e sua senha.
          </h3>
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary is-fullwidth">Log In</button>
            </div>
          </form>
          <div class="notification is-danger" v-if="error">
            <button class="delete" v-on:click="error = null"></button>
            {{error}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push('/logs');
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.columns {
  padding-top: 150px;
}
.notification {
  margin-top: 50px;
}
</style>

