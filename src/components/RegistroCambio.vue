<template>
    <div>
        <span @click="modal = true">Actualizar</span>
        <div>
            <div class="modal fade show mask" id="exampleModal" :style="modal ? 'display: block' : 'display: none'"
                role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" style="color:black">Registro historial de cambios</h1>
                            <button type="button" @click="modal = !modal" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style="color:black">
                            <form class="was-validated" @submit.prevent="registroCambios()">
                                <div class="row">
                                    <div class="col">
                                        <SearchList nombreCampo="¿Quien solicita la actualización?" nombreItem="nombre"
                                            eventoCampo="getProfesionales" :consulta="consulta_solicitante" :index="1"
                                            :registros="profesionales" @getProfesionales="getProfesionales"
                                            placeholder="Seleccione una opción" />
                                    </div>
                                    <div class="col">
                                        <SearchList nombreCampo="¿Quien autoriza la actualización:?" nombreItem="nombre"
                                            eventoCampo="getProfesionales" :consulta="consulta_autoriza" :index="2"
                                            :registros="profesionales" @getProfesionales="getProfesionales"
                                            placeholder="Seleccione una opción" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col mb-3">
                                        <label class="form-label">Observaciones</label>
                                        <textarea class="form-control" required name="" id="observaciones" rows="10"
                                            v-model="observaciones"
                                            @input="observaciones = formatInputUpperCase($event.target.value)"
                                            :maxlength="maxLength"></textarea>
                                        <p id="contador" :class="{ 'limite-alcanzado': caracteresRestantes < 0 }">Caracteres
                                            restantes: {{ caracteresRestantes }}</p>
                                        <div class="invalid-feedback">
                                            {{ mensaje_error }}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="modal = !modal">Cancelar</button>
                            <button @click.prevent="registroCambios" type="submit" class="btn btn-success"
                                data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import SearchList from './SearchList.vue';
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
export default {
    components: {
        SearchList
    },
    mixins: [Token, Alerts],
    props: {
        showmodal: {
            type: Boolean,
            default: false
        },

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            modal: this.showModal,
            profesionales: [],
            consulta_solicitante: '',
            solicitante_id: '',
            consulta_autoriza: '',
            autoriza_id: '',
            observaciones: '',
            mensaje_error: 'Este campo es requerido',
            maxLength: 1000
        }
    },
    computed: {
        caracteresRestantes: function () {
            return this.maxLength - this.observaciones.length;
        }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        registroCambios() {
            if (this.consulta_solicitante != '' && this.consulta_autoriza != '' && this.observaciones != '') {
                var registro_cambios = {
                    solicitante: this.consulta_solicitante,
                    autoriza: this.consulta_autoriza,
                    observaciones: this.observaciones
                }
                this.modal = false
                this.$emit('save', registro_cambios)

            }
        },
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        getProfesionales(item = null, campo) {
            this.usuario_id = ''
            this.profesional = ''
            if (item != null) {
                this.asignarValor(item, campo)
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
        asignarValor(item, campo) {
            switch (campo) {
                case 1:
                    this.solicitante_id = item.id
                    this.consulta_solicitante = item.nombre.replace('null', '')
                    break;
                case 2:
                    this.autoriza_id = item.id
                    this.consulta_autoriza = item.nombre.replace('null', '')
                    break;
            }
        }
    }
};
</script>
<style scoped>
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.contador{
    margin-top: 15px;
}
</style>