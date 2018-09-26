<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            Lista de todas as consultas da BliiveTel
          </h1>
          <h2 class="subtitle has-text-centered">
            Aqui é possível visualizar todas as consultas realizadas junto com a data.
          </h2>
        </div>
      </div>
      <div class="column is-2 is-offset-5">
        <button v-on:click="logout()" class="is-primary button is-fullwidth">Logout</button>
      </div>
    </section>
    <TabelaPrecos v-if="$store.state.Logs.length > 0" :Logs="$store.state.Logs"/>
    <div class="notification is-primary has-text-centered" v-if="$store.state.Logs.length === 0">
      Nenhuma consulta foi realizada por algum usuário, é necessário que algum usuário utilize o sistema
      antes de mostrar o log.
    </div>
  </div>
</template>

<script>
import TabelaPrecos from '~/components/TabelaPrecos';

export default {
  components: {
    TabelaPrecos
  },
  middleware: 'auth',
  fetch ({ app, store }) {
    return app.$axios.$get('logs')
    .then(res => {
      store.commit('setLogs', res);
    })
  },
  data() {
    return {
      Logs: []
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding-top: 30px;
}
.notification {
  margin-top: 60px;
}
</style>
