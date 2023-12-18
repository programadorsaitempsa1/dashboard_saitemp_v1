// Mixin para mostrar una ventana modal superpuesta, si viene un parametro en true
// se oculta la barra de desplazamiento
export const Socket = {
  data () {
    return {
      audioPath: require ('../assets/file.mp3'),
      pila_notificaciones: [],
    };
  },
  methods: {
    socket (chanell, event) {
      let self = this;
      window.Echo.channel (chanell).listen (event, e => {
        if (self.pila_notificaciones.length > 0) {
          self.pila_notificaciones.forEach (function (item) {
            item.visible = 'hidden';
          });
        }
        self.pila_notificaciones.push ({
          message: e.message,
          class: 'notificacion animate__animated animate__fadeInRight',
          visible: 'visible',
        });
        localStorage.setItem("pila_notificaciones", JSON.stringify(self.pila_notificaciones));
        const audio = new Audio (this.audioPath);
        audio.play ();
      });
    },
  },
}; // MiMixin.js
