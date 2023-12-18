// Mixin para mostrar una ventana modal superpuesta, si viene un parametro en true 
// se oculta la barra de desplazamiento
export const Scroll = {
  data () {
    return {};
  },
  methods: {
    scrollTop (scroll = false) {
      window.scroll ({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      if (scroll) {
        document.body.style.overflow = 'hidden';
      }
    },
    scrollAuto(){
      document.body.style.overflow = 'auto';
    }
  },
  computed: {},
  created () {},
}; // MiMixin.js
