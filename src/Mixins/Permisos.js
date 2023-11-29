// Mixin para visualisar los botones con acciones a los cuales el usuario tiene permisos
import axios from 'axios';
export const Permisos = {
  data () {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      permisos_modulos: [],
      permisos: [
        {alias: 'P1', autorizado: false},
        {alias: 'P2', autorizado: false},
        {alias: 'P3', autorizado: false},
        {alias: 'P4', autorizado: false},
      ],
    };
  },

  watch: {
    permisos_modulos: function () {
      var self = this
      self.permisos.forEach (function (item) {
        item.autorizado = self.permisos_modulos.some (permiso => permiso.alias === item.alias);
      });
    },
  },
  created () {
    this.getPermisos ();
  },
  methods: {
    getPermisos () {
      let self = this;
      let config = this.configHeader ();
      axios
        .get (self.URL_API + 'api/v1/permisos', config)
        .then (function (result) {
          self.permisos_modulos = result.data;
        });
    },
    configHeader () {
      let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem ('access_token'),
        },
      };
      return config;
    },
  },
  computed: {},
}; // MiMixin.js
