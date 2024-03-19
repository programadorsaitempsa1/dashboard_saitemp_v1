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
        labels_x: {
            default: '',
            type: []
        },
        datosS: {
            default: '',
            type: String
        },
        datosA: {
            default: '',
            type: []
        },
        items: {
            default: '',
            type: []
        },
        index:{
            type: Number,
            default:0

        }
    },
    data() {
        return {
            loading: false,
            data: {},
            datos2: [],
            grafico: {},
            options: {
                responsive: true
            }
        }
    },
    computed: {

    },
    watch: {
        datosS: function () {
            var datos = JSON.parse(this.datosS)
            this.llenarGraficoMultiple(datos)
            this.loading = true
        },
        datosA: function () {
            this.llenarGrafico(this.datosA)
            this.loading = true
        },
        loading: function () {
            this.graficosCargados()
        }
    },
    mounted() {
    },
    methods: {
        llenarGrafico(datos) {
            let self = this
            this.data.labels = this.labels_x
            var color = ''
            self.data.datasets = []
            color = self.getRandomColor()
            self.data.datasets.push(
                {
                    label: self.items[0],
                    data: datos,
                    backgroundColor: [color],
                    borderColor: [color],
                    borderWidth: 1

                }
            )
        },
        llenarGraficoMultiple(datos) {
            let self = this
            this.data.labels = this.labels_x
            var color = ''
            self.data.datasets = []
            datos.forEach(function (item, index) {
                color = self.getRandomColor()
                self.data.datasets.push(
                    {
                        label: self.items[index],
                        data: item,
                        backgroundColor: [color],
                        borderColor: [color],
                        borderWidth: 1

                    }
                )
            })
        },
        getRandomColor() {
            const allowedColors = [
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(186,157,244,0.8)',
                'rgba(201,153,175,0.8)'
            ];

            // Utilizar un Set para almacenar los colores seleccionados
            const selectedColors = new Set();

            // Mientras haya colores disponibles para seleccionar
            while (selectedColors.size < allowedColors.length) {
                // Seleccionar un índice aleatorio del array de colores permitidos
                const randomIndex = Math.floor(Math.random() * allowedColors.length);

                // Agregar el color al Set (no se agregará si ya está presente)
                selectedColors.add(allowedColors[randomIndex]);
            }

            // Convertir el Set de nuevo a un array y devolver un color aleatorio
            const uniqueColorsArray = Array.from(selectedColors);
            const randomColorIndex = Math.floor(Math.random() * uniqueColorsArray.length);
            return uniqueColorsArray[randomColorIndex];
        },
        graficosCargados(){
            this.$emit('graficoCargado',this.loading, this.index)
        }

    }
};
</script>
<style scoped></style>