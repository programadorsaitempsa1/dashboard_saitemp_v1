<template>
    <div>
        <div v-if="loading">
            <Doughnut :data="data" :options="options" />
        </div>
    </div>
</template>
<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)

export default {
    name: '',
    components: {
        Doughnut
    },
    mixins: [],
    props: {
        label_dataset: {
            default: '',
            type: String
        },
        nombre_grafico: {
            default: '',
            type: String
        },
        datos: {
            default: '',
            type: []
        },
    },
    data() {
        return {
            loading: false,
            nombre_cargos:[],
            cantidad_cargos:[],
            data:{},
            options: {
                responsive: true
            }
        }
    },
    computed: {

    },
    watch: {
        datos: function () {
            let self = this
            Object.values(this.datos[0].cargos).forEach(function (item) {
                self.nombre_cargos.push(item)
            })
            Object.values(this.datos[0].cantidad).forEach(function (item) {
                self.cantidad_cargos.push(item)
            })

            this.llenarGrafico()
            this.loading = true

        }
    },
    mounted() {
    },
    methods: {
        llenarGrafico() {
            this.data = {
                label: this.nombre_grafico,
                labels: this.nombre_cargos, 
                datasets: [{
                    label: this.label_dataset,
                    data: this.cantidad_cargos,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }],

            }
        }
    }
};
</script>
<style scoped></style>