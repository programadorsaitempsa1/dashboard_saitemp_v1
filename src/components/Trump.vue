<template>
   <div class="container">
        <h2>Lista trump</h2>
        <div class="row">
            <div class="col mb-3">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Buscar por número de
                    identificación</label>
                <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="search" />
            </div>
            <div class="col">
                <button class="btn btn-success" @click="getUser()">Buscar</button>
            </div>
        </div>
        <Tabla :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue'
import {Token} from '../Mixins/Token'
export default {
   components: {
     Tabla
   },
   mixins: [Token],
   props: {
     
   },
   data() {
     return {
        URL_API: process.env.VUE_APP_URL_API,
        search:'',
        datos:[],
        endpoint:'listatrump',
        tabla: [
                { nombre: "Número de identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Observación", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Fcecha", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Bloqueado", orden: "DESC", tipo: "texto", calculado: 'false' },
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
    getUser(value = null) {
            if (value != null) {
                this.search = value;
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/listatrump/" + this.search, config)
                .then(function (result) {
                    self.datos = result;
                });
        },
   }
};
</script>
<style scoped>
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

</style>