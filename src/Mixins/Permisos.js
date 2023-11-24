// Mixin para mostrar mensajes de alerta como exito o error en una acción
export const Permisos = {
  data () {
    return {};
  },
  methods: {
    getPermisos () {
      let self = this;
      let config = this.configHeader ();
      axios
        .get (
          self.URL_API + 'api/v1/permisos',
          config
        )
        .then (function (result) {
          self.datos = result;
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
  created () {},
}; // MiMixin.js
