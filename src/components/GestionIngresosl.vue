<template>
    <div class="container">
        <h2>Registro de ingresos</h2>
        <Tabla :datos="datos" :tabla="tabla" :userlogued="userlogued" :endpoint="endpoint" :listas="listas"
            :endpointexport="endpointexport" :estados_ingreso="estados_ingreso" @actualizaEstado="actualizaEstado"
            @actualizaResponsable="actualizaResponsable" />
    </div>
</template>

<script>
import Tabla from './Tabla.vue'
import axios from 'axios'
import { Token } from '../Mixins/Token.js'
import { Alerts } from '../Mixins/Alerts.js';
export default {
    components: {
        Tabla
    },
    mixins: [Token, Alerts],
    props: {
        userlogued: {
            default: '',
        },
    },
    data() {
        return {
            show_table: false,
            datos: [],
            endpoint: 'formularioingreso',
            endpointexport: 'formularioingreso',
            URL_API: process.env.VUE_APP_URL_API,
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Fecha radicado", orden: "DESC", tipo: "fecha", calculado: 'false' },
                { nombre: "Fecha ingreso", orden: "DESC", tipo: "fecha", calculado: 'false' },
                { nombre: "Responsable", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Número identificación", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Empresa cliente", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Cargo", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Ciudad", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Laboratorio", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Estado", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            ejecutivos_comerciales: [],
            listas: [],
            estados_ingreso: [],
            first_page_url: '',
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
        this.getEstadosIngreso()
    },
    methods: {
        actualizaResponsable(item_id, responsable_ingreso, currenturl = null) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/actualizaResponsableingreso/" + item_id + '/' + responsable_ingreso, config)
                .then(function (result) {
                    self.estadoActualizado(currenturl)
                    self.showAlert(result.data.message, result.data.status);
                });
        },
        getItems() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formularioingreso/" + 50, config)
                .then(function (result) {
                    self.first_page_url = result.data.first_page_url.replace("\"");
                    self.datos = result;
                });
        },
        getEstadosIngreso() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadosingresos", config)
                .then(function (result) {
                    self.estados_ingreso = result.data
                });
        },
        actualizaEstado(item_id, estado, currenturl = null) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/actualizaestadoingreso/" + item_id + '/' + estado, config)
                .then(function (result) {
                    self.estadoActualizado(currenturl)
                    self.showAlert(result.data.message, result.data.status);
                });
        },
        estadoActualizado(currentUrl) {
            if (currentUrl == null || currentUrl == '') {
                currentUrl = this.first_page_url.replace("\"");
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(currentUrl, config)
                .then(function (result) {
                    self.datos = result;
                });
        },
    }
};
</script>

<style scoped></style>