<template>
    <div>
        <h2>Dashboard</h2>
        <div v-for="(row, index) in rows" :key="index" class="row">
            <GraficoCircular v-for="item in row" :item="item" :key="item.id" :maxPercentage="item.percentaje"
                :label="item.label" class="col" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import GraficoCircular from "./GraficoCircular.vue";
export default {
    components: {
        GraficoCircular
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            items: [
                // { percentaje: 8442, label: 'Empleados Activos' },
                // { percentaje: 50, label: 'Empleados Planta' },
                // { percentaje: 45, label: 'Ingresos mes en curso' },
                // { percentaje: 80, label: 'Retiros mes en curso' },
                // { percentaje: 20, label: 'Ingresos mes Anterior' },
                // { percentaje: 65, label: 'Retiros mes anterior' },
            ],
        }
    },
    computed: {
        rows() {
            return this.chunk(this.items, 3);
        },
    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.empleadosActivos()
        this.empleadosPlanta()
        this.ingresosMesCurso()
        this.retirosMesCurso()
    },
    methods: {
        chunk(array, size) {
            const chunkedArray = [];
            let index = 0;
            while (index < array.length) {
                chunkedArray.push(array.slice(index, size + index));
                index += size;
            }
            return chunkedArray;
        },
        empleadosActivos() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/empleadosactivos", config)
                .then(function (result) {
                    self.items.push({ percentaje: result.data, label: 'Empleados Activos' })
                });
        },
        empleadosPlanta() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/empleadosplanta", config)
                .then(function (result) {
                    self.items.push({ percentaje: result.data, label: 'Empleados Planta' })
                });
        },
        ingresosMesCurso() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ingresosmescurso", config)
                .then(function (result) {
                    console.log(result.data)
                    self.items.push({ percentaje: result.data, label: 'Ingresos mes en curso' })
                });
        },
        retirosMesCurso() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/retirosmescurso", config)
                .then(function (result) {
                    self.items.push({ percentaje: result.data, label: 'Retiros mes en curso' })
                });
        },
        ingresoMesAnterior() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ingresosmesanterior", config)
                .then(function (result) {
                    console.log(result)
                });
        },
        retiroMesAnterior() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/retirosmesantrior", config)
                .then(function (result) {
                    console.log(result)
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
<style  scoped>
h2 {
    margin: 30px;
}

.row {
    margin-bottom: 30px;
}
</style>