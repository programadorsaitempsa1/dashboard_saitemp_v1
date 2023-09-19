<template>
    <div class="container">
        <h2>Consulta correos novedades nómina</h2>
        <Tabla :datos="datos" :tabla="tabla" :userlogued="userlogued" :endpoint="endpoint" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
import { Token } from '../Mixins/Token.js';
export default {
    name: '',
    components: {
        Tabla,
    },
    mixins: [Token],
    props: {
        userlogued:{}
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            datos: [],
            endpoint:'consultacorreo',
            cantidad:10,
            tabla: [
            { nombre: "#", orden: "DESC" },
            { nombre: "Remitente", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Destinatarios", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Con copia", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Con copia oculta", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Asunto", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Mensaje", orden: "DESC", tipo: "texto", calculado: 'false' },
            { nombre: "Adjuntos", orden: "DESC", tipo: "texto", calculado: 'false' }]
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.getItems()
    },
    methods: {
        getItems() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/consultacorreo/"+this.cantidad, config)
                .then(function (result) {
                    self.datos = result
                });
        },
    }
};
</script>
<style lang='' scoped>
</style>