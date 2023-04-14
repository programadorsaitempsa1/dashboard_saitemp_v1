<template>
    <div class="container">
        <h2>Procesos especiales</h2>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Procesos" @getProcedureId="getProcedureId" eventoCampo="getProcedureId"
                    nombreItem="nom_proc" :registros="procedures" placeholder="Seleccione un proceso" />
            </div>
            <!-- <div class="col">
                <button v-if="subcategory_reports_apl != ''" class="btn btn-success"
                    @click="getReports(subcategory_reports_apl = '', subcategory_reports_cod = '')">Listar todo</button>
            </div> -->
        </div>
        <div class="row" v-for="item, index in form_procedures" :key="index">
            <!-- <div class="col-6" v-if="item.tip_obj == 'LA'">
                <SearchList :nombreCampo="item.des_param" @getGeneric="getGeneric(item.tab_hlp)" eventoCampo="getGeneric"
                    :nombreItem="item.nom_hlp" :registros="registros" placeholder="Seleccione una opcion" />
            </div> -->
            <div class="col-6" v-if="item.tip_obj == 'LA'">
                <SearchTable :nombreCampo="item.des_param" @getGeneric="getGeneric(item.tab_hlp, item.nom_hlp, item.des_hlp)" eventoCampo="getGeneric"
                    :nombreItem="item.nom_hlp" :endpoint="endpoint" :item="item.tab_hlp" :item1="item.nom_hlp" :item2="item.des_hlp" placeholder="Seleccione una opcion"
                    :showModal="showModal" :datos="registros" />
            </div>
            <div class="col-6 mb-3" v-if="item.tip_obj == 'F '">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">{{ item.des_param }}</label>
                <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="text_field[index]" />
            </div>
            <div class="col-6 mb-3" v-if="item.tip_obj == 'T '">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">{{ item.des_param }}</label>
                <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="text_field[index]" />
            </div>
        </div>
         <div class="col">
                <button v-if="procedures.length > 0" class="btn btn-success"
                    @click="getReports()">Procesar</button>
            </div>
        <!-- <Tabla :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" /> -->
    </div>
</template>
<script>
import axios from 'axios'
// import Tabla from './Tabla.vue'
import SearchList from './SearchList.vue'
import SearchTable from './SearchTable.vue'
export default {
    components: {
        // Tabla,
        SearchList,
        SearchTable
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            search: '',
            datos: [],
            endpoint: 'filtroprocesosespeciales',
            procedures: [],
            name_procedure: '',
            code_procedure: '',
            form_procedures: '',
            showModal: false,
            listaTabla: true,
            tabla: [
                { nombre: "Número de identificacion", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Observación", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Fcecha", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Bloqueado", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            text_field: [],
            registros: '',
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
                    self.procedures = result.data;
                });
        },
        getProcedureId(item) {
            if (item != undefined) {
                let self = this;
                var cont = 0;
                this.procedures.forEach(function (element) {
                    if (item.trim() == element.nom_proc.trim()) {
                        self.name_procedure = element.nom_sp.trim();
                        self.code_procedure = element.cod_proc.trim();
                        self.getFieldsForm(self.code_procedure);
                        cont++;
                    }
                });
                if (cont <= 0) {
                    self.name_procedure = ''
                    self.code_procedure = ''
                }
            }
        },
        getFieldsForm(item) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formprocesosespeciales/" + item, config)
                .then(function (result) {
                    self.form_procedures = result.data;
                    console.log(self.form_procedures)
                });
        },
        getGeneric(item, item1, item2) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/listasprocesosespeciales/" + item+'/'+item1+'/'+item2, config)
                .then(function (result) {
                    self.registros = result.data;
                    console.log(self.registros.length)
                    // console.log(self.form_procedures)
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

label {
    float: left;
    margin-top: 20px;
}

button{
    margin-bottom: 30px;
}
</style>