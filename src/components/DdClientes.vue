<template>
  <div class="container">
    <h2>Debida diligencia clientes</h2>
    <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" />
  </div>
</template>
<script>
import Tabla from './Tabla.vue'
import axios from 'axios'
export default {

  components: {
    Tabla
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      show_table: false,
      datos: [],
      endpoint: '',
      URL_API: process.env.VUE_APP_URL_API,
      tabla: [
        { nombre: "#", orden: "DESC" },
        { nombre: "Nombre / Razón social", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Nombre del comercial", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Teléfono cliente", orden: "DESC", tipo: "texto", calculado: 'false' },
        { nombre: "Fecha registro", orden: "DESC", tipo: "texto", calculado: 'false' },
      ],
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/consultaformulariocliente/" + 10, config)
        .then(function (result) {
          self.datos = result;
        });
    },
    configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },
  }
};
</script>
<style scoped></style>