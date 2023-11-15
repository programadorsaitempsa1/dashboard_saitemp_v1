<template>
    <div class="container">
        <Loading :loading="loading" />
        <div class="row">
            <div class="col">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="label_dataset"
                    :datosA="cargos_mes" :index="1" />
                <span  v-if="char1">Cantidad de cargos solicitados por cada mes del año.</span>
            </div>
            <div class="col">
                <GraficoBarras  @graficoCargado="graficoCargado" :labels_x="labels_x" :items="estados_cargo" :datosS="cantidad_vacantes_estado" :index="2"/>
                <span v-if="char2">Cantidad de estados para todos los cargos registrados por cada mes del año.</span>
            </div>
        </div>
        <div class="row">
            <div :class="!expandido ? 'col-6' : 'col-12'">
                <GraficoBarras  @graficoCargado="graficoCargado" :labels_x="labels_x" :items="label1" :datosA="cantidad_vacantes"  :index="3" />
                <span v-if="char3">Cantidad de vacantes en todos los cargos registrados por cada mes del año.</span>
            </div>
            <div class="col">
                <GraficoBarras  @graficoCargado="graficoCargado" :labels_x="labels_x" :items="label2" :datosA="hojas_vida"  :index="4"/>
                <span v-if="char4">Cantidad de hojas de vida enviadas en todos los cargos registrados por cada mes del año.</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <GraficoBarras  @graficoCargado="graficoCargado" :labels_x="labels_x" :items="items" :datosS="vacantes_cargos_hojasVida"  :index="5" />
                <span v-if="char5">Comparativa por cantidad entre cargos registrados, vacantes dispibles y hojas de vida enviadas por
                    cada mes de año.</span>
            </div>
            <div class="col">
                <GraficoBarras  @graficoCargado="graficoCargado" :labels_x="labels_x" :items="items2" :datosA="vacantes_efectivas"  :index="6"/>
                <span v-if="char6">Cantidad de vacantes ocupadas por cada mes de año.</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <DoughnutChar  @graficoCargado="graficoCargado" :datos="todos_cargos"  :index="7" />
                <span v-if="char7">Nombre de los cargos registrados con la cantidad de vacantes solicitadas.</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Token } from '../Mixins/Token.js';
import DoughnutChar from './DoughnutChar.vue';
import GraficoBarras from './GraficoBarras.vue';
import Loading from './Loading.vue'
export default {
    name: '',
    components: {
        DoughnutChar,
        GraficoBarras,
        Loading,
    },
    mixins: [Token],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            label_dataset: ['Solitud cargos por mes'],
            label2: ['Hojas de vida enviadas por mes'],
            label1: ['Cantidad de vacantes por mes'],
            labels_x: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            todos_cargos: [],
            cargos: [],
            cargos_mes: [],
            hojas_vida: [],
            cantidad_vacantes: [],
            expandido: false,
            items: ['CARGOS', 'VACANTES', 'HOJAS DE VIDA ENV.'],
            items2: ['VACANTES OCUPADAS'],
            comparativa: [],
            vacantes_cargos_hojasVida: '',
            cantidad_vacantes_estado: '',
            estados_cargo: [],
            vacantes_efectivas: [],
            char1:false,
            char2:false,
            char3:false,
            char4:false,
            char5:false,
            char6:false,
            char7:false,
            loading: true,
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.getCargosMes()
        this.getHojasVidaMes()
        this.getCantidadVacantesMes()
        this.getCargos()
        this.getCargosVacantesHojasVida()
        this.cantidadvacantesestado()
        this.vacantesEfectivas()
    },
    methods: {
        getCargosMes() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciocargochar/" + '2023', config)
                .then(function (result) {
                    Object.values(result.data).forEach(function (item) {
                        self.cargos_mes.push(item)
                    })
                });
        },
        getHojasVidaMes() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciohojavidachar/" + '2023', config)
                .then(function (result) {
                    Object.values(result.data).forEach(function (item) {
                        self.hojas_vida.push(item)
                    })
                });
        },
        getCantidadVacantesMes() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciocargocantidadchar/" + '2023', config)
                .then(function (result) {
                    Object.values(result.data).forEach(function (item) {
                        self.cantidad_vacantes.push(item)
                    })
                });
        },
        getCargos() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciocargocantidadchar2/" + '2023', config)
                .then(function (result) {
                    self.todos_cargos.push(result.data)
                });
        },
        getCargosVacantesHojasVida() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cargosVacantesHojasVida/" + '2023', config)
                .then(function (result) {
                    result.data.forEach(function (item) {
                        array.push(Object.values(item))
                    })
                    self.vacantes_cargos_hojasVida = JSON.stringify(array)
                });
        },
        vacantesEfectivas() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesEfectivas/" + '2023', config)
                .then(function (result) {
                    self.vacantes_efectivas = Object.values(result.data)
                });
        },
        cantidadvacantesestado() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cantidadvacantesestado/" + '2023', config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.estados_cargo = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_vacantes_estado = JSON.stringify(array)
                });
        },
        graficoCargado(cargado, index) {
            this.loading = false
            switch (index) {
                case 1:
                    this.char1 = cargado
                    break;
                case 2:
                    this.char2 = cargado
                    break;
                case 3:
                    this.char3 = cargado
                    break;
                case 4:
                    this.char4 = cargado
                    break;
                case 5:
                    this.char5 = cargado
                    break;
                case 6:
                    this.char6 = cargado
                    break;
                case 7:
                    this.char7 = cargado
                    break;
            
                default:
                    break;
            }
        },
        expandir() {

        }
    }
};
</script>
<style scoped>
.row {
    background-color: rgba(216, 231, 233, 0.653);
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
}

span {
    float: left;
    display: block;
    padding: 15px;
    transition-duration: 500ms;
}

span:hover {
    font-size: 1.5rem;
    cursor: pointer;
    transition-duration: 500ms;
    font-weight: 100;
}
</style>