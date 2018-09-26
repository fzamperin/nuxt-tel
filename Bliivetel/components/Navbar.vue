<template>
  <div class="container">
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="logo2.png" alt="Oniq Education: Sua escola de Habilidades Digitais">
        </a>
        <a class="navbar-item" href="/">
          Calculadora de preços
        </a>
        <button class="button navbar-burger" @click="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" :class="{'is-active': navIsActive}" @click="toggleMenu()">
        <div class="navbar-end">
          <nuxt-link class="navbar-item is-uppercase" to="/">Início</nuxt-link>
          <nuxt-link class="navbar-item is-uppercase" to="/logs">Administrativo</nuxt-link>
        </div>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navIsActive: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.navIsActive = !this.navIsActive;
    }
  }
};
</script>

<style scoped lang="scss">
.button.navbar-burger {
  border: none;
  background-color: #32CFB2;
}
</style>
