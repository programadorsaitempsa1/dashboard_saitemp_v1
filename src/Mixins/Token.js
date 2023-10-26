// Mixin para retornar el token de usuario
export const Token = {
  data () {
    return {};
  },
  methods: {
    urlExterna () {
      const urlCompleta = window.location.href;
      if (urlCompleta.includes ('debidadiligencia.saitempsa.com')) {
        this.URL_API =
          'http://debidadiligencia.saitempsa.com:8484/aplicaciones/api/public/';
      }
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
