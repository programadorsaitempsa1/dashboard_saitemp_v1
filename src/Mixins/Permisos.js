// Mixin para visualisar los botones con acciones a los cuales el usuario tiene permisos
import axios from "axios";
export const Permisos = {
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      permisos_modulos: [],
      permisos: [
        { alias: "P1", autorizado: false },
        { alias: "P2", autorizado: false },
        { alias: "P3", autorizado: false },
        { alias: "P4", autorizado: false },
        { alias: "P5", autorizado: false },
        { alias: "P6", autorizado: false },
        { alias: "P7", autorizado: false },
        { alias: "P8", autorizado: false },
        { alias: "P9", autorizado: false },
        { alias: "P10", autorizado: false },
        { alias: "P11", autorizado: false },
        { alias: "P12", autorizado: false },
        { alias: "P13", autorizado: false },
        { alias: "P14", autorizado: false },
        { alias: "P15", autorizado: false },
        { alias: "P16", autorizado: false },
        { alias: "P17", autorizado: false },
        { alias: "P18", autorizado: false },
        { alias: "P19", autorizado: false },
        { alias: "P20", autorizado: false },
        { alias: "P25", autorizado: false },
        { alias: "P26", autorizado: false },
        { alias: "P27", autorizado: false },
        { alias: "P28", autorizado: false },
        { alias: "P29", autorizado: false },
        { alias: "P30", autorizado: false },
        { alias: "P31", autorizado: false },
        { alias: "P32", autorizado: false },
        { alias: "P33", autorizado: false },
        { alias: "P34", autorizado: false },
        { alias: "P35", autorizado: false },
        { alias: "P36", autorizado: false },
        { alias: "P37", autorizado: false },
        { alias: "P38", autorizado: false },
        { alias: "P39", autorizado: false },
        { alias: "P40", autorizado: false },
        { alias: "P41", autorizado: false },
        { alias: "P42", autorizado: false },
        { alias: "P43", autorizado: false },
      ],
    };
  },

  watch: {
    permisos_modulos: function () {
      var self = this;
      self.permisos.forEach(function (item) {
        item.autorizado = self.permisos_modulos.some(
          (permiso) => permiso.alias === item.alias
        );
      });
    },
  },
  created() {
    this.getPermisos();
  },
  methods: {
    urlExterna() {
      const urlCompleta = window.location.href;
      if (urlCompleta.includes("debidadiligencia.saitempsa.com")) {
        this.URL_API =
          "https://debidadiligencia.saitempsa.com:8484/aplicaciones/api/public/";
      }
    },
    getPermisos() {
      let self = this;
      this.urlExterna();
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/permisos", config)
        .then(function (result) {
          // result.data.forEach(function(item){
          //   console.log(item.alias)
          //   self.permisos.push({alias: item.alias, autorizado: false})
          // })
          self.permisos_modulos = result.data;
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
  },
  computed: {},
}; // MiMixin.js
