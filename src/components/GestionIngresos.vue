<template>
    <div class="container">
        <Loading :loading="loading" />
        <h2>Solicitud de servicio</h2>
        <form class="was-validated" @submit.prevent="save()">
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row" v-if="$route.params.id != undefined">

                    <h6 style="text-align: left;">Radicado: {{ radicado }}</h6>

                </div>
                <div class="row">
                    <div class="col" v-if="$route.params.id != undefined">
                        <label class="form-label">Fecha radicado</label>
                        <input type="datetime-local" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="fecha_radicado" disabled />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado: *" @getEstadosIngreso="getEstadosIngreso"
                            eventoCampo="getEstadosIngreso" nombreItem="nombre" :consulta="consulta_estado_ingreso"
                            :registros="estados_ingreso" placeholder="Seleccione una opción" :valida_campo="false" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Responsable: *" @getEncargados="getEncargados"
                            eventoCampo="getEncargados" nombreItem="nombre" :consulta="consulta_responsable_ingreso"
                            :registros="lista_encargados" placeholder="Seleccione una opción" :valida_campo="false" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Empresa usuaria: *" @getEmpresasCliente="getEmpresasCliente"
                            eventoCampo="getEmpresasCliente" nombreItem="nombre" :consulta="consulta_empresa_cliente"
                            :registros="empresas_cliente" placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de servicio: *" @getTipoServicio="getTipoServicio"
                            eventoCampo="getTipoServicio" nombreItem="nombre" :consulta="consulta_tipo_servicio"
                            :registros="tipos_servicio" placeholder="Seleccione una opción" />
                    </div>
                    <div class="col" v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4">
                        <label class="form-label">Número de vacantes</label>
                        <input type="text" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="numero_vacantes"
                            @input="numero_vacantes = validarNumero(numero_vacantes)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col" v-if="tipo_servicio_id == 2">
                        <label class="form-label">Número de contrataciones</label>
                        <input type="text" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="numero_contrataciones"
                            @input="numero_contrataciones = validarNumero(numero_contrataciones)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3" v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4">
                        <label class="form-label">Citación entrevista: *
                        </label>
                        <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="citacion_entrevista" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col" v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4">
                        <SearchList nombreCampo="Profesional: *" @getUsuarios="getUsuarios" eventoCampo="getUsuarios"
                            nombreItem="nombre" :consulta="consulta_usuario" :registros="usuarios"
                            placeholder="Seleccione una opción" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3" v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4">
                        <label class="form-label">Informe selección: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="informe_seleccion"
                            @input="informe_seleccion = formatInputUpperCase($event.target.value)"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Fecha de ingreso: *</label>
                        <input type="date" class="form-control" autocomplete="off" id="fecha_expedicion"
                            aria-describedby="emailHelp" v-model="fecha_ingreso" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de
                            identificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion"
                            @input="numero_identificacion = validarNumero(numero_identificacion)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Apellidos y nombres: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="nombres" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Número contacto: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="celular_candidato"
                            @input="celular_candidato = validarNumero(celular_candidato)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Cargo: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="cargo" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Salario: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="salario" @input="salario = validarNumero(salario)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais: *" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nombre" :consulta="consulta_pais" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento: *" nombreItem="nombre" eventoCampo="getDepartamentos"
                            :consulta="consulta_departamento" :registros="departamentos" @getMunicipios="getMunicipios"
                            placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad: *" nombreItem="nombre" :registros="municipios" :ordenCampo="1"
                            :consulta="consulta_municipio" @setMunicipios="setMunicipios" eventoCampo="setMunicipios"
                            placeholder="Seleccione una opción" />
                    </div>
                </div>
                <div class="row">

                    <div class="col mb-3">
                        <label class="form-label">EPS: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="eps" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="AFP: *" @getAFP="getAFP" eventoCampo="getAFP" nombreItem="nombre"
                            :consulta="consulta_afp" :registros="lista_afp" :ordenCampo="1" :valida_campo="false"
                            placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="¿Stradata verificado:? *"
                            @getAfirmacionNegacion="getAfirmacionNegacion" eventoCampo="getAfirmacionNegacion"
                            @setAfirmacionNegacion="setAfirmacionNegacion" nombreItem="nombre"
                            :consulta="consulta_stradata" :registros="afirmacionNegacion" :ordenCampo="1"
                            :valida_campo="false" placeholder="Seleccione una opción" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Novedades: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="novedades"
                            @input="novedades = formatInputUpperCase($event.target.value)"></textarea>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Laboratorio: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="laboratorio" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Exámenes: *
                        </label>
                        <textarea name="" id="examenes" class="form-control" rows="1" v-model="examenes"
                            @input="examenes = formatInputUpperCase($event.target.value)"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Fecha examen: *
                        </label>
                        <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_examen" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Cambio fecha: *
                        </label>
                        <input type="datetime-local" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="cambio_fecha" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Correo notificación<noscript></noscript>: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <button class="btn btn-success m-4" :disabled="deshabilitar_boton" type="button"
                    @click="envioCorreo">Enviar formulario</button>
            </div>
            <div class="row" style="text-align:left;clear:both;margin-top: 40px;">
                <h5 @click="adjuntos = !adjuntos" style="cursor:pointer">Adjuntar archivos <i v-if="adjuntos"
                        class="bi bi-chevron-down"></i><i v-if="!adjuntos" class="bi bi-chevron-compact-up"></i></h5>
            </div>
            <h6 class="tituloseccion" v-if="adjuntos">Carga de archivos</h6>
            <div id="seccion" v-if="adjuntos">
                <div class="row upload" v-for="item, index in fileInputsCount" :key="index">
                    <div class="col-2" v-if="$route.params.id != null">
                        <a :href="URL_API + item.ruta" target="_blank" rel="noopener noreferrer"><button type="button"
                                :class="item.ruta != undefined ? 'btn btn-sm ver' : 'btn btn-sm btn-secondary'"><i
                                    class="bi bi-eye"> ver</i></button></a>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" :disabled="true"
                                v-model="item.nombre"></textarea>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" :id="'seleccionArchivos' + index"
                                :accept="fileInputsCount[index].tipo_archivo" @change="cargarArchivo($event, index)"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                                :="item.nombre.includes('*') && item.ruta == undefined">
                            <button class="btn btn-outline-secondary" type="button" @click="deleteFile(index)"
                                id="inputGroupFileAddon04">Quitar
                                archivo</button>
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1"
                                v-model="observacion_archivo[index]"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-success m-4" :disabled="deshabilitar_boton" type="submit">Guardar formulario</button>
            <div class="row" style="text-align:left;clear:both;margin-bottom: 40px;">
                <h5 @click="envio_correo = !envio_correo" style="cursor:pointer">Envío correo <i v-if="envio_correo"
                        class="bi bi-chevron-down"></i><i v-if="!envio_correo" class="bi bi-chevron-compact-up"></i>
                </h5>
            </div>
            <SolicitudNovedadesNomina v-if="$route.params.id != undefined && envio_correo" :menu="menu" />
            <div class="row" style="text-align:left;clear:both;margin-bottom: 40px;">
                <h5 @click="historico_correos = !historico_correos" style="cursor:pointer">Historico correos enviados <i
                        v-if="historico_correos" class="bi bi-chevron-down"></i><i v-if="!historico_correos"
                        class="bi bi-chevron-compact-up"></i>
                </h5>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { Token } from '../Mixins/Token.js';
import Loading from './Loading.vue';
import SearchList from './SearchList.vue';
import SolicitudNovedadesNomina from './SolicitudNovedadesNomina.vue';
import { Alerts } from '../Mixins/Alerts.js';
import { Scroll } from '../Mixins/Scroll.js';

export default {
    components: {
        SearchList,
        Loading,
        SolicitudNovedadesNomina
    },
    mixins: [Token, Alerts, Scroll],
    props: {
        menu: []
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            ingresos_responsables: [],
            consulta_responsable_ingreso: '',
            responsable_ingreso_id: '',
            contratacion_responsables: [],
            consulta_responsable_contratacion: '',
            responsable_contratacion_id: '',
            fecha_ingreso: '',
            numero_identificacion: '',
            nombres: '',
            empresas_cliente: [],
            consulta_empresa_cliente: '',
            empresa_cliente_id: '',
            cargo: '',
            salario: '',
            celular_candidato: '',
            eps: '',
            lista_afp: [],
            consulta_afp: '',
            afp_id: '',
            paises: [],
            consulta_pais: '',
            pais_id: '',
            departamentos: [],
            consulta_departamento: '',
            departamento_id: '',
            municipios: [],
            consulta_municipio: '',
            municipio_id: '',
            fileInputsCount: [],
            fileInputsCountCopia: [],
            observacion_archivo: [],
            novedades: '',
            laboratorio: '',
            fecha_examen: '',
            examenes: '',
            afirmacionNegacion: '',
            mensaje_error: '¡Este campo debe ser diligenciado!',
            deshabilitar_boton: false,
            registroIngreso: [],
            consulta_stradata: '',
            verificado_stradata: '',
            file: [],
            id_cliente: '',
            responsable: '',
            estado: '',
            loading: true,
            fecha_radicado: '',
            tipos_servicio: [],
            consulta_tipo_servicio: '',
            tipo_servicio_id: '',
            numero_contrataciones: '',
            numero_vacantes: '',
            citacion_entrevista: '',
            usuarios: [],
            consulta_usuario: '',
            usuario_id: '',
            informe_seleccion: '',
            cambio_fecha: '',
            radicado: '',
            estados_ingreso: '',
            estado_ingreso_id: '',
            consulta_estado_ingreso: '',
            lista_encargados: '',
            consulta_encargado: '',
            encargado_id: '',
            correo: '',
            adjuntos: false,
            envio_correo: false,
            historico_correos: false,
            gestioningresocorreos: []

        }
    },
    computed: {

    },
    watch: {
        $route() {
            this.limpiarFormulario()
        }
    },
    mounted() {
        window.addEventListener('keydown', this.combinacionGuardado);

    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.combinacionGuardado);

    },
    created() {
        this.getArchivosIngreso()
        this.fileInputsCountCopia = [...this.fileInputsCount]
        this.scrollTop()
        this.historicoCorreos()
    },
    methods: {

        envioCorreo() {
            console.log('prueba')
        },
        combinacionGuardado(event) {
            if (event.ctrlKey && event.key.toLowerCase() === 's') {
                event.preventDefault();
                this.save();
            }
        },
        getEstadosIngreso(item = null) {
            if (item != null) {
                this.estado_ingreso_id = item.id
                this.consulta_estado_ingreso = item.nombre
                this.consulta_encargado = ''
                this.encargado_id = ''
                this.lista_encargados = []
                this.getEncargados(null, item.id)
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadosingresos", config)
                .then(function (result) {
                    self.estados_ingreso = result.data
                });
        },
        getEncargados(item = null, id = null) {
            if (item != null) {
                this.encargado_id = item.id
                this.consulta_encargado = item.nombre
            }
            if (id != null) {
                let self = this;
                let config = this.configHeader();
                axios
                    .get(self.URL_API + "api/v1/responsableingresos/" + id, config)
                    .then(function (result) {
                        self.lista_encargados = result.data
                    });
            }
        },
        getResponsablesIngresos(item = null) {
            if (item != null) {
                this.consulta_responsable_ingreso = item.nombre
                this.responsable_ingreso_id = item.id
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/resposablesingresos", config)
                .then(function (result) {
                    self.ingresos_responsables = result.data
                });
        },
        getResponsablesContratacion(item = null) {
            if (item != null) {
                this.consulta_responsable_contratacion = item.nombre
                this.responsable_contratacion_id = item.id
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/resposablescontratacion", config)
                .then(function (result) {
                    self.ingresos_responsables = result.data
                });
        },
        getEmpresasCliente(item = null) {
            if (item != null) {
                this.consulta_empresa_cliente = item.nombre
                this.empresa_cliente_id = item.id
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/empresascliente", config)
                .then(function (result) {
                    self.empresas_cliente = result.data
                });
        },
        getAFP(item = null) {
            if (item != null) {
                this.consulta_afp = item.nombre
                this.afp_id = item.id
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/afp", config)
                .then(function (result) {
                    self.lista_afp = result.data
                });
        },
        getArchivosIngreso() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/archivosingreso", config)
                .then(function (result) {
                    if (self.$route.params.id == undefined) {
                        self.loading = false
                    }
                    self.fileInputsCount = result.data
                    self.id_cliente = self.$route.params.id
                    if (self.id_cliente != undefined) {
                        self.getRegistroIngreso(self.id_cliente)
                    }
                });

        },
        getAfirmacionNegacion() {
            this.afirmacionNegacion = [{ id: '1', nombre: 'Autorizado' }, { id: '0', nombre: 'No autorizado' }]
        },
        setAfirmacionNegacion(item, campo) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.consulta_stradata = item.nombre
                        break
                }
            }
        },
        getPaises(item = null) {
            if (item != null) {
                this.paises_id = item.id
                this.consulta_pais = item.nombre
                if (this.consulta_pais == 'No aplica') {
                    this.consulta_departamento = 'No aplica'
                    this.consulta_municipio = 'No aplica'
                    this.municipio_id = 1
                }
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/paises", config)
                .then(function (result) {
                    self.paises = result.data
                });
        },
        getDepartamentos(item, ordenCampo, index) {
            let self = this;
            this.setLabelPais(item, ordenCampo, index)
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/departamentos/" + item.id, config)
                .then(function (result) {
                    self.departamentos = result.data
                });
        },
        setLabelPais(item = null, campo = null) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.consulta_pais = item.nombre
                        this.pais_id = item.id
                        break
                }
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
        setLabelDepartamento(item = null, campo = null) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.consulta_departamento = item.nombre
                        break
                }
            }
        },
        setMunicipios(item, campo) {
            if (item != null) {
                switch (campo) {
                    case 1:
                        this.municipio_id = item.id;
                        this.consulta_municipio = item.nombre
                        break
                }
            }
        },
        getLaboratorios(item = null) {
            if (item != null) {
                console.log(item)
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/laboratorios/" + this.municipio_laboratorio_id, config)
                .then(function (result) {
                    self.laboratorios_medicos = result.data
                });
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        save() {
            let self = this
            self.loading = true
            self.scrollTop()
            this.deshabilitar_boton = true;
            setTimeout(() => {
                this.deshabilitar_boton = false;
            }, 3000);
            if (this.validaCampo()) {
                this.loading = false
                return
            }
            this.crearRegistroIngreso()

            var url = '';
            if (this.$route.params.id != undefined) {
                url = self.URL_API + "api/v1/formularioingreso/" + this.$route.params.id
            } else {
                url = self.URL_API + "api/v1/formularioingreso"
            }
            let config = this.configHeader();
            axios
                .post(url, this.registroIngreso, config)
                .then(function (result) {
                    if (result.data.message == 'ok') {
                        self.guardarArchivos(result.data.registro_ingreso_id)
                    }

                });
        },
        validaCampo() {
            if (this.empresa_cliente_id == '') {
                this.showAlert('Debe diligenciar el campo de empresa cliente para guardar el formulario', 'error')
                return true
            }
            if (this.tipo_servicio_id == '') {
                this.showAlert('Debe diligenciar el campo tipo de servicio para guardar el formulario', 'error')
                return true
            }
            if (this.municipio_id == '') {
                this.showAlert('Debe diligenciar el campo de ciudad para guardar el formulario', 'error')
                return true
            }
        },
        crearRegistroIngreso() {
            this.registroIngreso = {
                fecha_ingreo: this.fecha_ingreso,
                numero_identificacion: this.numero_identificacion,
                nombre_completo: this.nombres,
                empresa_cliente_id: this.empresa_cliente_id,
                cargo: this.cargo,
                salario: this.salario,
                municipio_id: this.municipio_id,
                numero_contacto: this.celular_candidato,
                eps: this.consulta_eps,
                afp_id: this.afp_id,
                consulta_stradata: this.consulta_stradata,
                novedades: this.novedades,
                laboratorio: this.laboratorio,
                examenes: this.examenes,
                fecha_examen: this.fecha_examen,
                tipo_servicio_id: this.tipo_servicio_id,
                numero_contrataciones: this.numero_contrataciones,
                numero_vacantes: this.numero_vacantes,
                citacion_entrevista: this.citacion_entrevista,
                profesional: this.consulta_usuario,
                informe_seleccion: this.informe_seleccion,
                cambio_fecha: this.cambio_fecha,
                consulta_encargado: this.consulta_encargado,
                estado_id: this.estado_ingreso_id
            }
        },
        cargarArchivo(event, index) {
            const file = event.target.files[0];
            this.file[index] = file;
        },
        deleteFile(index) {
            this.file.splice(index, 1)
            document.getElementById("seleccionArchivos" + index).value = ''

        },
        guardarArchivos(registro_ingreso_id) {
            let self = this;
            let config = this.configHeader();
            const document = new FormData();
            var bandera = 0
            this.file.forEach(function (item, index) {
                if (item.size > self.limite) {
                    self.showAlert('El archivo' + item.name + 'es demasiado pesado, el limite es de 3MB', 'error')
                    bandera++
                }
                document.append('documento' + index, item)
                if (self.fileInputsCount[index].tipo_documento_id != undefined) {
                    document.append('id' + index, self.fileInputsCount[index].tipo_documento_id)
                    document.append('observacion' + index, self.observacion_archivo[index])
                } else {
                    document.append('id' + index, self.fileInputsCount[index].id)
                    document.append('observacion' + index, self.observacion_archivo[index])
                }
            })
            if (bandera <= 0) {
                axios
                    .post(self.URL_API + "api/v1/formularioingreso/doc/" + registro_ingreso_id, document, config)
                    .then(function (result) {
                        self.loading = false
                        self.showAlert(result.data.message, result.data.status)
                        self.limpiarFormulario()
                    });
            } else {
                let self = this
                let config = this.configHeader();
                axios
                    .delete(self.URL_API + "api/v1/formularioingreso/" + registro_ingreso_id, config)
                    .then(function (result) {
                        self.loading = false
                        self.showAlert(result.data.message, result.data.status)
                    });
            }
        },
        getRegistroIngreso(id_cliente) {
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/formularioingresobyid/" + id_cliente, config)
                .then(function (result) {
                    self.llenarFormulario(result.data)
                    self.loading = false
                    self.scrollAuto()

                });
        },
        getTipoServicio(item = null) {
            if (item != null) {
                this.consulta_tipo_servicio = item.nombre
                this.tipo_servicio_id = item.id
                if (item.id == 2) {
                    this.numero_vacantes = ''
                } else if (item.id == 3 || item.id == 4) {
                    this.numero_contrataciones = ''
                    this.citacion_entrevista = ''
                    this.consulta_usuario = ''
                    this.usuario_id = ''
                    this.informe_seleccion = ''

                }
            }
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/tiposserviofi", config)
                .then(function (result) {
                    self.tipos_servicio = result.data
                });
        },
        getUsuarios(item = null) {
            if (item != null) {
                this.usuario_id = item.id;
                this.consulta_usuario = item.nombre
            }

            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/userslist", config)
                .then(function (result) {
                    self.usuarios = result.data
                });

        },
        llenarFormulario(item) {
            let self = this
            this.fecha_ingreso = item.fecha_ingreso
            this.numero_identificacion = item.numero_identificacion
            this.nombres = item.nombre_completo
            this.empresa_cliente_id = item.cliente_id
            this.consulta_empresa_cliente = item.razon_social
            this.cargo = item.cargo
            this.salario = item.salario
            this.municipio_id = item.municipio_id
            this.consulta_municipio = item.municipio
            this.celular_candidato = item.numero_contacto
            this.eps = item.eps
            this.afp_id = item.afp_id
            this.consulta_afp = item.afp
            this.consulta_stradata = item.estradata
            this.novedades = item.novedades
            this.laboratorio = item.laboratorio
            this.examenes = item.examenes
            this.fecha_examen = item.fecha_examen
            this.departamento_id = item.departamento_id
            this.consulta_departamento = item.departamento
            this.pais_id = item.pais_id
            this.consulta_pais = item.pais
            this.responsable = item.responsable_ingreso
            this.estado = item.estado_ingreso
            this.fecha_radicado = item.fecha_radicado
            this.tipo_servicio_id = item.tipo_servicio_id
            this.consulta_tipo_servicio = item.nombre_servicio
            this.numero_vacantes = item.numero_vacantes
            this.cambio_fecha = item.cambio_fecha
            this.numero_contrataciones = item.numero_contrataciones
            this.citacion_entrevista = item.citacion_entrevista
            this.consulta_usuario = item.profesional
            this.informe_seleccion = item.informe_seleccion
            this.radicado = item.numero_radicado
            this.consulta_responsable_ingreso = item.responsable_ingreso
            this.consulta_estado_ingreso = item.estado_ingreso
            this.estado_ingreso_id = item.estado_ingreso_id
            this.getEncargados(null, item.estado_ingreso_id)

            this.fileInputsCount.forEach(function (item2, index) {
                item.archivos.forEach(function (item3) {
                    if (item2.id == item3.arhivo_id) {
                        self.fileInputsCount[index].ruta = item3.ruta
                        self.observacion_archivo[index] = item3.observacion
                    }
                })

            })
        },
        limpiarFormulario() {
            this.fecha_ingreso = ''
            this.numero_identificacion = ''
            this.nombres = ''
            this.empresa_cliente_id = ''
            this.consulta_empresa_cliente = ''
            this.cargo = ''
            this.salario = ''
            this.pais_id = ''
            this.consulta_pais = ''
            this.departamento_id = ''
            this.consulta_departamento = ''
            this.municipio_id = ''
            this.consulta_municipio = ''
            this.numero_contacto = ''
            this.eps = ''
            this.afp_id = ''
            this.afp = ''
            this.consulta_stradata = ''
            this.novedades = ''
            this.laboratorio = ''
            this.examenes = ''
            this.fecha_examen = ''
            this.consulta_responsable_ingreso = ''
            this.consulta_estado_ingreso = ''
            this.estado_ingreso_id = ''
            this.getArchivosIngreso()

        },
        historicoCorreos() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/consultacorreo/43/670", config)
                .then(function (result) {
                    self.gestioningresocorreos = result.data
                });
        }

    }
};
</script>

<style scoped>
/* .seccion {
    width: 100%;
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
} */

#seccion,
.orientacion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.tituloseccion {
    position: relative;
    display: inline-block;
    background-color: white;
    padding: 5px;
    top: 22px;
}

span {
    height: 38px;
}


label {
    float: left;
    margin: 20px 0px 5px 0px;
}

.ver {
    background-color: #006b3f;
    color: white;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style>