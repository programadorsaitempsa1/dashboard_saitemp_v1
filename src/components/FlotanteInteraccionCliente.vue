<template>
    <div>
        <form class="was-validated" @submit.prevent="save()">

            <!-- <button type="button" class="btn btn-success btn-sm" @click="openModal" data-bs-target="#mi-modal">
                Formulario contratación
            </button> -->

            <span @click="openModal" data-bs-target="#mi-modal">Interacción cliente</span>

            <div class="modal" id="mi-modal">
                <div class="modal-dialog ancho-personalizado ">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" style="color: black;">Registro interacción cliente</h5>
                            <button class="btn-close" type="button" @click="cancelModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col mb-3">
                                    <SearchList nombreCampo="Proceso o área *" @getProcesos="getProcesos"
                                        eventoCampo="getProcesos" nombreItem="nombre" :registros="procesos"
                                        placeholder="Seleccione una opción" :consulta="consulta_proceso" />
                                </div>
                                <div class="col mb-3">
                                    <SearchList nombreCampo="Proceso o área *" @getInteracciones="getInteracciones"
                                        eventoCampo="getInteracciones" nombreItem="nombre"
                                        :registros="respuestas_interaccion" placeholder="Seleccione una opción"
                                        :consulta="consulta_interaccion" />
                                </div>
                            </div>
                            <div class="col mb-3">
                                <label class="form-label">Observación: *</label>
                                <textarea class="form-control" required name="" id="razon_social" rows="10"
                                    v-model="observacion" placeholder="Observación"></textarea>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="cancelModal">Cancelar</button>
                            <!-- <button type="submit" class="btn btn-primary" @click="guardadoParcial">Guardado parcial</button> -->
                            <button type="submit" class="btn btn-primary">Guardar</button>
                            <!-- <button v-if="!guardar" class="registro_cambio" :disabled="deshabilitar_boton" type="button">
                                <RegistroCambio @save="save" />
                            </button> -->
                        </div>
                        <TimeLineInteraccion/>
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
// import RegistroCambio from './RegistroCambio.vue'
import SearchList from './SearchList.vue';
import TimeLineInteraccion from './TimeLineInteraccion.vue';



export default {
    components: {
        // RegistroCambio,
        SearchList,
        TimeLineInteraccion

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
            deshabilitar_boton: false,
            procesos: [],
            respuestas_interaccion: [],
            consulta_interaccion: '',
            consulta_proceso: '',
            interaccion_id: '',
            proceso_id: '',
            observacion: '',
            interaccion: {}
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

    },
    methods: {

        save() {
            let self = this
            this.deshabilitar_boton = true;
            setTimeout(() => {
                this.deshabilitar_boton = false;
            }, 3000);

            this.interaccion.interaccion_id = this.interaccion_id
            this.interaccion.proceso_id = this.proceso_id
            this.interaccion.observacion = this.observacion
            this.interaccion.cliente = this.$route.params.id

            let config = this.configHeader();
            axios
                .post(self.URL_API + "api/v1/interaccioncliente", this.interaccion, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status)
                });

        },

        getProcesos(item = null) {
            let self = this
            if (item != null) {
                this.proceso_id = item.id
                this.consulta_proceso = item.nombre
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/procesos", config)
                .then(function (result) {
                    self.procesos = result.data
                });
        },
        getInteracciones(item = null) {
            let self = this
            if (item != null) {
                this.interaccion_id = item.id
                this.consulta_interaccion = item.nombre
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/interaccion", config)
                .then(function (result) {
                    self.respuestas_interaccion = result.data
                });
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