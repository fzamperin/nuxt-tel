<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Calculadora de preços BliiveTel
          </h1>
          <h2 class="subtitle">
            Faça aqui seu cálculo de forma simples fácil e rápida,
            prezamos pela economia dos nossos clientes e por sua facilidade.
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          <div class="column is-half-mobile">
            <div class="field">
              <label class="label">DDD Origem</label>
              <div class="select">
                <select v-model="Origem">
                  <option selected v-bind:value="null">Escolha o DDD</option>
                  <option v-for="origem in $store.state.Origens" v-bind:value="origem.origem" v-bind:key="origem.origem">{{origem.origem}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column is-half-mobile">
            <label class="label">DDD Destino</label>
              <div class="select">
                <select v-model="Destino">
                  <option selected v-bind:value="null">Escolha o DDD</option>
                  <option v-for="destino in $store.state.Destinos" v-bind:key="destino.destino">{{destino.destino}}</option>
                </select>
              </div>
              <p v-if="$store.state.form.Origem === null" class="help is-success">Preencha primeiramente o DDD de origem</p>
          </div>
          <div class="column is-half-mobile">
            <label class="label">Plano</label>
              <div class="select">
                <select v-model="Plano">
                  <option selected v-bind:value="null">Escolha um plano</option>
                  <option v-for="plano in $store.state.Planos" v-bind:value="plano.id" v-bind:key="plano.id">{{plano.nome}}</option>
                </select>
              </div>
          </div>
          <div class="column is-half-mobile">
            <div class="field">
              <label class="label">Minutos</label>
              <div class="control">
                <input class="input is-expanded" type="number" v-model="minutos">
              </div>
              <p class="help is-success">Insira o valor em minutos</p>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-centered">
          <div class="column is-half-mobile is-6">
            <button class="button is-primary" v-on:click="submit()" :disabled="!$store.state.form.isValid">
              Calcular valor
            </button>
            <div class="notification is-danger" v-if="error_api.message">
              <button class="delete" v-on:click="error_api.message = null"></button>
              {{error_api.message}}
            </div>
          </div>
        </div>
      </div>
    </section>
    <TabelaPrecos v-if="Logs.length > 0" :Logs="Logs"/>
  </div>
</template>

<script>
import TabelaPrecos from '~/components/TabelaPrecos';

export default {
  components: {
    TabelaPrecos
  },
  fetch ({ app, store }) {
    return app.$axios.$get('init')
    .then(res => {
      store.commit('init', res);
    })
  },
  data() {
    return {
      error_api: {
        message: null
      },
      Logs: []
    }
  },
  computed: {
    Origem: {
      get () {
        return this.$store.state.form.Origem;
      },
      set (value) {
        this.$store.commit('setOrigemForm', value);
        this.$store.commit('validateForm');
      }
    },
    Destino: {
      get () {
        return this.$store.state.form.Destino;
      },
      set (value) {
        this.$store.commit('setDestinoForm', value);
        this.$store.commit('validateForm');
      }
    },
    Plano: {
      get () {
        return this.$store.state.form.Plano;
      },
      set (value) {
        this.$store.commit('setPlanoForm', value);
        this.$store.commit('validateForm');
      }
    },
    minutos: {
      get () {
        return this.$store.state.form.minutos;
      },
      set (value) {
        this.$store.commit('setMinutosForm', value);
        this.$store.commit('validateForm');
      }
    }
  },
  methods: {
    submit() {
      this.$axios.$post('log', this.$store.state.form)
      .then(res => {
        this.Logs.push(res);
      })
      .catch(err => {
        this.error_api.message = err.response.data.message;
      })
    }
  }
}
</script>


<style scoped lang="scss">
.hero {
  text-align: center;
  padding-top: 30px;
}
.section {
  .container {
    .columns {
      .column.is-half-mobile {
        .button {
          width: 100%;
        }
        .notification {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
