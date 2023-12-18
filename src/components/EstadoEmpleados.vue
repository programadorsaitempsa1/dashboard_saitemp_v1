<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar Estados empleados</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                        <input type="text" class="form-control" :disabled="checks.length > 1" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="nombre" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Descripción</label>
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                v-model="descripcion"></textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success" @click="save()">
                        Guardar
                    </button>
                    <button type="submit" class="btn btn-warning" @click="clear">
                        Limpiar
                    </button>
                    <button type="submit" class="btn btn-primary" @click="back">
                        Atrás
                    </button>

                </form>
            </div>
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos" :listas="listas"
                @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';
export default {
    components: {
        Tabla,
    },
    data() {
        return {
            actualizar_estado_contrato: false,
            accion: 'Insertar estado empleado',
            URL_API: process.env.VUE_APP_URL_API,
            actualizar: false,
            idItem: '',
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            nombre: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'estadoempleados',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Estado empleado", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Descripcion", orden: "DESC",tipo:"texto",calculado:'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            listas:[]
        };
    },

    created() {
        this.getItems()
        this.llenarLista()
    },

    methods: {
        llenarLista(){
            this.tabla.forEach((item)=>{
                if(item.calculado == 'false'){
                    this.listas.push([])
                }
            })
            this.listas.push([])
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/estadoempleados/" + self.cantidad
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
        response(response) {
            this.currentUrl = response.currentUrl
            this.idItem = response.id
            this.nombre = response.nombre
            this.descripcion = response.descripcion
            this.actualizar = true
            this.accion = 'Editar estado empleado'
            this.checks = []
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.descripcion = this.descripcion
            } else {
                let self = this;
                let urlEndPoint = ''
                self.empleado = {
                    'nombre': this.nombre,
                    'descripcion': this.descripcion,
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/estadoempleados/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/estadoempleados"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.empleado, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        showAlert(mensaje, icono) {
            this.$swal({
                position: 'top',
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: 1500,
            })
        },
        clear() {
            this.nombre = ""
            this.descripcion = ""
            this.actualizar = false
            this.accion = "Insertar estado empleado";
        },
        check(check) {
            this.checks = check
        },
        back() {
            this.$router.go(-1);
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
.card {
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
    float: left;
}

.card button {
    margin: 15px;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style> -->