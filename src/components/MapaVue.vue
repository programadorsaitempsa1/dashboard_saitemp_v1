<template>
  <div class="container">
    <!-- <button @click="obtenerGeolocalizacion">Obtener Geolocalización</button> -->
    <div id="mapa" style="height: 400px;"></div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet'; // Importa Leaflet

export default {
  props: {
    showMap: {
      type: Boolean,
      default: false
    },
    latitud: {
      type: String,
      default: ''
    },
    longitud: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Ubicacion actual'
    },
    marcador: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      map: null,
      geolocalizacion: null,
    };
  },
  watch: {
    showMap() {
      this.geolocalizacion = {
        latitud: this.latitud,
        longitud: this.longitud,
      }
      this.mostrarMapa()
    },
    // geolocalizacion: 'mostrarMapa'
  },
  methods: {
    obtenerGeolocalizacion() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.geolocalizacion = {
              latitud: position.coords.latitude,
              longitud: position.coords.longitude
            };
            this.$emit('coordenadas', this.geolocalizacion)
            this.mostrarMapa();
          },
          error => {
            console.error('No se pudo obtener la geolocalización:', error);
          }
        );
      } else {
        console.error('Geolocalización no compatible con este navegador.');
      }
    },
    mostrarMapa() {
      const latitud = this.geolocalizacion.latitud;
      const longitud = this.geolocalizacion.longitud;

      if (!this.map) {
        // Crea el mapa Leaflet si aún no existe
        this.map = L.map('mapa').setView([latitud, longitud], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      } else {
        // Si el mapa ya existe, simplemente actualiza la vista
        this.map.setView([latitud, longitud], 15);
      }

      // var customIcon = L.icon({
      //   iconUrl: 'https://static.vecteezy.com/system/resources/previews/022/187/042/non_2x/map-location-pin-icon-free-png.png', // Reemplaza con la URL de tu propio icono
      //   iconSize: [20, 30], // Tamaño del icono
      //   iconAnchor: [20, 40], // Punto de anclaje del icono (la parte inferior del icono)
      //   popupAnchor: [0, -40] // Punto de anclaje del popup (la parte superior del icono)
      // });
      var customIcon = L.icon({
        iconUrl: this.marcador, // Imagen personalizada del marcador
        iconSize: [150, ], // Tamaño del icono
        iconAnchor: [70, 80], // Punto de anclaje del icono (la parte inferior del icono)
        popupAnchor: [0, -0] // Punto de anclaje del popup (la parte superior del icono)
      });

      L.marker([latitud, longitud], { icon: customIcon }).addTo(this.map)
        // .bindPopup(this.label)
        .openPopup();
    }
  },
};
</script>

<style scoped>
/* Estilos específicos del componente aquí */
</style>
