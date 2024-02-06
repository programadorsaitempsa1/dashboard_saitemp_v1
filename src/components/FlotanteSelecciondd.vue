<template>
    <div>
        <form class="was-validated" @submit.prevent="save">
            <!-- <button type="button" class="btn btn-success btn-sm" @click="openModal" data-bs-target="#mi-modal2">
                Formulario selección
            </button> -->
            <span @click="openModal" data-bs-target="#mi-modal">Formulario selección</span>


            <div class="modal" id="mi-modal2">
                <div class="modal-dialog modal-dialog-scrollable ancho-personalizado">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h5 class="modal-title" style="color: black;">Datos selección</h5>
                            <button class="btn-close" type="button" @click="cancelModal"></button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Contacto:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        @input="contacto_contratacion = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="contacto_contratacion" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Caracteristicas del contacto de la
                                        empresa
                                        usuaria: </label>
                                    <textarea class="form-control" required name="" id="caracteristicas_contacto" rows="1"
                                        v-model="caracteristicas_contacto"
                                        @input="caracteristicas_contacto = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Tipo de proceso:
                                    </label>
                                    <textarea class="form-control" required name="" id="tipo_proceso" rows="1"
                                        v-model="tipo_proceso"
                                        @input="tipo_proceso = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Página oficial:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="pagina_oficial"
                                        maxlength="150" @input="pagina_oficial = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="pagina_oficial" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Actividad:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="actividad"
                                        maxlength="150" @input="actividad = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="actividad" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Fabricación: </label>
                                    <textarea class="form-control" required name="" id="fabricacion" rows="1"
                                        v-model="fabricacion"
                                        @input="fabricacion = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Ubicación de la empresa:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="ubicacion_empresa"
                                        maxlength="150"
                                        @input="ubicacion_empresa = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="ubicacion_empresa" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">¿De que empresa les gusta que el
                                        personal
                                        haya salido?:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off"
                                        id="empresa_personal_retirado" maxlength="150"
                                        @input="empresa_personal_retirado = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="empresa_personal_retirado" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">¿De que empresa no les gusta que el
                                        personal
                                        haya salido?:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off"
                                        id="empresa_personal_no_retirado" maxlength="150"
                                        @input="empresa_personal_no_retirado = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="empresa_personal_no_retirado" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>


                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Unidades de negocio del grupo Crystal:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="unidades_negocio_crystal"
                                        maxlength="150"
                                        @input="unidades_negocio_crystal = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="unidades_negocio_crystal" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Marcas con las que trabajan:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="marcas_trabajan"
                                        maxlength="150" @input="marcas_trabajan = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="marcas_trabajan" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Perfiles autorizados:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="perfiles_autorizados"
                                        maxlength="150"
                                        @input="perfiles_autorizados = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="perfiles_autorizados" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Perfiles no autorizados:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="perfiles_no_autorizados"
                                        maxlength="150"
                                        @input="perfiles_no_autorizados = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="perfiles_no_autorizados" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Presencia (Ubicación):
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="presencia_ubicacion"
                                        maxlength="150"
                                        @input="presencia_ubicacion = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="presencia_ubicacion" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Experiencia:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="experiencia"
                                        maxlength="150" @input="experiencia = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="experiencia" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Edades:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="edades" maxlength="150"
                                        @input="edades = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="edades" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Nivel academico:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="nivel_academico"
                                        maxlength="150" @input="nivel_academico = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="nivel_academico" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Ubicación geografica del candidato:
                                    </label>
                                    <textarea class="form-control" required name="" id="ubicacion_candidato" rows="1"
                                        v-model="ubicacion_candidato"
                                        @input="ubicacion_candidato = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Horarios:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="horarios" maxlength="150"
                                        @input="horarios = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="horarios" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Pruebas psicotecnicas:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="pruebas_psicotecnicas"
                                        maxlength="150"
                                        @input="pruebas_psicotecnicas = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="pruebas_psicotecnicas" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Pruebas tecnicas:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="pruebas_tecnicas"
                                        maxlength="150"
                                        @input="pruebas_tecnicas = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="pruebas_tecnicas" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Candidatos por vacante:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="candidatos_por_vacante"
                                        maxlength="150"
                                        @input="candidatos_por_vacante = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="candidatos_por_vacante" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Vacunación:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="vacunacion"
                                        maxlength="150" @input="vacunacion = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="vacunacion" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Consumo:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="consumo" maxlength="150"
                                        @input="consumo = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="consumo" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Formatos adicionales en el preoceso de
                                        selección:
                                    </label>
                                    <textarea class="form-control" required name="" id="formatos_adicionales_peoceso"
                                        rows="1" v-model="formatos_adicionales_peoceso"
                                        @input="formatos_adicionales_peoceso = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Documentos que debe tener a la mano el
                                        candidato:
                                    </label>
                                    <textarea class="form-control" required name="" id="documentos" rows="1"
                                        v-model="documentos"
                                        @input="documentos = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Perfil oculto:
                                    </label>
                                    <textarea class="form-control" required name="" id="perfil_oculto" rows="1"
                                        v-model="perfil_oculto"
                                        @input="perfil_oculto = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Beneficios de la empresa:
                                    </label>
                                    <textarea class="form-control" required name="" id="beneficios_empresa" rows="1"
                                        v-model="beneficios_empresa"
                                        @input="beneficios_empresa = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Observaciones vinculacion :
                                    </label>
                                    <textarea class="form-control" required name="" id="observaciones" rows="1"
                                        v-model="observaciones"
                                        @input="observaciones = formatInputUpperCase($event.target.value)"></textarea>
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancelar</button>
                            <!-- <button type="submit" class="btn btn-primary" @click="guardadoParcial">Guardado parcial</button> -->
                            <button type="submit" class="btn btn-primary" v-if="guardar">Guardar cambios</button>
                            <button v-if="!guardar" class="registro_cambio" :disabled="deshabilitar_boton" type="button">
                                <RegistroCambio @save="save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { Token } from '../Mixins/Token.js';
import { Alerts } from '../Mixins/Alerts.js';
import RegistroCambio from './RegistroCambio.vue'


export default {
    components: {
        RegistroCambio
    },
    mixins: [Token, Alerts],
    props: {
        cliente_id: {
            type: String,
            default: ''
        },
        razon_social: {
            type: String,
            default: ''
        }

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            modal: this.showModal,
            mensaje_error: '¡Este campo debe ser diligenciado!',
            contacto_contratacion: '',
            caracteristicas_contacto: '',
            tipo_proceso: '',
            pagina_oficial: '',
            actividad: '',
            fabricacion: '',
            ubicacion_empresa: '',
            empresa_personal_retirado: '',
            empresa_personal_no_retirado: '',
            unidades_negocio_crystal: '',
            marcas_trabajan: '',
            perfiles_autorizados: '',
            perfiles_no_autorizados: '',
            presencia_ubicacion: '',
            experiencia: '',
            edades: '',
            nivel_academico: '',
            ubicacion_candidato: '',
            horarios: '',
            pruebas_psicotecnicas: '',
            pruebas_tecnicas: '',
            candidatos_por_vacante: '',
            vacunacion: '',
            consumo: '',
            formatos_adicionales_peoceso: '',
            documentos: '',
            perfil_oculto: '',
            beneficios_empresa: '',
            observaciones: '',
            guardado_parcial: [],
            seleccion: {},
            guardar: false,
            deshabilitar_boton: false,

        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        window.addEventListener('keydown', this.convinacionGuardado);


    },
    created() {
        var self = this
        if (this.cliente_id != '') {
            this.getFormulario()
        }
        self.guardado_parcial = []
        if (localStorage.getItem("Fseleccion") != null && localStorage.getItem("Fseleccion") != '') {
            self.guardado_parcial = JSON.parse(localStorage.getItem("Fseleccion"))
        }
    },
    methods: {
        save(registro_cambios = null) {
            let self = this
            this.deshabilitar_boton = true;
            setTimeout(() => {
                this.deshabilitar_boton = false;
            }, 3000);

            this.crearSeleccion()
            this.seleccion.cliente_id = this.cliente_id
            if (this.guardar) {
                let config = this.configHeader();
                axios
                    .post(self.URL_API + "api/v1/selecciondd", this.seleccion, config)
                    .then(function (result) {
                        self.showAlert(result.data.message,result.data.status)
                    });
            } else {
                this.seleccion.registro_cambios = registro_cambios
                let config = this.configHeader();
                axios
                    .post(self.URL_API + "api/v1/selecciondd/" + this.cliente_id, this.seleccion, config)
                    .then(function (result) {
                        self.showAlert(result.data.message,result.data.status)
                    });
            }
        },

        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        openModal() {
            document.getElementById('mi-modal2').style.display = 'block';
            if (localStorage.getItem("Fseleccion") != null && localStorage.getItem("Fseleccion") != '') {
                // this.agregarSeleccion()
            }
        },
        closeModal() {
            document.getElementById('mi-modal2').style.display = 'none';
        },
        cancelModal() {
            this.closeModal();
        },
        convinacionGuardado(event) {
            if (event.ctrlKey && event.key.toLowerCase() === 's') {
                event.preventDefault();
                // this.guardadoParcial()
            }
        },
        // guardadoParcial() {
        //     var self = this
        //     this.seleccion = {}
        //     this.crearSeleccion()
        //     var posicion = ''
        //     self.guardado_parcial.forEach(function (item, index) {
        //         if (item.razon_social == self.razon_social) {
        //             posicion = index
        //         }
        //     })
        //     if (posicion != '') {
        //         self.guardado_parcial[posicion] = self.seleccion
        //         localStorage.setItem("Fseleccion", JSON.stringify(self.guardado_parcial));
        //     } else {
        //         self.guardado_parcial.push(self.seleccion)
        //         localStorage.setItem("Fseleccion", JSON.stringify(self.guardado_parcial));
        //     }
        //     setTimeout(() => {
        //         this.closeModal()
        //     }, 1000);
        // },
        crearSeleccion() {
            this.seleccion = {
                contacto: this.contacto_contratacion,
                caracteristicas_contacto: this.caracteristicas_contacto,
                tipo_proceso: this.tipo_proceso,
                pagina_oficial: this.pagina_oficial,
                actividad: this.actividad,
                fabricacion: this.fabricacion,
                ubicacion_empresa: this.ubicacion_empresa,
                empresa_personal_retirado: this.empresa_personal_retirado,
                empresa_personal_no_retirado: this.empresa_personal_no_retirado,
                unidades_negocio_crystal: this.unidades_negocio_crystal,
                marcas_trabajan: this.marcas_trabajan,
                perfiles_autorizados: this.perfiles_autorizados,
                perfiles_no_autorizados: this.perfiles_no_autorizados,
                presencia_ubicacion: this.presencia_ubicacion,
                experiencia: this.experiencia,
                edades: this.edades,
                nivel_academico: this.nivel_academico,
                ubicacion_candidato: this.ubicacion_candidato,
                horarios: this.horarios,
                pruebas_psicotecnicas: this.pruebas_psicotecnicas,
                pruebas_tecnicas: this.pruebas_tecnicas,
                candidatos_por_vacante: this.candidatos_por_vacante,
                vacunacion: this.vacunacion,
                consumo: this.consumo,
                formatos_adicionales_peoceso: this.formatos_adicionales_peoceso,
                documentos: this.documentos,
                perfil_oculto: this.perfil_oculto,
                beneficios_empresa: this.beneficios_empresa,
                observaciones: this.observaciones,
                razon_social: this.razon_social
            };

        },
        // agregarSeleccion() {
        //     var self = this
        //     var posicion = ''
        //     self.guardado_parcial.forEach(function (item, index) {
        //         if (item.razon_social == self.razon_social) {
        //             posicion = index
        //         }
        //     })
        //     this.contacto_contratacion = self.guardado_parcial[posicion].contacto
        //     this.caracteristicas_contacto = self.guardado_parcial[posicion].caracteristicas_contacto
        //     this.tipo_proceso = self.guardado_parcial[posicion].tipo_proceso
        //     this.pagina_oficial = self.guardado_parcial[posicion].pagina_oficial
        //     this.actividad = self.guardado_parcial[posicion].actividad
        //     this.fabricacion = self.guardado_parcial[posicion].fabricacion
        //     this.ubicacion_empresa = self.guardado_parcial[posicion].ubicacion_empresa
        //     this.empresa_personal_retirado = self.guardado_parcial[posicion].empresa_personal_retirado
        //     this.empresa_personal_no_retirado = self.guardado_parcial[posicion].empresa_personal_no_retirado
        //     this.unidades_negocio_crystal = self.guardado_parcial[posicion].unidades_negocio_crystal
        //     this.marcas_trabajan = self.guardado_parcial[posicion].marcas_trabajan
        //     this.perfiles_autorizados = self.guardado_parcial[posicion].perfiles_autorizados
        //     this.perfiles_no_autorizados = self.guardado_parcial[posicion].perfiles_no_autorizados
        //     this.presencia_ubicacion = self.guardado_parcial[posicion].presencia_ubicacion
        //     this.experiencia = self.guardado_parcial[posicion].experiencia
        //     this.edades = self.guardado_parcial[posicion].edades
        //     this.nivel_academico = self.guardado_parcial[posicion].nivel_academico
        //     this.ubicacion_candidato = self.guardado_parcial[posicion].ubicacion_candidato
        //     this.horarios = self.guardado_parcial[posicion].horarios
        //     this.pruebas_psicotecnicas = self.guardado_parcial[posicion].pruebas_psicotecnicas
        //     this.pruebas_tecnicas = self.guardado_parcial[posicion].pruebas_tecnicas
        //     this.candidatos_por_vacante = self.guardado_parcial[posicion].candidatos_por_vacante
        //     this.vacunacion = self.guardado_parcial[posicion].vacunacion
        //     this.consumo = self.guardado_parcial[posicion].consumo
        //     this.formatos_adicionales_peoceso = self.guardado_parcial[posicion].formatos_adicionales_peoceso
        //     this.documentos = self.guardado_parcial[posicion].documentos
        //     this.perfil_oculto = self.guardado_parcial[posicion].perfil_oculto
        //     this.beneficios_empresa = self.guardado_parcial[posicion].beneficios_empresa
        //     this.observaciones = self.guardado_parcial[posicion].observaciones
        // },

        getFormulario() {
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/selecciondd/" + this.cliente_id, config)
                .then(function (result) {
                    if (result.data.length > 0) {
                        self.guardar = false
                        self.llenarFormulario(result.data[0])
                    } else {
                        self.guardar = true
                    }

                });
        },
        llenarFormulario(formulario) {
            this.contacto_contratacion = formulario.contacto
            this.actividad = formulario.actividad
            this.beneficios_empresa = formulario.beneficios_empresa;
            this.candidatos_por_vacante = formulario.candidatos_por_vacante;
            this.caracteristicas_contacto = formulario.caracteristicas_contacto;
            this.consumo = formulario.consumo;
            this.contacto = formulario.contacto;
            this.documentos = formulario.documentos;
            this.edades = formulario.edades;
            this.empresa_personal_no_retirado = formulario.empresa_personal_no_retirado;
            this.empresa_personal_retirado = formulario.empresa_personal_retirado;
            this.experiencia = formulario.experiencia;
            this.fabricacion = formulario.fabricacion;
            this.formatos_adicionales_peoceso = formulario.formatos_adicionales_peoceso;
            this.horarios = formulario.horarios;
            this.id = formulario.id;
            this.marcas_trabajan = formulario.marcas_trabajan;
            this.nivel_academico = formulario.nivel_academico;
            this.observaciones = formulario.observaciones;
            this.pagina_oficial = formulario.pagina_oficial;
            this.perfil_oculto = formulario.perfil_oculto;
            this.perfiles_autorizados = formulario.perfiles_autorizados;
            this.perfiles_no_autorizados = formulario.perfiles_no_autorizados;
            this.presencia_ubicacion = formulario.presencia_ubicacion;
            this.pruebas_psicotecnicas = formulario.pruebas_psicotecnicas;
            this.pruebas_tecnicas = formulario.pruebas_tecnicas;
            this.tipo_proceso = formulario.tipo_proceso;
            this.ubicacion_candidato = formulario.ubicacion_candidato;
            this.ubicacion_empresa = formulario.ubicacion_empresa;
            this.unidades_negocio_crystal = formulario.unidades_negocio_crystal;
            this.vacunacion = formulario.vacunacion;
        }
    }
};
</script>
<style scoped>
.ancho-personalizado {
    max-width: 1000px;
    width: 150%;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

.registro_cambio {
    background-color: #198754;
    color: white;
    border: 1px solid #198754;
    padding: 0px 10px 0px 10px;
    padding: 6px;
    border-radius: 5px;
}

.registro_cambio:hover {
    background-color: #146c43;
    border: 1px solid #146c43;
}
</style>