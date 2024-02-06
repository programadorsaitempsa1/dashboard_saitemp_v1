<template>
  <div class="container">
    <h2>Debida diligencia clientes</h2>
    <Tabla :datos="datos" :tabla="tabla" :userlogued="userlogued" :endpoint="endpoint" :listas="listas"
      :endpointexport="endpointexport" :estados_firma="estados_firma" @actualizaEstado="actualizaEstado" />
  </div>
</template>
<script>
import Tabla from './Tabla.vue'
import axios from 'axios'
import { Token } from '../Mixins/Token.js'
import { Alerts } from '../Mixins/Alerts.js';
export default {

  components: {
    Tabla
  },
  mixins: [Token, Alerts],
  props: {
    userlogued: {}
  },
  data() {
    return {
      show_table: false,
      datos: [],
      endpoint: 'consultaformulariocliente',
      endpointexport: 'exportaformulariocliente',
      URL_API: process.env.VUE_APP_URL_API,
      tabla: [
        { nombre: "#", orden: "DESC" },
        { nombre: "Radicado", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Nombre / Razón social", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Nit", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Nombre del comercial", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Teléfono cliente", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Fecha registro", orden: "DESC", tipo: "fecha", calculado: 'false' },
        { nombre: "Estado contrato", orden: "DESC", tipo: "texto", calculado: 'true' },
      ],
      ejecutivos_comerciales: [],
      listas: [],
      estados_firma: [],
      first_page_url:'',
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.getEstadosFirma()
    this.getItems()
    this.llenarLista()
    this.getEjecutivosComerciales()
  },
  methods: {
    actualizaEstado(item_id, estado, currenturl = null) {
      let self = this;
      let config = this.configHeader();
      axios
        .post(self.URL_API + "api/v1/actualizaestadofirma/" + item_id + '/' + estado, config)
        .then(function (result) {
          self.estadoActualizado(currenturl)
          self.showAlert(result.data.message, result.data.status);
        });
    },
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
        .get(self.URL_API + "api/v1/consultaformulariocliente/" + 10, config)
        .then(function (result) {
          self.first_page_url = result.data.first_page_url.replace("\"");
          console.log( self.first_page_url)
          self.datos = result;
        });
    },
    estadoActualizado(currentUrl) {
      if(currentUrl == null || currentUrl == ''){
        currentUrl = this.first_page_url.replace("\"");
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(currentUrl, config)
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
    getEstadosFirma() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosfirma", config)
        .then(function (result) {
          self.estados_firma = result.data
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