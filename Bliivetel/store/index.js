import Vuex from 'vuex';

const store = () => new Vuex.Store({
  strict: true,
  state: {
    form: {
      Origem: null,
      Destino: null,
      Plano: null,
      minutos: null,
      isValid: false
    },
    Origens: null,
    Planos: null,
    Destinos: null,
    Origens_destino: null,
    Logs: []
  },
  mutations: {
    init(state, data) {
      state.Origens = data.Origens;
      state.Origens_destino = data.Origens_destino;
      state.Planos = data.Planos;
    },
    setOrigemForm(state, Origem) {
      state.form.Origem = Origem;
      state.Destinos = state.Origens_destino.filter(Origen_destino => state.form.Origem === Origen_destino.origem);
      state.form.Destino = null;
    },
    setDestinoForm(state, Destino) {
      state.form.Destino = Destino
    },
    setMinutosForm(state, minutos) {
      state.form.minutos = minutos;
    },
    setPlanoForm(state, Plano) {
      state.form.Plano = Plano;
    },
    validateForm(state) {
      let isValid = true;
      if(!state.form.Destino) {
        isValid = false;
      }
      if(!state.form.Origem) {
        isValid = false;
      }
      if(!state.form.Plano) {
        isValid = false;
      }
      if(!state.form.minutos || state.form.minutos <= 0) {
        isValid = false;
      }
      state.form.isValid = isValid;
    },
    setLogs(state, Logs) {
      state.Logs = Logs;
    }
  }
})

export default store
