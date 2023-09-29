<template>
    <div class="container">
        <h2>Reportes</h2>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Seleccione la categoria del reporte" eventoCampo="getSubCategoryReports"
                    @getSubCategoryReports="getSubCategoryReports" nombreItem="nom_mod" :registros="categorias"
                    placeholder="Seleccione un categoría" :valida_campo="false"/>
            </div>
            <div class="col">
                <button v-if="subcategory_reports_apl != ''" class="btn btn-success"
                    @click="getReports(subcategory_reports_apl = '', subcategory_reports_cod = '')">Listar todo</button>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Seleccione la subcategoria del reporte"
                    @getSubCategoryReportsId="getSubCategoryReportsId" eventoCampo="getSubCategoryReportsId"
                    nombreItem="des_cat" :registros="subcategorias" :clearInput="clearInput"
                    placeholder="Seleccione un categoría" :valida_campo="false" />
            </div>
        </div>
        <Tabla :datos="datos" :tabla="tabla" :search="subcategory_reports_apl" :search2="subcategory_reports_cod"
            :endpoint="endpoint" />
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue'
import SearchList from './SearchList.vue';
export default {
    components: {
        Tabla,
        SearchList,
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            categorias: [],
            subcategorias: [],
            datos: [],
            search: '',
            endpoint: 'reportes',
            category_reports_id: '',
            subcategory_reports_apl: '',
            subcategory_reports_cod: '',
            campos: '',
            tabla: [
                { nombre: "Código", orden: "DESC" },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            cantidad: 10,
            clearInput: false
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.getReports()
        this.getCategoryReports()
    },
    methods: {
        getCategoryReports() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/categoriasreporte", config)
                .then(function (result) {
                    self.categorias = result.data;
                });
        },
        getSubCategoryReports(value = null) {
            if (value != null) {
                this.clearInput = true
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/subcategoriasreporte/" + value.cod_apl, config)
                    .then(function (result) {
                        self.subcategorias = result.data;
                    });
            }
            setTimeout(() => {
                this.clearInput = false
            }, 2000);
        },
        getReports() {
            let self = this;
            let config = this.configHeader();
            let url = ''
            if (this.subcategory_reports_apl == '' && this.subcategory_reports_cod == '') {
                url = self.URL_API + "api/v1/reportes/" + this.cantidad, config
            } else {
                url = self.URL_API + "api/v1/reportes/" + this.subcategory_reports_apl + '/' + this.subcategory_reports_cod + '/' + this.cantidad, config
            }
            axios
                .get(url)
                .then(function (result) {
                    self.datos = result;
                });
        },
        getSubCategoryReportsId(item) {
            if(item != null){
                this.subcategory_reports_apl = item.cod_apl.trim();
                this.subcategory_reports_cod = item.cod_cat.trim();
                this.getReports();
            }
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