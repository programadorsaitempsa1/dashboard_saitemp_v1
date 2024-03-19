<template>
    <div>
        <form class="was-validated" @submit.prevent="save()">

            <!-- <button type="button" class="btn btn-success btn-sm" @click="openModal" data-bs-target="#mi-modal">
                Formulario contratación
            </button> -->

            <span @click="openModal" data-bs-target="#mi-modal">Formulario contratación</span>

            <div class="modal" id="mi-modal">
                <div class="modal-dialog ancho-personalizado ">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" style="color: black;">Datos contratación</h5>
                            <button class="btn-close" type="button" @click="cancelModal"></button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Contacto:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        @input="contacto = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="contacto" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Cargo:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="200" @input="cargo = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="cargo" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Teléfono:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="20" aria-describedby="emailHelp" v-model="telefono"
                                        @input="telefono = validarNumero(telefono)" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Número celular:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="20" aria-describedby="emailHelp" v-model="celular"
                                        @input="celular = validarNumero(celular)" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Correo electrónico:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="200"
                                        @input="correo_electronico = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="correo_electronico" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Hora de ingreso primer día: </label>
                                    <input type="time" class="form-control" autocomplete="off" aria-describedby="emailHelp"
                                        id="hora_ingreso" v-model="hora_ingreso" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Correo de confirmación de ingresos:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="200" @input="correo_ingresos = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="correo_ingresos" required />
                                    <div class="invalid-feedback">
                                        {{ mensaje_error }}
                                    </div>
                                </div>

                                <div class="col mb-3">
                                    <label class="form-label" style="color: black;">Otrosí solicitados:
                                    </label>
                                    <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                        maxlength="150" @input="otro_si = formatInputUpperCase($event.target.value)"
                                        aria-describedby="emailHelp" v-model="otro_si" />
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancelar</button>
                            <!-- <button type="submit" class="btn btn-primary" @click="guardadoParcial">Guardado parcial</button> -->
                            <button type="submit" class="btn btn-primary" v-if="guardar">Guardar
                                cambios</button>
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
        RegistroCambio,

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
            contacto: '',
            cargo: '',
            correo_electronico: '',
            telefono: '',
            celular: '',
            hora_ingreso: '',
            correo_ingresos: '',
            otro_si: '',
            guardado_parcial: [],
            contratacion: {},
            deshabilitar_boton: false,
            guardar: true
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
        if (localStorage.getItem("Fcontratacion") != null && localStorage.getItem("Fcontratacion") != '') {
            self.guardado_parcial = JSON.parse(localStorage.getItem("Fcontratacion"))
        }
    },
    methods: {

        save(registro_cambios = null) {
            let self = this
            this.deshabilitar_boton = true;
            setTimeout(() => {
                this.deshabilitar_boton = false;
            }, 3000);

            this.crearContratacion()
            this.contratacion.cliente_id = this.cliente_id
            if (this.guardar) {
                let config = this.configHeader();
                axios
                    .post(self.URL_API + "api/v1/contrataciondd", this.contratacion, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status)
                    });
            } else {
                this.contratacion.registro_cambios = registro_cambios
                let config = this.configHeader();
                axios
                    .post(self.URL_API + "api/v1/contrataciondd/" + this.cliente_id, this.contratacion, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status)
                    });
            }
        },
        getFormulario() {
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/contrataciondd/" + this.cliente_id, config)
                .then(function (result) {
                    if (result.data.length > 0) {
                        self.guardar = false
                        self.llenarFormulario(result.data[0])
                    } else {
                        self.guardar = true
                    }

                });
        },

        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        openModal() {
            document.getElementById('mi-modal').style.display = 'block';
            if (localStorage.getItem("Fcontratacion") != null && localStorage.getItem("Fcontratacion") != '') {
                // this.agregarContratacion()
            }
        },
        closeModal() {
            document.getElementById('mi-modal').style.display = 'none';
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
        //     this.contratacion = {}
        //     this.crearContratacion()
        //     var posicion = ''
        //     self.guardado_parcial.forEach(function (item, index) {
        //         if (item.razon_social == self.razon_social) {
        //             posicion = index
        //         }
        //     })
        //     if (posicion != '') {
        //         self.guardado_parcial[posicion] = self.contratacion
        //         localStorage.setItem("Fcontratacion", JSON.stringify(self.guardado_parcial));
        //     } else {
        //         self.guardado_parcial.push(self.contratacion)
        //         localStorage.setItem("Fcontratacion", JSON.stringify(self.guardado_parcial));
        //     }
        //     this.showAlert('Registro guarado exitosamente', 'success')
        //     setTimeout(() => {
        //         this.closeModal()
        //     }, 1000);
        // },
        crearContratacion() {
            this.contratacion = {
                contacto: this.contacto,
                cargo: this.cargo,
                correo_electronico: this.correo_electronico,
                telefono: this.telefono,
                celular: this.celular,
                correo_ingresos: this.correo_ingresos,
                hora_ingreso: this.hora_ingreso,
                otro_si: this.otro_si,
            };

        },
        // agregarContratacion() {
        //     var self = this
        //     var posicion = ''
        //     self.guardado_parcial.forEach(function (item, index) {
        //         if (item.razon_social == self.razon_social) {
        //             posicion = index
        //         }
        //     })
        //     this.contacto = self.guardado_parcial[posicion].contacto
        //     this.cargo = self.guardado_parcial[posicion].cargo
        //     this.correo_electronico = self.guardado_parcial[posicion].correo_electronico
        //     this.telefono = self.guardado_parcial[posicion].telefono
        //     this.celular = self.guardado_parcial[posicion].celular
        //     this.hora_ingreso = self.guardado_parcial[posicion].hora_ingreso
        //     this.correo_ingresos = self.guardado_parcial[posicion].correo_ingresos
        //     this.otro_si = self.guardado_parcial[posicion].otro_si
        // },
        llenarFormulario(formulario) {
            this.contacto = formulario.contacto
            this.cargo = formulario.cargo
            this.correo_electronico = formulario.correo
            this.telefono = formulario.telefono
            this.celular = formulario.celular
            this.hora_ingreso = formulario.hora_ingreso
            this.correo_ingresos = formulario.correo_confirmacion
            this.otro_si = formulario.otro_si
        }

    }
};
</script>
<style scoped>
.ancho-personalizado {
    max-width: 900px;
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