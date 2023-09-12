<template>
    <div class="container">
        <div v-if="loading" class="loading">
            <div class="loader" id="loader">Loading...</div>
        </div>
        <h2>Formulario de supervisión</h2>
        <div class="card col-xs-12 col-md-6">
            <!-- <div>
            <button @click="obtenerGeolocalizacion">Obtener Geolocalización</button>
            <p v-if="geolocalizacion">Latitud: {{ geolocalizacion.latitud }}, Longitud: {{ geolocalizacion.longitud }}</p>
            <p v-if="error">Error: {{ errorMensaje }}</p>
        </div> -->
            <form class="was-validated" @submit.prevent="save()">
                <div id="seccion">
                    <div class="row">
                        <div class="col-sm-12 col-md-3">
                            <label class="form-label">Fecha y hora:</label>
                            <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInput1"
                                aria-describedby="emailHelp" v-model="fecha" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Supervisor encargado:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput2"
                                aria-describedby="emailHelp" v-model="supervisor" disabled />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Persona contactada: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput3"
                                aria-describedby="emailHelp" v-model="contacto" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 mb-3">
                            <SearchTable nombreCampo="Cliente *" eventoCampo="getCliente" @getCliente="getCliente"
                                endpoint="clientesalinstante" :consulta="consulta_cliente" :nombreItem="campos_cliente"
                                :datos="clientes" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6 mb-3">
                            <label class="form-label">Dirección: *</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput4"
                                aria-describedby="emailHelp" v-model="direccion" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- <div class="col-sm-12 col-md-4">
                            <SearchList nombreCampo="Pais: *" @getPaises="getPaises" eventoCampo="getPaises"
                                nombreItem="nombre" :consulta="consulta_pais" :registros="paises" :ordenCampo="1"
                                @getDepartamentos="getDepartamentos" placeholder="Seleccione una opción" />
                        </div> -->
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                                :consulta="consulta_departamento" :registros="departamentos" :ordenCampo="1"
                                @getMunicipios="getMunicipios" placeholder="Seleccione una opción" />
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios"
                                :consulta="consulta_municipio" @setMunicipios="setMunicipios" eventoCampo="setMunicipios"
                                :ordenCampo="1" placeholder="Seleccione una opción" />
                        </div>
                    </div>
                    <div class="row">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Conceptos</label>
                        <div class="row" style=" display: flex; align-items: center;" id="label"
                            v-for="item, index in conceptos" :key="index">
                            <div class="col-sm-4 col-md-4">
                                <label class="form-check-label" for="flexSwitchCheckChecked">{{ item.nombre }}</label>
                            </div>
                            <div class="col-sm-8 col-md-8 radios">
                                <div class="form-check m-2" v-for="item2, index2 in estados_concepto" :key="index2">
                                    <input class="form-check-input" :ref="'checkbox' + index + index2" type="radio"
                                        @click="validaRadio(item, item2, index)" :name="'radio' + index"
                                        :id="'radio' + index + index2" required>
                                    {{ item2.estado_concepto }}
                                </div>
                            </div>
                        </div>
                        <div class="row obs" v-for="item, index in observaciones" :key="item.id">
                            <div class="mb-3" v-if="$route.params.id == undefined">
                                <label for="formFileMultiple" class="form-label">Adjuntar imágenes: * </label>
                                <div class="input-group mb-3">
                                    <input class="form-control" type="file" accept="image/*"
                                        @change="cargarArchivo($event, index)" id="formFileMultiple" multiple required>
                                    <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos(index)"
                                        id="basic-addon1">Quitar imágenes</span>
                                </div>
                            </div>
                            <div class="botones" v-for="item2, index2 in observaciones[index].file" :key="index2">
                                <div v-if="$route.params.id != undefined" class="imagen-observacion"><img :src="item2"
                                        alt="">
                                    <div v-html="item.body"></div>
                                </div>
                                <div v-else class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn adjunto"><i class="bi bi-file-earmark-check"></i>
                                        {{ item2.name | truncate(10, '...')
                                        }} {{ formatearPesoArchivo(item2.size) }}</button>
                                    <button type="button" @click="item['file'].splice(index2, 1)" class="btn btn-success"><i
                                            class="bi bi-x"></i></button>
                                </div>
                            </div>
                            <div class="row editor" v-if="$route.params.id == undefined">
                                <div class="mb-3 ">
                                    <label for="exampleInputEmail1" class="form-label">Observaciones: </label>
                                    <br>
                                    <br>
                                    <EditorTextoHtml :consulta="consulta_texto[index]" :index="index"
                                        @retornoTexto="retornoTexto" :showToolbar="true" />
                                </div>
                            </div>
                            <div class="col-1 trash" v-if="$route.params.id == undefined">
                                <i class="bi bi-trash-fill" v-if="index > 0"
                                    @click="deleteDynamic(observaciones, index, 'identificador')"></i>
                            </div>
                        </div>
                        <span v-if="$route.params.id == undefined" id="clasificador" @click="agregarObservacion()"
                            style="cursor: pointer"><i class="bi bi-plus-circle-fill"></i>
                            Agregar observacion
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Firma *:</label>
                        <div v-if="$route.params.id != undefined" class="imagen_firma"><img :src="imagen_firma_supervisor"
                                alt=""></div>
                        <div v-else class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                                    @click="signature('firma_supervisor')"></i></span>
                            <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                                v-model="firma_supervisor" aria-describedby="basic-addon1">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle"
                                    style="cursor:pointer" @click="firma_supervisor = ''"></i></span>
                        </div>
                        <FirmaDigital class="tochpad" v-if="show_pad1" @firma="firma" :signed="signed" />
                        <div>
                            <label class="form-label">Nombre y firma supervisor encargado:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput5"
                                aria-describedby="emailHelp" v-model="supervisor" disabled />
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Firma *:</label>
                        <div v-if="$route.params.id != undefined" class="imagen_firma"><img
                                :src="imagen_firma_persona_contactada" alt=""></div>
                        <div v-else class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                                    @click="signature('firma_persona_contactada')"></i></span>
                            <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                                v-model="firma_persona_contactada" aria-describedby="basic-addon1">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle"
                                    style="cursor:pointer" @click="firma_persona_contactada = ''"></i></span>
                        </div>
                        <FirmaDigital class="tochpad" v-if="show_pad2" @firma="firma" :signed="signed" />
                        <div>
                            <label class="form-label">Nombre y firma persona contactada:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInput6"
                                aria-describedby="emailHelp" v-model="contacto" disabled />
                        </div>
                    </div>
                </div>
                <div class="row" v-if="$route.params.id == undefined">
                    <div class="col-md-4 col-sm-6">
                        <button type="submit" class="btn btn-success">
                            Guardar formulario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import EditorTextoHtml from './EditorTextoHtml.vue';
import axios from 'axios'
import SearchTable from './SearchTable.vue'
import SearchList from './SearchList.vue'
import FirmaDigital from './FirmaDigital.vue'
export default {
    components: {
        EditorTextoHtml,
        SearchTable,
        SearchList,
        FirmaDigital
    },
    mixins: [],
    props: {
        userlogued: {}
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            concepto: [],
            campos_cliente: ['cod_cli', 'nom_cli'],
            consulta_cliente: '',
            clientes: [],
            codigo_cliente: '',
            contacto: '',
            mensaje_error: '¡Este campo debe ser diligenciado!',
            supervisor: '',
            fecha: '',
            departamentos: [],
            municipios: [],
            consulta_departamento: '',
            consulta_municipio: '',
            fechaHora: '',
            geolocalizacion: null,
            error: null,
            errorMensaje: '',
            direccion: '',
            consulta_pais: '',
            paises: [],
            conceptos: [],
            firma_supervisor: '',
            firma_persona_contactada: '',
            show_pad1: false,
            show_pad2: false,
            signed: false,
            archivo_firma_supervisor: null,
            archivo_firma_persona_contactada: null,
            consulta_texto: [],
            observaciones: [{ body: '', file: [] }],
            estados_concepto: [],
            concepto_estado_formulario: [],
            loading: false,
            imagen_firma_supervisor: '',
            imagen_firma_persona_contactada: '',


        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    filters: {
        truncate(text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        }
    },
    created() {
        this.getCliente()
        this.setSupervisor()
        this.obtenerFechaHoraActual()
        this.getConceptos()
        this.getEstadosConcepto()
        this.getDepartamentos(43)

        if (this.$route.params.id != undefined) {
            this.loading = true
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            document.body.style.overflow = 'hidden';
            this.consultaFormulario(this.$route.params.id)
        }

    },
    methods: {
        save() {
            const formulario = new FormData()
            formulario.append('fecha_hora', this.fecha)
            formulario.append('supervisor', this.userlogued.usuario_id)
            formulario.append('persona_contactada', this.contacto)
            formulario.append('cliente', this.codigo_cliente)
            formulario.append('direccion', this.direccion)
            formulario.append('ciudad', this.municipio)
            formulario.append('firma_supervisor', this.archivo_firma_supervisor)
            formulario.append('firma_persona_contactada', this.archivo_firma_persona_contactada)
            this.concepto_estado_formulario.forEach(function (item) {
                formulario.append('concepto_estado[]', item.concepto + '*' + item.estado)
            })
            this.observaciones.forEach(function (item, index) {
                formulario.append('imagen[' + index + '][0]', item.body)
                item.file.forEach(function (item2, index2) {
                    formulario.append('imagen[' + index + '][' + (index2 + 1) + ']', item2)
                })
            })
            let self = this;
            let config = this.configHeader();
            axios
                .post(self.URL_API + "api/v1/formulariosupervision", formulario, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                });

        },
        firma(firma) {
            if (this.show_pad1) {
                this.firma_supervisor = firma
                this.funcionGenericaUrlaArchivo(firma, 'firma_supervisor')
            }
            if (this.show_pad2) {
                this.firma_persona_contactada = firma
                this.funcionGenericaUrlaArchivo(firma, 'firma_persona_contactada')
            }
            this.show_pad1 = false
            this.show_pad2 = false
        },

        funcionGenericaUrlaArchivo(firma, campo) {
            var self = this
            this.urltoFile(firma, campo + '.png', 'image/png')
                .then(function (file) {
                    if (campo == 'firma_supervisor') {
                        self.archivo_firma_supervisor = file
                    }
                    if (campo == 'firma_persona_contactada') {
                        self.archivo_firma_persona_contactada = file
                    }
                });
        },

        urltoFile(url, filename, mimeType) {
            return (fetch(url)
                .then(function (res) { return res.arrayBuffer(); })
                .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
            );
        },

        signature(campo) {
            if (campo == 'firma_supervisor') {
                this.show_pad1 = !this.show_pad1
                this.show_pad2 = false
            } if (campo == 'firma_persona_contactada') {
                this.show_pad2 = !this.show_pad2
                this.show_pad1 = false
            }
        },
        setSupervisor() {
            this.supervisor = this.userlogued.nombres + ' ' + this.userlogued.apellidos
        },
        obtenerFechaHoraActual() {
            const ahora = new Date();
            const anio = ahora.getFullYear();
            const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
            const dia = ahora.getDate().toString().padStart(2, '0');
            const horas = ahora.getHours().toString().padStart(2, '0');
            const minutos = ahora.getMinutes().toString().padStart(2, '0');
            const fechaHoraActual = `${anio}-${mes}-${dia}T${horas}:${minutos}`;
            this.fecha = fechaHoraActual;
        },
        validaRadio(item, item2, index) {
            this.concepto_estado_formulario.splice(index, 1, { concepto: item.concepto_id, estado: item2.id })
        },
        getCliente(item = null) {
            if (item != null) {
                this.codigo_cliente = item.split(" ")[0]
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/clientesai", config)
                .then(function (result) {
                    self.clientes = result.data

                });
        },
        getConceptos() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/conceptosformulario", config)
                .then(function (result) {
                    self.conceptos = result.data
                    self.concepto_estado_formulario = new Array(self.conceptos.length)
                });
        },
        getEstadosConcepto() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadosconceptoformulario", config)
                .then(function (result) {
                    self.estados_concepto = result.data

                });
        },
        getPaises() {
            if (this.paises == '') {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/paises", config)
                    .then(function (result) {
                        self.paises = result.data
                    });
            }
        },
        getDepartamentos(id) {
            let self = this;
            // this.setLabelPais(item, ordenCampo, index)
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/departamentos/" + id, config)
                .then(function (result) {
                    self.departamentos = result.data
                });
        },
        getMunicipios(item) {
            let self = this;
            // this.setLabelDepartamento(item, ordenCampo, index)
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/municipios/" + item.id, config)
                .then(function (result) {
                    self.municipios = result.data
                });
        },
        setMunicipios(item) {
            if (item != null) {
                this.municipio = item.id;
                this.consulta_municipio = item.nombre
            }
        },
        obtenerGeolocalizacion() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.geolocalizacion = {
                            latitud: position.coords.latitude,
                            longitud: position.coords.longitude
                        };
                        this.errorMensaje = '';
                    },
                );
            } else {
                this.errorMensaje = 'Geolocalización no compatible con este navegador.';
            }
        },
        cargarArchivo(event, index) {
            var self = this
            const file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                self.observaciones[index].file.push(file[i])
            }
        },
        quitarAdjuntos(index) {
            this.observaciones[index].file = []
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
        agregarObservacion() {
            this.verLista = this.verLista + 1
            if (this.observaciones.length <= 10) {
                this.observaciones.push({ body: '', file: [] })
            }

        },
        retornoTexto(index, texto) {
            this.observaciones[index].body = texto
            this.consulta_texto[index] = texto
        },
        deleteDynamic(array, index, identificador = null) {
            if (identificador != null) {
                this.consulta_texto.splice(index, 1)
                this.observaciones[index].file = []
            }
            array.splice(index, 1)
        },
        consultaFormulario(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formulariosupervision/" + id, config)
                .then(function (result) {
                    self.llenarFormulario(result.data)
                    self.loading = false
                    document.body.style.overflow = 'auto';
                });
        },
        llenarFormulario(item) {
            var self = this
            this.fecha = item.fecha_hora
            this.Supervisor = item.supervisor
            this.contacto = item.persona_contactada
            this.direccion = item.direccion
            this.consulta_cliente = item.nombre_cliente
            this.codigo_cliente = item.cod_cli
            this.imagen_firma_supervisor = this.URL_API + item.firma_supervisor
            this.imagen_firma_persona_contactada = this.URL_API + item.firma_persona_contactada
            this.consulta_pais = item.pais
            this.consulta_departamento = item.departamento
            this.consulta_municipio = item.municipio

            for (let i = 0; i < this.conceptos.length; i++) {
                for (let j = 0; j < this.estados_concepto.length; j++) {
                    const refName = `checkbox${i.toString()}${j.toString()}`;
                    if (item.conceptos[i].estado_concepto_id - 1 == j) {
                        this.$refs[refName][0].checked = true
                    }
                }
            }

            var observacion = ''
            var posicion_observacion = 0
            item.observaciones.forEach(function (item) {
                if (observacion != item.observacion) {
                    console.log(item.observacion)
                    observacion = item.observacion
                    self.observaciones.splice(posicion_observacion, 0, { body: item.observacion, file: [] })
                }
                self.observaciones[posicion_observacion].file.push(self.URL_API + item.imagen_observacion)

            })
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
    }
};
</script>
<style scoped>
#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.adjunto {
    white-space: nowrap;
    margin-bottom: 10px;
    background-color: #239B56;
    color: rgb(255, 255, 255);
    width: 100%;
}

.btn-group {
    overflow: auto;
}

.bi bi-x {
    margin: 20px 0px 20px 0px;
    max-width: 400px;
    cursor: pointer;
}

.card button {
    margin: auto;
    width: 99%;

}


.botones {
    padding: 5px;
}

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

#label {
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
}

.imagen_firma {
    width: 100%;
}

.imagen_firma img {
    width: 40%;
}

.imagen-observacion {
    /* width: 30px; */
    border: solid #D5DBDB 0.5px;
    border-radius: 5%;
    padding: 10px;
    margin: auto;
    width: 70%;
}

.imagen-observacion img {
    width: 100%;
    border-radius: 5%;
}

.tochpad {
    width: 100%;
}

.obs{
    width: 100%;
    padding: 0px;
    margin: 0px;
}

.editor{
    width: 100%;
    padding: 0px;
    margin: 0px;
}

@media screen and (min-width: 1000px) {
    .radios {
        display: flex;
        justify-content: space-between;
    }

    .container {
        width: 100%;
    }

}

@media screen and (max-width: 1000px) {
    #seccion {
        padding: 0px;
        border: none;
    }
    .card {
        margin: 0px;
    }
}


/* Loading */
.loading {
    background-color: rgba(252, 252, 252, 0.63);
    position: fixed;
    width: 100%;
    height: 1000px;
    /* top: 0%; */
    left: 0%;
    z-index: 200;
}

.loader {
    font-size: 15px;
    margin: 20% auto;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    z-index: 500;
}


@-webkit-keyframes load4 {

    0%,
    100% {
        box-shadow: 0em -3em 0em 0.2em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 0em #006b3f;
    }

    12.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 0.2em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    25% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 0.2em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    37.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 0.2em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    50% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 0.2em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    62.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 0.2em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    75% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0.2em #006b3f, -2em -2em 0 0em #006b3f;
    }

    87.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 0.2em #006b3f;
    }
}

@keyframes load4 {

    0%,
    100% {
        box-shadow: 0em -3em 0em 0.2em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 0em #006b3f;
    }

    12.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 0.2em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    25% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 0em #006b3f, 3em 0em 0 0.2em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    37.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 0em #006b3f, 2em 2em 0 0.2em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 -0.5em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    50% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 0em #006b3f, 0em 3em 0 0.2em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 -0.5em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    62.5% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 0em #006b3f, -2em 2em 0 0.2em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 -0.5em #006b3f;
    }

    75% {
        box-shadow: 0em -3em 0em -0.5em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0.2em #006b3f, -2em -2em 0 0em #006b3f;
    }

    87.5% {
        box-shadow: 0em -3em 0em 0em #006b3f, 2em -2em 0 -0.5em #006b3f, 3em 0em 0 -0.5em #006b3f, 2em 2em 0 -0.5em #006b3f, 0em 3em 0 -0.5em #006b3f, -2em 2em 0 0em #006b3f, -3em 0em 0 0em #006b3f, -2em -2em 0 0.2em #006b3f;
    }

}

/* Fin loading */
</style>