<template>
    <div>
        <div v-if="items.length < 1">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h5>Cargando por favor espere un momento.</h5>
        </div>
        <div v-else>
            <h2>Dashboard</h2>
            <div v-for="(row, index) in rows" :key="index" class="row">
                <GraficoCircular v-for="item in row" :item="item" :key="item.id" :maxPercentage="item.percentaje"
                    :label="item.label" class="col" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import GraficoCircular from "./GraficoCircular.vue";
import {Token} from '../Mixins/Token'
export default {
    components: {
        GraficoCircular
    },
    mixins: [Token],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            items: [],
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
        this.urlExterna ()
        this.empleadosActivos()
        this.empleadosPlanta()
        this.ingresosMesCurso()
        this.retirosMesCurso()
        this.ingresoMesAnterior()
        this.retiroMesAnterior()
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
                    self.items.push({ percentaje: result.data, label: 'Ingresos mes Anterior' })
                });
        },
        retiroMesAnterior() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/retirosmesantrior", config)
                .then(function (result) {
                    self.items.push({ percentaje: result.data, label: 'Retiros mes anterior' })
                });
        },
    }
};
</script>
<style  scoped>
h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

.row {
    margin-bottom: 30px;
}

/*spiner*/
.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 50px;
    color: red;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(10, 10, 10);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(199, 195, 195) transparent transparent transparent;

}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* fin spinner*/
</style>