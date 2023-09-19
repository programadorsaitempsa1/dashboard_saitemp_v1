<template>
    <div>
        <div class="container">
            <h2>Administrar Empleados</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="nombres" :disabled="diligenciado || checks.length > 1" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="exampleInputEmail2"
                                    aria-describedby="emailHelp" v-model="apellidos" :disabled="diligenciado || checks.length > 1" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Número documento</label>
                                <input type="text" class="form-control" id="exampleInputEmail3"
                                    aria-describedby="emailHelp" v-model="documento_identidad" :disabled="diligenciado || checks.length > 1"
                                    @keyup="validateNumericField(documento_identidad)" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-xs-12 col-md-12">
                                <div>
                                    <label for="exampleFormControlInput1" class="form-label">Tipo de documento</label>
                                    <select class="form-select" v-model="tipo_documento_identidad"
                                        :disabled="diligenciado" @change="tipoDocumentoId(tipo_documento_identidad)"
                                        aria-label="Default select example">
                                        <option v-for="(item, index) in tipos_documentos" :key="index">
                                            {{ item.nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="col-xs-12 col-md-12">
                                <div>
                                    <label for="exampleFormControlInput1" class="form-label">Cargo</label>
                                    <select class="form-select" v-model="sig_cargo" :disabled="diligenciado"
                                        @change="cargoId(sig_cargo)" aria-label="Default select example">
                                        <option v-for="(item, index) in cargos" :key="index">
                                            {{ item.nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <div v-if="userlogued.rol == 'S. Administrador'">
                                <label for="exampleFormControlInput1" class="form-label">Estado</label>
                                <select class="form-select" v-model="estado_empleado" :disabled="diligenciado"
                                    @change="estadoId(estado_empleado)" aria-label="Default select example">
                                    <option v-for="(item, index) in estados" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <label for="exampleFormControlInput1" class="form-label">Firma</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen"
                                        style="cursor: pointer" @click="signature()"></i></span>
                                <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                                    v-model="firmaEmpleado" aria-describedby="basic-addon1" />
                                <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle"
                                        style="cursor: pointer" @click="firma_file = '', firmaEmpleado = ''"></i></span>
                            </div>
                        </div>
                        <FirmaDigital v-if="show_pad" @firma="firma" :signed="signed" />
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
import axios from "axios";
import FirmaDigital from "./FirmaDigital.vue"; // Para la generación de la firma digital se hace uso de la librería vue signature pdf url: https://www.npmjs.com/package/vue-signature-pad
import Tabla from './Tabla.vue';
import {Token} from '../Mixins/Token'
export default {
    mixins:[Token],
    components: {
        FirmaDigital,
        Tabla,
    },
    props: {
        userlogued: {}
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            cargo: "",
            tipos_documentos: [],
            estados: [],
            cargos: [],
            empleados: [],
            empleado: {},
            accion: "Insertar datos empleado",
            item: false,
            show_pad: false,
            signed: false,
            firmaEmpleado: "",
            firma_file: "",
            diligenciado: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            nombres: '',
            apellidos: '',
            documento_identidad: '',
            tipo_documento_identidad: '',
            sig_cargo: '',
            estado_empleado: '',
            sig_cargo_id: '',
            estado_empleado_id: '',
            tipo_documento_identidad_id: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'sigempleados',
            tabla: [
                { nombre: "#", orden: "DESC",calculado:'false' },
                { nombre: "Nombres", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Apellidos", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Tipo de documento", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Número de documento", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Estado del empleado", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Cargo", orden: "DESC",tipo:"texto",calculado:'true' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            idItem: '',
            listas:[]
        };
    },
    created() {
        this.llenarLista()
        this.getTiposDocumento();
        this.getEstadosEmpleado();
        this.getCargos();
        this.getItems();
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
            urlEndPoint = self.URL_API + "api/v1/sigempleados/" + self.cantidad
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
            this.nombres = response.nombres
            this.apellidos = response.apellidos
            this.documento_identidad = response.documento_identidad
            this.tipo_documento_identidad = response.tipo_documento_identidad_id
            this.estado_empleado = response.estado_empleado_id
            this.sig_cargo = response.sig_cargo_id
            this.idItem = response.id
            this.tipoDocumentoId(this.tipo_documento_identidad)
            this.estadoId(this.estado_empleado)
            this.cargoId(this.sig_cargo)
            this.actualizar = true
            this.accion = "Editar datos empleado";
            this.checks = []
        },
        check(check) {
            this.checks = check
        },
        getTiposDocumento() {
            let config = this.configHeader();
            let self = this;
            axios
                .get(self.URL_API + "api/v1/tipodocumentolista", config)
                .then(function (result) {
                    self.tipos_documentos = result.data;
                    self.listas.splice(3,0,result.data)
                });
        },
        getEstadosEmpleado() {
            let config = this.configHeader();
            let self = this;
            axios
                .get(self.URL_API + "api/v1/estadoempleadoslista", config)
                .then(function (result) {
                    self.estados = result.data;
                    self.listas.splice(5,0,result.data)
                });
        },
        getCargos() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/cargoslista", config).then(function (result) {
                self.cargos = result.data;
                self.listas.splice(6,0,result.data)
            });
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.tipo_documento_identidad_id = this.tipo_documento_identidad_id
                this.campos.estado_empleado_id = this.estado_empleado_id
                this.campos.sig_cargo_id = this.sig_cargo_id
            } else {
                let self = this;
                let urlEndPoint = ''
                const form = new FormData();
                form.append("nombres", this.nombres);
                form.append("apellidos", this.apellidos);
                form.append("documento_identidad", this.documento_identidad);
                form.append("estado_empleado_id", this.estado_empleado_id);
                form.append("sig_cargo_id", this.sig_cargo_id);
                form.append(
                    "tipo_documento_identidad_id",
                    this.tipo_documento_identidad_id
                );
                form.append("firma", this.firma_file);
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/sigempleados/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/sigempleados"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, form, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        clear() {
            this.nombres = ''
            this.apellidos = ''
            this.documento_identidad = ''
            this.tipo_documento_identidad = ''
            this.estado_empleado = ''
            this.sig_cargo = ''
            this.tipo_documento_identidad_id = ''
            this.estado_empleado_id = ''
            this.sig_cargo_id = ''
            this.idItem = ''
            this.actualizar = ''
            this.firma_file = ""
            this.firmaEmpleado = ""
            this.actualizar = false;
            this.accion = 'Insertar datos empleado'
        },
        back() {
            this.$router.go(-1);
        },
        tipoDocumentoId(tipo_documento) {
            let self = this;
            var cont = 0;
            this.tipos_documentos.forEach(function (element) {
                if (tipo_documento == element.nombre.trim()) {
                    self.tipo_documento_identidad_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.tipo_documento_identidad_id = "";
            }
        },
        estadoId(estado) {
            let self = this;
            var cont = 0;
            this.estados.forEach(function (element) {
                if (estado == element.nombre.trim()) {
                    self.estado_empleado_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.estado_empleado_id = "";
            }
        },
        cargoId(cargo) {
            let self = this;
            var cont = 0;
            this.cargos.forEach(function (element) {
                if (cargo == element.nombre.trim()) {
                    self.sig_cargo_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.sig_cargo_id = "";
            }
        },
        validateNumericField(numero) {
            try {
                if (numero != "") {
                    if (isNaN(numero)) {
                        this.documento_identidad = numero.substr(
                            0,
                            numero.length - 1
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        signature() {
            this.show_pad = !this.show_pad; // Muestra el pad de firmas para las firmas de los encargados, por defecto esta oculto: false
        },
        firma(firma) {
            let self = this;
            this.firmaEmpleado = firma;
            this.show_pad = false;
            this.urltoFile(
                firma,
                self.documento_identidad + ".png",
                "image/png"
            ).then(function (file) {
                self.firma_file = file;
            });
        },
        urltoFile(url, filename, mimeType) {
            return fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    return new File([buf], filename, { type: mimeType });
                });
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
</style>
