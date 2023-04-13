<template>
    <div class="container">
        <h2>Procesos especiales</h2>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Procesos" @getProcedures="getProcedures"
                    eventoCampo="getProcedures" nombreItem="nom_proc" :registros="procedures"
                    placeholder="Seleccione un proceso" />
            </div>
            <!-- <div class="col">
                <button v-if="subcategory_reports_apl != ''" class="btn btn-success"
                    @click="getReports(subcategory_reports_apl = '', subcategory_reports_cod = '')">Listar todo</button>
            </div> -->
        </div>
        <!-- <Tabla :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" /> -->
    </div>
</template>
<script>
import axios from 'axios'
// import Tabla from './Tabla.vue'
import SearchList from './SearchList.vue'
export default {
    components: {
        // Tabla,
        SearchList
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            search: '',
            // datos: [],
            endpoint: 'procesosespeciales',
            procedures:[],
            // tabla: [
            //     { nombre: "Número de identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
            //     { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
            //     { nombre: "Observación", orden: "DESC", tipo: "texto", calculado: 'false' },
            //     { nombre: "Fcecha", orden: "DESC", tipo: "texto", calculado: 'false' },
            //     { nombre: "Bloqueado", orden: "DESC", tipo: "texto", calculado: 'false' },
            // ],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.getProcedures()
    },
    methods: {
        getProcedures(value = null) {
            if (value != null) {
                this.search = value;
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/procesosespeciales", config)
                .then(function (result) {
                    self.procedures = result;
                });
        },
        configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },
    }
};
</script>
<style scoped>
button {
    margin-top: 40px;
}
h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>