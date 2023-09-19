// Mixin para mostrar mensajes de alerta como exito o error en una acción
export const Alerts = {
  data () {
    return {};
  },
  methods: {
    showAlert (mensaje, icono) {
      this.$swal ({
        position: 'top',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: icono == 'error' ? 3000 : 1500,
      });
    },
  },
  computed: {},
  created () {},
}; // MiMixin.js
