<template>
  <div class="container">
    <Loading :loading="loading" />
    <NotificacionesSocket />
    <h2>Debida diligencia clientes</h2>
    <Tabla
      :datos="datos"
      :tabla="tabla"
      :userlogued="userlogued"
      :endpoint="endpoint"
      :listas="listas"
      :endpointexport="endpointexport"
      :estados_firma="estados_firma"
      @actualizaResponsableDD="actualizaResponsableDD"
      @actualizaEstadoPadre="actualizaEstado"
    />
  </div>
</template>
<script>
import axios from "axios";
import Tabla from "./Tabla.vue";
import Loading from "./Loading.vue";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import NotificacionesSocket from "./NotificacionSocket.vue";
export default {
  components: {
    Loading,
    Tabla,
    NotificacionesSocket,
  },
  mixins: [Token, Alerts],
  props: {
    userlogued: {},
  },
  data() {
    return {
      loading: false,
      show_table: false,
      datos: [],
      endpoint: "consultaformulariocliente",
      endpointexport: "exportaformulariocliente",
      URL_API: process.env.VUE_APP_URL_API,
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Radicado",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre / Razón social",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Identificacion",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Nit", orden: "DESC", tipo: "texto", calculado: "false" },
        {
          nombre: "Nombre del comercial",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Teléfono cliente",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Fecha registro",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
        {
          nombre: "Estado contrato",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Estado firmas",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Corregir por",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
      ],
      ejecutivos_comerciales: [],
      listas: [],
      estados_firma: [],
      first_page_url: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.urlExterna();
    this.getEstadosFirma();
    this.getItems();
    this.llenarLista();
    this.getEjecutivosComerciales();
  },
  methods: {
    actualizaResponsableDD(
      item_id,
      responsable_id,
      responsable_ingreso,
      email_reponsable,
      currenturl = null
    ) {
      let correosSeleccionados = {
        correos: [],
      };
      if (email_reponsable) {
        correosSeleccionados.correos.push({
          correo: email_reponsable,
          observacion: "",
          corregir: false,
        });
      }
      this.loading = true;
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/actualizaResponsableCliente/" +
            item_id +
            "/" +
            responsable_id +
            "/" +
            responsable_ingreso,
          config
        )
        .then(function (result) {
          self.estadoActualizado(currenturl);
          self.showAlert(result.data.message, result.data.status);
          if (result.data.status == "success") {
            self.enviarCorreos(item_id, correosSeleccionados);
          }
          self.loading = false;
        });
    },
    actualizaEstado(
      item_id,
      estado,
      responsable_id,
      correo_responsable,
      currenturl = null
    ) {
      this.loading = true;
      let self = this;
      let config = this.configHeader();
      let correosSeleccionados = {
        correos: [],
      };
      if (correo_responsable) {
        correosSeleccionados.correos.push({
          correo: correo_responsable,
          observacion: "",
          corregir: false,
        });
      }
      axios
        .get(
          self.URL_API +
            "api/v1/actualizaestadofirma/" +
            item_id +
            "/" +
            estado +
            "/" +
            responsable_id,
          config
        )
        .then(function (result) {
          self.estadoActualizado(currenturl);
          self.showAlert(result.data.message, result.data.status);
          if (result.data.status == "success") {
            self.enviarCorreos(item_id, correosSeleccionados);
          }
          self.loading = false;
        });
    },
    llenarLista() {
      this.tabla.forEach((item) => {
        if (item.calculado == "false") {
          this.listas.push([]);
        }
      });
      this.listas.push([]);
    },
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/consultaformulariocliente/" + 10, config)
        .then(function (result) {
          self.first_page_url = result.data.first_page_url.replace('"');
          self.datos = result;
        });
    },
    estadoActualizado(currentUrl) {
      if (currentUrl == null || currentUrl == "") {
        currentUrl = this.first_page_url.replace('"');
      }
      let self = this;
      let config = this.configHeader();
      axios.get(currentUrl, config).then(function (result) {
        self.datos = result;
      });
    },
    enviarCorreos(id, correosResponsables) {
      this.loading = true;
      let config = this.configHeader();
      axios
        .post(
          this.URL_API + "api/v1/enviarCorreoDD/" + id,
          correosResponsables,
          config
        )
        .then((response) => {
          this.showAlert(response.data.message, response.data.status);
          this.loading = false;
        });
    },
    getEjecutivosComerciales() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ejecutivocomerciallista", config)
        .then(function (result) {
          self.ejecutivos_comerciales = result.data;
          self.listas.splice(4, 0, result.data);
        });
    },
    getEstadosFirma() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosfirma", config)
        .then(function (result) {
          self.estados_firma = result.data;
        });
    },
  },
};
</script>
<style>
h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>
