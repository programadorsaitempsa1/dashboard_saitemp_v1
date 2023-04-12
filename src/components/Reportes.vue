<template>
    <div class="container">
        <h1>Reportes</h1>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Seleccione la categoria del reporte" @getCategoryReportsId="getCategoryReportsId"
                    eventoCampo="getCategoryReportsId" nombreItem="nom_mod" :registros="categorias"
                    placeholder="Seleccione un categoría" />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <SearchList nombreCampo="Seleccione la subcategoria del reporte"
                    @getSubCategoryReportsId="getSubCategoryReportsId" eventoCampo="getSubCategoryReportsId"
                    nombreItem="des_cat" :registros="subcategorias" placeholder="Seleccione un categoría" />
            </div>
        </div>
        <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" />
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
            cantidad: 10
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
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/subcategoriasreporte/" + value, config)
                    .then(function (result) {
                        self.subcategorias = result.data;
                    });
            }
        },
        getReports() {
            let self = this;
            let config = this.configHeader();
            let url = ''
            if(this.subcategory_reports_apl == '' && this.subcategory_reports_cod == ''){
                url = self.URL_API + "api/v1/reportes/" + this.cantidad, config
            }else{
                url = self.URL_API + "api/v1/reportes/"+this.subcategory_reports_apl+'/'+this.subcategory_reports_cod+'/'+this.cantidad, config
            }
            axios
                .get(url)
                .then(function (result) {
                    self.datos = result;
                });
        },
        getCategoryReportsId(item) {
            if (item != undefined) {
                let self = this;
                var cont = 0;
                this.categorias.forEach(function (element) {
                    if (item.trim() == element.nom_mod.trim()) {
                        self.category_reports_id = element.cod_apl.trim();
                        self.getSubCategoryReports(self.category_reports_id);
                        cont++;
                    }
                });
                if (cont <= 0) {
                    self.CategoryReportsId = "";
                }
            }
        },
        getSubCategoryReportsId(item) {
            if (item != undefined) {
                let self = this;
                var cont = 0;
                this.subcategorias.forEach(function (element) {
                    if (item.trim() == element.des_cat.trim()) {
                        self.subcategory_reports_apl = element.cod_apl.trim();
                        self.subcategory_reports_cod = element.cod_cat.trim();
                        self.getReports();
                        cont++;
                    }
                });
                if (cont <= 0) {
                    self.subcategory_reports_apl = ''
                    self.subcategory_reports_cod = ''
                }
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
<style scoped></style>