<template>
  <div class="wrapper">
    <table class="table is-fullwidth is-hoverable is-narrow">
    <thead>
      <tr>
        <th>Data/Hora</th>
        <th>Origem</th>
        <th>Destino</th>
        <th>Tempo</th>
        <th>Plano FaleMais</th>
        <th>Com FaleMais</th>
        <th>Sem FaleMais</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log of Logs" v-bind:key="log.id">
        <td>{{moment(log.createdAt).format('DD/MM/YYYY HH:mm:ss')}}</td>
        <td>{{log.Origem_destino.origem}}</td>
        <td>{{log.Origem_destino.destino}}</td>
        <td>{{log.minutos}}</td>
        <td>{{log.Plano.nome}}</td>
        <td>{{formatter.format(calculaValorComPlano(log))}}</td>
        <td>{{formatter.format(calculaValorSemPlano(log))}}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['Logs'],
  data() {
    return {
      moment: moment,
      formatter: Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
    }
  },
  methods: {
    calculaValorComPlano(Log) {
      let minutos = Log.minutos - Log.Plano.minutos;
      if(minutos > 0) {
        return minutos *= Log.Origem_destino.valorminuto * 1.1;
      }
      else {
        return 0;
      }
    },
    calculaValorSemPlano(Log) {
      return Log.minutos * Log.Origem_destino.valorminuto;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-x: auto;
}
.title.is-5 {
  padding-top: 50px;
}
</style>

