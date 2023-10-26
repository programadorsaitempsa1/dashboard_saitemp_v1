<template>
  <div class="container">
    <h2>Registro de supervisión</h2>
    <Tabla :datos="datos" :tabla="tabla" :userlogued="userlogued" :endpoint="endpoint" :listas="listas"
      :endpointexport="endpointexport" />
  </div>
</template>
<script>
import Tabla from './Tabla.vue'
import axios from 'axios'
import { Token } from '../Mixins/Token.js';
export default {

  components: {
    Tabla
  },
  mixins: [Token],
  props: {
    userlogued: {}
  },
  data() {
    return {
      show_table: false,
      datos: [],
      endpoint: 'formulariosupervision',
      endpointexport: 'exportaformulariocliente',
      URL_API: process.env.VUE_APP_URL_API,
      tabla: [
        { nombre: "#", orden: "DESC" },
        { nombre: "Nombre / Razón social", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Nit", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Dirección", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Ciudad", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Departamento", orden: "DESC", tipo: "texto", calculado: 'true' },
        { nombre: "Descripción", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Supervisor", orden: "DESC", tipo: "texto", calculado: 'false' },
      ],
      ejecutivos_comerciales: [],
      listas: [],
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.urlExterna()
    this.getItems()
    this.llenarLista()
    this.getEjecutivosComerciales()
  },
  methods: {
    llenarLista() {
      this.tabla.forEach((item) => {
        if (item.calculado == 'false') {
          this.listas.push([])
        }
      })
      this.listas.push([])
    },
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/formulariosupervision", config)
        .then(function (result) {
          self.datos = result;
        });
    },
    getEjecutivosComerciales() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ejecutivocomerciallista", config)
        .then(function (result) {
          self.ejecutivos_comerciales = result.data
          self.listas.splice(4, 0, result.data)
        });
    },
  }
};
</script>
<style >
h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>