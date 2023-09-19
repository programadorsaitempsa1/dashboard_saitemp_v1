<!-- <template>
    <div>
        <div class="container">
            <h2>Categoría item de costo</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="row">
                        <div class="col-xs-12 col-md-12">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Categoría</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" :disabled="this.checks.length > 1"
                                    aria-describedby="emailHelp" v-model="nombre" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Descripción</label>
                            <div class="mb-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                    v-model="descripcion"></textarea>
                            </div>
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
import Tabla from './Tabla.vue'
export default {
    components: {
        Tabla
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            accion: 'Insertar categoría',
            actualizar: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            codigo: {},
            idItem: '',
            // Campos formulario
            nombre: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada a la tabla por props
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Categoría", orden: "DESC" ,tipo:"texto",calculado:'false'},
                { nombre: "Descripción", orden: "DESC",tipo:"texto",calculado:'false' }
            ],
            datos: [],
            endpoint: 'codigoitem',
            // fIn info enviada a la tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},

        };
    },
    created() {
        this.getCategoriaItem()
    },

    methods: {
        getCategoriaItem() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/codigoitem/" + self.cantidad
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
            this.actualizar = true
            this.currentUrl = response.currentUrl
            this.nombre = response.nombre
            this.descripcion = response.descripcion
            this.idItem = response.id
            this.accion = 'Editar categoría'
            this.checks = []
        },
        save() {
            if (this.checks.length > 0) {
                this.massiveUpdate = !this.massiveUpdate
                this.campos.nombre = this.nombre
                this.campos.descripcion = this.descripcion

            } else {

                let self = this
                var urlEndPoint = ''
                self.codigo = {
                    'nombre': self.nombre,
                    'descripcion': self.descripcion
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/codigoitem/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/codigoitem"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.codigo, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getCategoriaItem()
                        self.clear()
                        self.actualizar = false
                    });
            }
        },
        clear() {
            this.nombre = ''
            this.descripcion = ''
            this.actualizar = false
            this.accion = 'Insertar categoría'
        },
        check(check) {
            this.checks = check
        },
        back() {
            this.$router.go(-1);
        },
        showAlert(mensaje, icono) {
            this.$swal({
                position: "top",
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: 1500,
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

span {
    margin: auto;
}

.col {
    margin-bottom: 20px;
}
</style> -->