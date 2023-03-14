<template>
    <div>
        <div class="container">
            <h2>Unidad de medida</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="row">
                        <div class="col-xs-12 col-md-12">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Unidad de medida</label>
                                <input type="text" class="form-control" id="exampleInputEmail2"
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
            <!-- <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" @response="response" @clear="clear" /> -->
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
        Tabla
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            accion: 'Insertar unidad de medida',
            unidad_medida: {},
            actualizar: false,
            idItem: '',
            currentUrl: '',
            cantidad: 10,
            // Campos del formulario
            nombre: '',
            descripcion: '',
            // Fin campos del formulario
            // Datos enviados por props al componente tabla
            datos: [],
            endpoint: 'unidadmedida',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre", orden: "DESC" ,tipo:"texto",calculado:'false'},
                { nombre: "Descripción", orden: "DESC",tipo:"texto",calculado:'false' }
            ],
            // Fin datos enviados por props al componente tabla
            checks: [],
            massiveUpdate: false,
            campos: {},
        };
    },

    created() {
        this.getUnideadesMedida()
    },
    methods: {
        getUnideadesMedida() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/unidadmedida/" + self.cantidad
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
            this.accion = 'Editar unidad de medida'
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
                self.unidad_medida = {
                    'nombre': self.nombre,
                    'descripcion': self.descripcion
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/unidadmedida/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/unidadmedida"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.unidad_medida, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getUnideadesMedida()
                        self.clear()
                        self.actualizar = false
                    });
            }
        },
        clear() {
            this.nombre = ''
            this.descripcion = ''
            this.actualizar = false
            this.accion = 'Insertar unidad de medida'
        },
        check(check) {
            this.checks = check
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
        back() {
            this.$router.go(-1);
        }
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
</style>