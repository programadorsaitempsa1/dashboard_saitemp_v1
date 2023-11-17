<template>
    <div class="container">
        <h2>Empleados</h2>
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
            <div v-if="download_excel" class="col">
                <button id="exportar" type="button" class="btn btn-success">
                    <a :href="URL_API + 'api/v1/historicoempleadoexport/' + search" rel="noopener noreferrer">Exportar
                        excel</a>
                </button>
            </div>
        </div>
        <div class="row" v-if="download_excel">
            <h5> Empleado: {{ user_name.nombre }} - {{ user_name.cod_emp }}</h5>
        </div>
        <Tabla :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate"
            :campos="campos" @response="response" @clear="clear" @check="check" @getUser="getUser" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
import {Token} from '../Mixins/Token'
// import ReporteWeb from './ReporteWeb.vue';
export default {
    components: {
        Tabla,
        // ReporteWeb
    },
    mixins: [Token],
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
                { nombre: "Analista", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            download_excel: false,
            user_name: ''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.search = this.$route.params.id
        this.getUser(this.search)
    },
    methods: {
        getUser(value = null) {
            let descarga_excel = false
            if (value != null) {
                this.search = value;
            }
            if (!isNaN(this.search)) {
                descarga_excel = true
                this.getUserName(this.search)
            }
            this.tablaDatos()
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/historicoempleado/" + this.search + '/' + 10, config)
                .then(function (result) {
                    self.datos = result;
                    if (result.data.data.length > 0 && descarga_excel) {
                        self.download_excel = true
                    }
                });
        },
        getUserName(value = null) {
            if (value != null) {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/username/" + this.search, config)
                    .then(function (result) {
                        self.user_name = result.data;
                    });
            }
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
                    { nombre: "Analista", orden: "DESC", tipo: "texto", calculado: 'false' },
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
        exportar() {
            let self = this;
            let cadena = this.campo + '/' + this.operador + '/' + this.valor_comparar + '/' + self.valor_comparar2
            this.base64consulta = (btoa(cadena))
        },
    },
};
</script>
<style  scoped>
h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}

label {
    float: left;
}

button {
    margin-top: 25px;
}

a {
    color: white;
    text-decoration: none;
}

h5 {
    width: auto;
    float: left;
    margin: 20px 0px 20px 0px;
}
</style>