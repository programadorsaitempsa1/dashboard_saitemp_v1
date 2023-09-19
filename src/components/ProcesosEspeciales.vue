<template>
    <div class="container">
        <h2>Procesos especiales</h2>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Procesos" @getProcedureId="getProcedureId" eventoCampo="getProcedureId"
                    nombreItem="nom_proc" :registros="procedures" placeholder="Seleccione un proceso" />
            </div>
        </div>
        <div class="row" v-for="item, index in form_procedures" :key="index">
            <div class="col-6" v-if="item.tip_obj.trim() == 'LA'">
                <SearchTable :nombreCampo="item.des_param" @getValue="getValue"
                    @getGeneric="getGeneric(item.tab_hlp, item.nom_hlp, item.des_hlp)" eventoCampo="getGeneric"
                    :nombreItem="item.nom_hlp" :endpoint="endpoint" :item="item.tab_hlp" :item1="item.nom_hlp"
                    :item2="item.des_hlp" :posicion="item.ord_cmp" placeholder="Seleccione una opcion"
                    :showModal="showModal" :datos="registros" :valida_campo="false"/>
            </div>
            <div class="col-6" v-if="item.tip_obj.trim() == 'L'">
                <div>
                    <label for="exampleFormControlInput1" :class="form - label">{{ item.des_param }}</label>
                    <select class="form-select" v-model="text_field[item.ord_cmp - 1]" aria-label="Default select example">
                        <option v-for="(item, index) in item.des_hlp.split(',')" :key="index">{{ item }}</option>
                    </select>
                </div>
            </div>
            <div class="col-6 mb-3" v-if="item.tip_obj.trim() == 'F'">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">{{ item.des_param }}</label>
                <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="text_field[item.ord_cmp - 1]" :valida_campo="false"/>
            </div>
            <div class="col-6 mb-3" v-if="item.tip_obj.trim() == 'T'">
                <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">{{ item.des_param }}</label>
                <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                    aria-describedby="emailHelp" v-model="text_field[item.ord_cmp - 1]" :valida_campo="false"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button v-if="procedures.length > 0 && show_button_process" class="btn btn-success"
                    @click="excecuteProcedure(), show_table = true">Procesar</button>
            </div>
            <div v-if="btnexport" class="col">
                <button id="exportar"
                    @click="showAlert('Por favor espere un momento mientras el archivo se procesa y se descarga.', 'success')"
                    type="button" class="btn btn-success">
                    <a :href="URL_API + 'api/v1/procesosespecialesexport/' + base64consulta"
                        rel="noopener noreferrer">Exportar
                        excel</a>
                </button>
            </div>
        </div>
        <Tabla v-if="show_table" :datos="datos" :search="search" :tabla="tabla" :endpoint="endpoint" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue'
import SearchList from './SearchList.vue'
import SearchTable from './SearchTable.vue'
import {Token} from '../Mixins/Token'
export default {
    components: {
        Tabla,
        SearchList,
        SearchTable
    },
    mixins: [Token],
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
            tabla: [ ],
            text_field: [],
            registros: '',
            show_button_process: false,
            show_table: false,
            base64consulta: '',
            btnexport: false,
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
            if (item != null) {
                this.name_procedure = item.nom_sp.trim();
                this.code_procedure = item.cod_proc.trim();
                this.getFieldsForm(this.code_procedure);
                this.show_button_process = true
            }
        },
        getFieldsForm(item) {
            let self = this;
            let config = this.configHeader();
            this.text_field = []
            axios
                .get(self.URL_API + "api/v1/formprocesosespeciales/" + item, config)
                .then(function (result) {
                    self.form_procedures = self.ordenCampos(result.data);
                    self.text_field = new Array(self.form_procedures.length);
                });
        },
        ordenCampos(items) {
            items.sort(function (a, b) {
                if (a.ord_cmp > b.ord_cmp) {
                    return 1;
                }
                if (a.ord_cmp < b.ord_cmp) {
                    return -1;
                }
                return 0;
            });
            return items
        },
        getValue(value) {
            value = value.split('posicion')
            this.text_field.splice(value[1] - 1, 1, value[0].trim())
        },
        getGeneric(item, item1, item2) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/listasprocesosespeciales/" + item + '/' + item1 + '/' + item2, config)
                .then(function (result) {
                    self.registros = result.data;
                });
        },
        excecuteProcedure() {
            let self = this;
            let config = this.configHeader();
            for (let i = 0; i < self.text_field.length; i++) {
                this.form_procedures.forEach(function (item) {
                    if (item.ord_cmp == (i + 1)) {
                        if (self.text_field[i] == undefined || self.text_field[i] == 'undefined') {
                            self.text_field[i] = item.val_def
                        }
                    }
                })
            }
            let parametros = []
            if (this.text_field[this.text_field.length - 1] == this.name_procedure) {
                this.text_field.splice(this.text_field.length - 1, 1, this.name_procedure)
                parametros = this.text_field
            } else {
                this.text_field.push(this.name_procedure)
                parametros = this.text_field
            }
            var separator = "*";
            var string = parametros.join(separator);
            this.base64consulta = btoa(string);

            axios
                .get(self.URL_API + "api/v1/ejecutaprocesosespeciales", { params: { parametros } }, config)
                .then(function (result) {
                    if (result.data.data.length > 0) {
                        Object.keys(result.data.data[0]).forEach(function (item) {
                            self.tabla.push({ nombre: item, orden: "DESC", tipo: "texto", calculado: 'false' },)
                        })
                        self.datos = result;
                        if (self.datos.data.data.length > 0) {
                            self.btnexport = true
                        }
                    } else {
                        self.datos = result;
                        self.btnexport = false
                    }
                });
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

button {
    margin-bottom: 30px;
}

a {
    color: white;
    text-decoration: none;
}
</style>