// Mixin para mostrar una ventana modal superpuesta, si viene un parametro en true
// se oculta la barra de desplazamiento
import axios from 'axios';
export const Crud = {
  data () {
    return {};
  },
  methods: {
    delete (id, endpoint) {
      let self = this;
      var endpointapi = endpoint == null ? self.endpoint : endpoint;
      let config = this.configHeader ();
      axios
        .delete (self.URL_API + 'api/v1/' + endpointapi + '/' + id, config)
        .then (function (result) {
          self.showAlert (result.data.message, result.data.status);
          if (self.$route.fullPath.includes ('menus')) {
            self.getItems()
          } else {
            self.getRegistros();
          }
        });
    },
  },
  computed: {},
  created () {},
}; // MiMixin.js
