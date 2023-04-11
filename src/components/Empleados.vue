<template>
    <div class="container">
        <h1>Empleados</h1>
        <div class="row">
            <div class="col mb-3">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Buscar por nombre o número de
                    identificación</label>
                <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="search" />
            </div>
            <div class="col">
                <button class="btn btn-success" @click="getUser()">Buscar</button>
            </div>
            <div class="col">
                <button class="btn btn-success"><a :href="url" target="_blank">Reporte</a></button>

            </div>
        </div>
        <Tabla :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate"
            :campos="campos" @response="response" @clear="clear" @check="check" @getUser="getUser" />
        <!-- <iframe :src="url" width="100%" height="500"></iframe> -->
        <ReporteWeb :reportPath="'/report/Saitemp_V3/ReportesWeb/NOM/NOMU1599.rdl'" :reportServerUrl="'http://srv-saitemp03:81/Reports/Pages/ReportViewer.aspx'" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
import ReporteWeb from './ReporteWeb.vue';
export default {
    components: {
        Tabla,
        ReporteWeb
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            search: '',
            datos: [],
            endpoint: 'historicoempleado',
            campos: '',
            URL_API: process.env.VUE_APP_URL_API,
            massiveUpdate: false,
            tabla: [
                { nombre: "Fecha inicio", orden: "DESC" },
                { nombre: "Fecha retiro", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Motivo retiro", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Cargo", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Convenio", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Salario", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Contrato", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nota", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            url: 'http://srv-saitemp03:81/ReportServer/Pages/ReportViewer.aspx?%2fSaitemp_V3/ReportesWeb/NOM/NOMU1599&rs:Command=Render',
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        getUser(value = null) {
            if (value != null) {
                this.search = value;
            }
            this.tablaDatos()
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/historicoempleado/" + this.search, config)
                .then(function (result) {
                    self.datos = result;
                });
        },
        tablaDatos() {
            if (!isNaN(this.search)) {
                this.tabla = [
                    { nombre: "Fecha inicio", orden: "DESC" },
                    { nombre: "Fecha retiro", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Motivo retiro", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Cargo", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Convenio", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Salario", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Contrato", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Nota", orden: "DESC", tipo: "texto", calculado: 'false' },
                ]
            } else {
                this.tabla = [
                    { nombre: "Documento identidad", orden: "DESC", tipo: "texto", calculado: 'false' },
                    { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                ]
            }
        },
        response() {

        },
        clear() {

        },
        check() {

        },
        configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },
    },
};
</script>
<style  scoped>
label {
    float: left;
}

button {
    margin-top: 25px;
}
</style>