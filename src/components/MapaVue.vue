<template>
    <div class="container">
      <button @click="obtenerGeolocalizacion">Obtener Geolocalización</button>
      <div id="mapa" style="height: 400px;"></div>
    </div>
  </template>
  
  <script>
  import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
  import L from 'leaflet'; // Importa Leaflet
  
  export default {
    data() {
      return {
        map: null,
        geolocalizacion: null,
      };
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
  
        L.marker([latitud, longitud]).addTo(this.map)
          .bindPopup('Ubicación actual')
          .openPopup();
      }
    },
    watch: {
      geolocalizacion: 'mostrarMapa' // Actualiza el mapa cuando cambia la geolocalización
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente aquí */
  </style>
  