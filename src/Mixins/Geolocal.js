// Mixin para mostrar mensajes de alerta como exito o error en una acción
export const Geolocal = {
  data () {
    return {
      geolocalizacion: null,
    };
  },
  wacth:{
  },
  methods: {
    obtenerGeolocalizacion () {
      return new Promise ((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition (
            position => {
              const geolocalizacion = {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
              };
              resolve (geolocalizacion);
            },
            error => {
              reject (error);
            }
          );
        } else {
          const mensajeError = 'Debe activar la geolocalización en el navegador'
          reject (new Error (mensajeError));
        }
      });
    },
  },
  computed: {},
  created () {},
}; // MiMixin.js
