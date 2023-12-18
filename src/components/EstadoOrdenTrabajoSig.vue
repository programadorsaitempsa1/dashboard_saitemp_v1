<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar estados de ordenes de trabajo</h2>
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
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
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
            URL_API: process.env.VUE_APP_URL_API,
            accion: 'Insertar estado orden de trabajo',
            estado: {},
            estados_contratos: [],
            actualizar_estado_orden_trabajo: false,

            actualizar: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            nombre: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'estadoordenestrabajo',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Estado orden de trabajo", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Descripción", orden: "DESC",tipo:"texto",calculado:'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            idItem: '',
        };
    },
    created() {
        this.getItems()
    },
    methods: {
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/estadoordenestrabajo/" + self.cantidad
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
            this.nombre = response.nombre
            this.descripcion = response.descripcion
            this.idItem = response.id
            this.actualizar = true
            this.accion = 'Editar estado orden de trabajo'
            this.checks = []
        },
        check(check) {
            this.checks = check
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.descripcion = this.descripcion
            } else {
                let self = this;
                let urlEndPoint = ''
                self.estado_ot = {
                    'nombre': this.nombre,
                    'descripcion': this.descripcion,

                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/estadoordenestrabajo/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/estadoordenestrabajo"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.estado_ot, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        clear() {
            this.nombre = ""
            this.descripcion = ""
            this.actualizar = false
            this.accion = "Insertar estado orden de trabajo";
        },
        back() {
            this.$router.go(-1);
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