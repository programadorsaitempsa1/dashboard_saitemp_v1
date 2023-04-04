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
        </div>
        <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
            @response="response" @clear="clear" @check="check" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
export default {
    components: {
        Tabla
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
                { nombre: "Fecha retiro", orden: "DESC" ,tipo:"texto",calculado:'false'},
                { nombre: "Motivo retiro", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Cargo", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Convenio", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Salario", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Contrato", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Nota", orden: "DESC",tipo:"texto",calculado:'false' },
            ],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        getUser() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/historicoempleado/"+this.search, config)
                .then(function (result) {
                    self.datos = result;
                });
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