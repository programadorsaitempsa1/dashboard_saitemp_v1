<template>
    <div>
        <div v-if="loading">
            <Bar :data="data" :options="options" />
        </div>
    </div>
</template>
<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: '',
    components: {
        Bar
    },
    mixins: [],
    props: {
        label_dataset: {
            default: '',
            type: String
        },
        label_dataset2: {
            default: '',
            type: String
        },
        nombre_grafico: {
            default: '',
            type: String
        },
        labels: {
            default: '',
            type: []
        },
        datos: {
            default: '',
            type: []
        },
        datos2: {
            default: '',
            type: []
        },
    },
    data() {
        return {
            loading: false,
            data: {},
            options: {
                responsive: true
            }
        }
    },
    computed: {

    },
    watch: {
        datos: function () {
            this.llenarGrafico()
            this.loading = true
        }
    },
    mounted() {
    },
    methods: {
        llenarGrafico() {
            this.data = {
                labels: this.labels,// ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [
                    {
                        label: this.label_dataset,
                        data: this.datos,//[100, 20, 12, 40, 80, 12, 40, 20, 12, 40, 20, 12],
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
                    }

                ],
            }
            if (this.label_dataset2 != '') {
                this.data.datasets.push({
                    label: 'Cargos solicitados',
                    data: [30, 50, 70, 10, 30, 20, 50, 10, 50, 10, 10, 12],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        // 'rgba(255, 159, 64, 0.8)',
                        // 'rgba(255, 205, 86, 0.8)',
                        // 'rgba(75, 192, 192, 0.8)',
                        // 'rgba(54, 162, 235, 0.8)',
                        // 'rgba(153, 102, 255, 0.8)',
                        // 'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        // 'rgb(255, 159, 64)',
                        // 'rgb(255, 205, 86)',
                        // 'rgb(75, 192, 192)',
                        // 'rgb(54, 162, 235)',
                        // 'rgb(153, 102, 255)',
                        // 'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }, {
                    label: 'Hojas de vida enviadas',
                    data: [10, 15, 40, 20, 50, 45, 15, 10, 70, 10, 10, 12],
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.8)',
                        // 'rgba(255, 159, 64, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        // 'rgba(75, 192, 192, 0.8)',
                        // 'rgba(54, 162, 235, 0.8)',
                        // 'rgba(153, 102, 255, 0.8)',
                        // 'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        // 'rgb(255, 99, 132)',
                        // 'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        // 'rgb(75, 192, 192)',
                        // 'rgb(54, 162, 235)',
                        // 'rgb(153, 102, 255)',
                        // 'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'vancantes efectivas',
                    data: [20, 25, 35, 20, 30, 45, 15, 10, 50, 18, 24, 12],
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.8)',
                        // 'rgba(255, 159, 64, 0.8)',
                        // 'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        // 'rgba(54, 162, 235, 0.8)',
                        // 'rgba(153, 102, 255, 0.8)',
                        // 'rgba(201, 203, 207, 0.8)'
                    ],
                    borderColor: [
                        // 'rgb(255, 99, 132)',
                        // 'rgb(255, 159, 64)',
                        // 'rgb(255, 205, 86)',
                        // 'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        // 'rgb(153, 102, 255)',
                        // 'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                })
            }
        }
    }
};
</script>
<style scoped></style>