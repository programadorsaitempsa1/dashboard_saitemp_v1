<template>
    <div>
        <div class="container">
            <h2>Administrar permisos de usuario</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                        <input type="text" class="form-control" :disabled="checks.length > 1" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="nombre" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Descripción</label>
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                v-model="descripcion"></textarea>
                        </div>
                    </div>
                    <button v-if="permisos[15].autorizado" type="submit" class="btn btn-success" @click="save()">
                        {{!actualizar ? 'Guardar':'Actualizar'}}
                    </button>
                    <button type="submit" class="btn btn-warning" @click="clear">
                        Limpiar
                    </button>
                    <button type="submit" class="btn btn-primary" @click="back">
                        Atrás
                    </button>

                </form>
            </div>
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos" :editar="permisos[16].autorizado" :eliminar="permisos[17].autorizado"
                @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Tabla from './Tabla.vue';
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
import { Permisos } from '../Mixins/Permisos.js';
export default {
    components: {
        Tabla
    },
    props: {
        menu: []
    },
    mixins: [Token, Alerts,Permisos],
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            accion: "Insertar permiso",
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            nombre: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'permisos',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre rol", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Descripcion", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            ruta: '',
            actualizar:false
        };
    },
    mounted() {
        this.ruta = this.$route.path.substring(1)
    },
    // watch: {
    //     ruta() {
    //         this.autorizado(this.menu)
    //     }
    // },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/permisos/" + self.cantidad
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
            this.accion = "Editar rol"
            this.checks = []
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.nombre = this.nombre
                this.campos.descripcion = this.descripcion
            } else {
                let self = this;
                let urlEndPoint = ''
                self.permiso = {
                    'nombre': this.nombre,
                    'descripcion': this.descripcion,
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/permisos/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/permisos"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.permiso, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        clear() {
            this.nombre = ''
            this.descripcion = ''
            this.actualizar = false
            this.accion = "Insertar rol"
        },
        check(check) {
            this.checks = check
        },
        back() {
            this.$router.go(-1);
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
</style>