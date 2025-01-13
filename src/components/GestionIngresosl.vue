<template>
  <div class="container">
    <NotificacionesSocket />
    <h2>Registro de ingresos</h2>
    <Tabla
      :datos="datos"
      :tabla="tabla"
      :userlogued="userlogued"
      :endpoint="endpoint"
      :listas="listas"
      :endpointexport="endpointexport"
      :estados_ingreso="estados_ingreso"
      @actualizaEstado="actualizaEstado"
      @actualizaResponsable="actualizaResponsable"
      @filtrando="filtrando"
      @filtrarFechaIngreso="filtroFechaIngreso"
    />
  </div>
</template>

<script>
import Tabla from "./Tabla.vue";
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import NotificacionesSocket from "./NotificacionSocket.vue";
export default {
  components: {
    Tabla,
    NotificacionesSocket,
  },
  mixins: [Token, Alerts],
  props: {
    userlogued: {
      default: "",
    },
  },
  data() {
    return {
      filtro: {},
      filtro_rapido: false,
      show_table: false,
      datos: [],
      endpoint: "formularioingreso",
      endpointexport: "exportaformularioingreso",
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
          nombre: "Número servicio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Tipo servicio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Fecha actualizacion",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
        {
          nombre: "Fecha radicado",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
        {
          nombre: "Número identificación",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre candidato",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Cargo", orden: "DESC", tipo: "texto", calculado: "false" },
        {
          nombre: "Empresa usuaria",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Ciudad", orden: "DESC", tipo: "texto", calculado: "false" },
        {
          nombre: "Laboratorio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Otro laboratorio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Fecha exámen",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
        {
          nombre: "Fecha ingreso",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
        {
          nombre: "Estado vacante",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Observaciones al servicio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Novedad en servicio",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Profesional",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Afectaciones al servicio",
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
      estados_ingreso: [],
      first_page_url: "",
      filtro_gestion_ingresos: false,
      pagina_filtro: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    if (
      localStorage.getItem("ordenar_prioridad") ||
      localStorage.getItem("filtro_mios")
    ) {
      this.filtro = {
        ordenar_prioridad: JSON.parse(
          localStorage.getItem("ordenar_prioridad")
        ),
        filtro_mios: JSON.parse(localStorage.getItem("filtro_mios")),
      };
      this.filtroFechaIngreso(this.filtro);
    } else {
      this.getItems();
    }
    this.getEstadosIngreso();

    var self = this;
    this.interval = setInterval(() => {
      if (!self.filtro_gestion_ingresos) {
        self.getItems(this.pagina_filtro); // Llama a la función que quieres ejecutar cada 30 segundos
      }
    }, 300000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    filtroFechaIngreso(filtro, url = null) {
      this.filtro = filtro;
      let self = this;
      let config = this.configHeader();
      this.filtro_rapido = true;
      if (url != null && url != "") {
        axios.post(url, filtro, config).then(function (result) {
          self.first_page_url = result.data.first_page_url.replace('"');
          self.datos = result;
        });
      } else {
        axios
          .post(
            self.URL_API + "api/v1/formularioIngreso/filtrofechaingreso/" + 500,
            filtro,
            config
          )
          .then(function (result) {
            self.first_page_url = result.data.first_page_url.replace('"');
            self.datos = result;
          });
      }
    },
    filtrando(boolean, url) {
      this.pagina_filtro = url;
      this.filtro_gestion_ingresos = boolean;
    },
    actualizaResponsable(
      item_id,
      responsable_id,
      responsable_ingreso,
      currenturl = null
    ) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/actualizaResponsableingreso/" +
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
        });
    },
    getItems(url = null) {
      let self = this;
      let config = this.configHeader();
      if (url != null && url != "") {
        axios.get(url, config).then(function (result) {
          self.first_page_url = result.data.first_page_url.replace('"');
          self.datos = result;
        });
      } else {
        axios
          .get(self.URL_API + "api/v1/formularioingreso/" + 50, config)
          .then(function (result) {
            self.first_page_url = result.data.first_page_url.replace('"');
            self.datos = result;
          });
      }
    },
    getEstadosIngreso() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosingresos", config)
        .then(function (result) {
          self.estados_ingreso = result.data;
        });
    },
    actualizaEstado(item_id, estado, currenturl = null) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/actualizaestadoingreso/" +
            item_id +
            "/" +
            estado,
          config
        )
        .then(function (result) {
          self.estadoActualizado(currenturl);
          self.showAlert(result.data.message, result.data.status);
        });
    },
    estadoActualizado(currentUrl) {
      if (currentUrl == null || currentUrl == "") {
        currentUrl = this.first_page_url.replace('"');
      }
      let self = this;
      let config = this.configHeader();
      if (this.filtro_rapido) {
        axios.post(currentUrl, this.filtro, config).then(function (result) {
          self.datos = result;
        });
        return;
      }
      axios.get(currentUrl, config).then(function (result) {
        self.datos = result;
      });
    },
  },
};
</script>

<style scoped></style>
