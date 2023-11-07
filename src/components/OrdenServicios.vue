<template>
    <div class="container">
        <h2>Orden de servicio</h2>
        <div class="card col-xs-12 col-md-6">
            <div id="seccion">
                <h5>Información de la empresa</h5>
                <form class="was-validated" ref="cliente" @submit.prevent="guardarCliente()">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nit / número de documento: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="numero_documento" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombre completo / Razón social: *</label>
                            <textarea class="form-control" required name="" id="razon_social" rows="1"
                                v-model="razon_social"
                                @input="razon_social = formatInputUpperCase($event.target.value)"></textarea>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombre del solicitante: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                @input="nombre_solicitante = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="nombre_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Número de celular: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                @input="celular_solicitante = validarNumero(celular_solicitante)"
                                aria-describedby="emailHelp" v-model="celular_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Correo electrónico: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                @input="correo_solicitante = formatInputUpperCase($event.target.value)"
                                aria-describedby="emailHelp" v-model="correo_solicitante" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Profesional: *" :valida_campo="false" nombreItem="nombre"
                                eventoCampo="getProfesionales" :consulta="profesional" :registros="profesionales"
                                @getProfesionales="getProfesionales" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-4 col-md-4 mb-3">
                            <button type="submit" class="btn btn-success">
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
                <hr>
                <h5>Información del cargo</h5>
                <hr>
                <form class="was-validated" ref="cliente" @submit.prevent="guardarCargos()">
                    <div v-for="item, index in cargos" :key="index">
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Nombre del cargo: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                    @input="item.nombre = formatInputUpperCase($event.target.value)"
                                    aria-describedby="emailHelp" v-model="item.nombre" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <SearchList nombreCampo="Cantidad de personas para el cargo: *" nombreItem="nombre"
                                    eventoCampo="getPersonasCargo" :consulta="cantidad_personas[index]" :index="index"
                                    :registros="personas_cargo" @getPersonasCargo="getPersonasCargo"
                                    placeholder="Seleccione una opción" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Salario: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                    @input="item.salario = validarNumero(item.salario)" aria-describedby="emailHelp"
                                    v-model="item.salario" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Fecha inicio labores: *</label>
                                <input type="date" class="form-control" autocomplete="off" id="exampleInput2"
                                    aria-describedby="emailHelp" v-model="item.fecha_inicio" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Fecha de solicitud: *</label>
                                <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInput2"
                                    aria-describedby="emailHelp" v-model="item.fecha_solicitud" required />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6 mb-3">
                                <label class="form-label">Observaciones: *</label>
                                <textarea class="form-control" required name="" id="observaciones" rows="1"
                                    v-model="item.observaciones"
                                    @input="item.observaciones = formatInputUpperCase($event.target.value)"></textarea>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                                    :consulta="consulta_departamento[index]" :registros="departamentos" :ordenCampo="0"
                                    :index="index" @getMunicipios="getMunicipios" placeholder="Seleccione una opción" />
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios"
                                    :consulta="consulta_municipio[index]" @setMunicipios="setMunicipios" :index="index"
                                    eventoCampo="setMunicipios" :ordenCampo="0" placeholder="Seleccione una opción" />
                            </div>
                        </div>
                        <span v-if="index > 0" id="clasificador2" @click="eliminarCargo(index)" style="cursor: pointer"><i
                                class="bi bi-dash-circle-fill"></i>
                            Eliminar cargo
                        </span>
                        <hr style="clear:both" />
                    </div>
                    <span id="clasificador" @click="agregarCargo()" style="cursor: pointer"><i
                            class="bi bi-plus-circle-fill"></i>
                        Agregar cargo
                    </span>
                    <div class="row mt-3">
                        <div class="col-sm-4 col-md-4 mb-3">
                            <button type="submit" class="btn btn-success">
                                Guardar cargos
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card col-xs-12 col-md-6">
            <form class="was-validated" ref="cliente" @submit.prevent="enviarHojasVida()">
                <div id="seccion">
                    <h5>Enviar hojas de vida</h5>
                    <div class="row" v-for="item, index in cargos" :key="index">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Nombre del cargo: *</label>
                            <input type="text" class="form-control" disabled autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="cargos[index].nombre" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label for="formFileMultiple" class="form-label">Adjuntar hoja de vida</label>
                            <div class="input-group mb-3">
                                <input class="form-control" ref="fileInput" type="file" multiple
                                    @change="cargarArchivo($event, index)" id="formFileMultiple" required>
                                <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos(index)"
                                    id="basic-addon1">Quitar archivo</span>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col botones" v-for="item2, index2 in hojas_vida[index].hojas_vida" :key="index2">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn adjunto"><i class="bi bi-file-earmark-check"></i> {{
                                        item2.name
                                    }} {{ formatearPesoArchivo(item2.size) }}</button>
                                    <button type="button" @click="hojas_vida[index].hojas_vida.splice(index2, 1)"
                                        class="btn btn-success"><i class="bi bi-x"></i></button>
                                </div>
                            </div>
                        </div>
                        <hr style="margin-top:20px" />
                    </div>
                    <div class="row mt-3">
                        <div class="col-sm-4 col-md-4 mb-3">
                            <button type="submit" class="btn btn-success">
                                Enviar hojas de vida
                            </button>
                        </div>
                    </div>
                </div>
                <div id="seccion" style="margin-top:25px">
                    <h5>Hojas de vida enviadas</h5>
                    <div class="row">
                        <table class="table table-striped align-middle table-hover">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Cargo solicitado</th>
                                    <th scope="col">Fecha de envío hojas de vida</th>
                                    <th scope="col">Hojas de vida</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, index in hojas_vida_enviadas" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ cargos[0].nombre }}</td>
                                    <td>
                                        <div class="row" v-for="item, index in 5" :key="index">
                                            <div class="col-12 m-2">
                                                {{ '02/11/2023' }}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row" v-for="item, index in 5" :key="index">
                                            <div class="col-12 m-1">
                                                <button type="button" class="btn btn-success btn-sm">
                                                    <a :href="URL_API + item.ruta" target="_blank"
                                                        style="color:white;text-decoration: none;"
                                                        rel="noopener noreferrer"><i class="bi bi-eye">
                                                            ver hoja de vida</i></a></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import Tabla from './Tabla.vue'
import SearchList from './SearchList.vue'
import { Token } from '../Mixins/Token.js';
import { Alerts } from '../Mixins/Alerts.js';
export default {
    name: '',
    components: {
        SearchList,
        // Tabla
    },
    mixins: [Token, Alerts],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            mensaje_error: '¡Este campo debe ser diligenciado!',
            razon_social: '',
            numero_documento: '',
            nombre_solicitante: '',
            celular_solicitante: '',
            correo_solicitante: '',
            usuario_id: '',
            fecha_solicitud: '',
            ciudad_prestacion_servicio_id: '',
            consulta_municipio: [],
            consulta_municipio_id: [],
            consulta_departamento: [],
            consulta_departamento_id: [],
            departamentos: [],
            municipios: [],
            personas_cargo: [],
            cargos: [{ nombre: '', cantidad_personas: '', salario: '', fecha_inicio: '', fecha_solicitud: '', observaciones: '', ciudad_id: '', cliente_id: '' }],
            cantidad_personas: [],
            profesional: '',
            profesionales: [],
            hojas_vida: [{ cargo: '', hojas_vida: [] }],
            hojas_vida_enviadas: [
                { fecha: '', cargo: '', ruta: '' },
                { fecha: '', cargo: '', ruta: '' },
                { fecha: '', cargo: '', ruta: '' },
            ],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.getDepartamentos(43)
        this.getPersonasCargo()
        if (this.$route.params.id != undefined) {
            // this.getCliente()
        }
    },
    methods: {
        getCliente() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/userslist", config)
                .then(function (result) {
                    self.profesionales = result.data
                });
        },
        getProfesionales(item = null) {
            this.usuario_id = ''
            this.profesional = ''
            if (item != null) {
                this.usuario_id = item.id
                this.profesional = item.nombre
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/userslist", config)
                .then(function (result) {
                    self.profesionales = result.data
                });
        },
        guardarCliente() {
            let self = this;
            let cliente = {
                nit_ndocumento: this.numero_documento,
                nombre_razon_social: this.razon_social,
                nombre_solicitante: this.nombre_solicitante,
                celular_solicitante: this.celular_solicitante,
                correo_solicitante: this.correo_solicitante,
                usuario_id: this.usuario_id
            }
            let config = this.configHeader();
            axios
                .post(self.URL_API + "api/v1/ordenserviciocliente", cliente, config)
                .then(function (result) {
                    console.log(result.data)
                });
        },
        guardarCargos() {
            let self = this;
            let config = this.configHeader();
            axios
                .post(self.URL_API + "api/v1/ordenserviciocargo/" + self.numero_documento, self.cargos, config)
                .then(function (result) {
                    console.log(result.data)
                });
        },
        enviarHojasVida() {
            let self = this;
            let config = this.configHeader();
            self.hojas_vida[0].cargo = this.cargos[0].nombre
            var hojas_vida = this.prepararCargueArchivos()
            axios
                .post(self.URL_API + "api/v1/ordenserviciohojavida/" + self.numero_documento, hojas_vida, config)
                .then(function (result) {
                    console.log(result.data)
                });
        },
        prepararCargueArchivos() {
            const hojas = new FormData();
            this.hojas_vida.forEach(function (item, index) {
                hojas.append('cargo[' + index + '][0]', item.cargo)
                item.hojas_vida.forEach(function (item2, index2) {
                    hojas.append('cargo[' + index + '][' + (index2 + 1) + ']', item2)

                })
            })
            return hojas
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        quitarAdjuntos(index) {
            this.hojas_vida[index].hojas_vida = []
            // this.$refs.fileInput[0].files.splice(0,1)
            // console.log(this.$refs.fileInput[0].files)

        },
        formatearPesoArchivo(pesoBytes) {
            if (pesoBytes < 1024) {
                return `${pesoBytes} bytes`;
            } else if (pesoBytes < 1024 * 1024) {
                return `${Math.ceil(pesoBytes / 1024)} KB`;
            } else if (pesoBytes < 1024 * 1024 * 1024) {
                return `${Math.ceil(pesoBytes / (1024 * 1024))} MB`;
            } else {
                return `${Math.ceil(pesoBytes / (1024 * 1024 * 1024))} GB`;
            }
        },
        cargarArchivo(event, index) {
            var self = this
            var file = event.target.files;
            this.hojas_vida[index].cargo = this.cargos[index].nombre
            for (var j = 0; j < file.length; j++) {
                self.hojas_vida[index].hojas_vida.push(file[j])
            }
        },
        eliminarCargo(index) {
            this.cargos.splice(index, 1)
        },
        agregarCargo() {
            this.cargos.push({ nombre: '', cantidad_personas: '', salario: '', fecha_inicio: '', fecha_solicitud: '', observaciones: '', ciudad_id: '', cliente_id: '' })
            this.hojas_vida.push({ cargo: '', hojas_vida: [] })
        },
        getPersonasCargo(item = null, index = null) {
            if (item != null) {
                // console.log(item, 'item', campo, ' campo', index, ' index')
                this.cargos[index].cantidad_personas = item.nombre
            }
            this.personas_cargo = []
            var valor = ''
            for (let i = 1; i <= 20; i++) {
                valor = '' + i
                this.personas_cargo.push({ id: i, nombre: valor })

            }
        },
        getMunicipios(item, ordenCampo, index) {
            let self = this;
            this.setLabelDepartamento(item, ordenCampo, index)
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/municipios/" + item.id, config)
                .then(function (result) {
                    self.municipios = result.data
                });
        },
        setMunicipios(item, campo, index) {
            if (item != null) {
                switch (campo) {
                    case 0:
                        this.consulta_municipio[index] = item.nombre
                        this.consulta_municipio_id[index] = item.id
                        this.cargos[index].ciudad_id = item.id
                        break
                }
            }
        },
        getDepartamentos(id) {
            let self = this;
            // this.setLabelPais(id)
            id = id.id != undefined ? id.id : id
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/departamentos/" + id, config)
                .then(function (result) {
                    self.departamentos = result.data
                });
        },
        setLabelDepartamento(item = null, campo = null, index = null) {
            if (item != null) {
                switch (campo) {
                    case 0:
                        this.consulta_departamento[index] = item.nombre
                        this.consulta_departamento_id[index] = item.id
                        break
                }
            }
        },

    }
};
</script>
<style scoped>
.card {
    width: 100%;
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

textarea {
    width: 100%;
    border-radius: 5px;
    padding: 15px;
}

#seccion,
.orientacion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

span {
    height: 38px;
}

/* Fin select con filtro personalizado */

#clasificador {
    width: 100%;
    text-align: left;
    float: left;
}

#clasificador2 {
    width: auto;
    text-align: left;
    float: right;
}

.adjunto {
    white-space: nowrap;
    background-color: #239B56;
    color: rgb(255, 255, 255);
    width: 100%;
}

.botones {
    padding: 5px;
}
</style>