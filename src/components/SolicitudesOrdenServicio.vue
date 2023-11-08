<template>
    <div class="container">
        <h2>solicitudes ordenes de servicio</h2>
        <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint"  />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
import {Token} from '../Mixins/Token.js'
export default {
    name: '',
    components: {
        Tabla
    },
    mixins: [Token],
    props: {

    },
    data() {
        return {
            show_table: false,
            datos: [],
            endpoint: 'consultaformulariocliente',
            URL_API: process.env.VUE_APP_URL_API,
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre / Razón social", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nit/Identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nombre solicitante", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Número celular", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Correo electrónico", orden: "DESC", tipo: "texto", calculado: 'false' },
                // { nombre: "Numero de cargos solicitados", orden: "DESC", tipo: "texto", calculado: 'false' },
                // { nombre: "Encargado", orden: "DESC", tipo: "texto", calculado: 'true' },
            ],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created(){
        this.getItems()
    },
    methods: {
        getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ordenservicioclientetabla/" + 10, config)
        .then(function (result) {
          self.datos = result;
        });
    },
    }
};
</script>
<style lang='' scoped>
</style>