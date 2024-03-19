<!-- <template>
    <div>
        <div class="container">
            <h2>Reporte Items</h2>
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
                :listas="listas" @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Tabla from './Tabla.vue';
export default {
    components: {
        Tabla
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            tabla: [
                // { nombre: "#", orden: "DESC" },
                { nombre: "Orden de trabajo", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "item", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Categoría", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Subregión", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Contrato", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Unidad de medida", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "valor unitario", orden: "DESC", tipo: "numero", calculado: 'false' },
                { nombre: "Cantidad", orden: "DESC", tipo: "numero", calculado: 'false' },
                { nombre: "Valor total item", orden: "DESC", tipo: "numero", calculado: 'false' },
                { nombre: "Descripción", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Encargado", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Fecha de inserción", orden: "DESC", tipo: "fecha", calculado: 'false' },
            ],
            actualizar: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            datos: [],
            endpoint: 'items',
            checks: [],
            massiveUpdate: false,
            campos: {},
            idItem: '',
            listas: []
        };
    },
    created() {
        this.llenarLista()
        this.getItems()
    },
    methods: {
        llenarLista() {
            this.tabla.forEach((item) => {
                if (item.calculado == 'false') {
                    this.listas.push([])
                }
            })
            this.listas.push([])
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/items/" + self.cantidad
            if (this.currentUrl != '') {
                urlEndPoint = this.currentUrl
            }
            let config = this.configHeader();
            axios
                .get(urlEndPoint, config)
                .then(function (result) {
                    self.datos = result;
                });
        },
        response() {

        },
        clear() {

        },
        check() {

        },
        configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },


    },
};
</script>
<style scoped>
h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style> -->