<template>
    <div>
        <div class="container">
            <h2>Datos básicos del empleado</h2>
            <div class="card col-xs-12 col-md-12">
                <form>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Tipo de identificación:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="tipo_identificacion" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Número de identificación:</label>
                                <input type="text" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
                                    v-model="numero_identificacion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fecha de expedición documento:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="fecha_expedicion" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Salario:</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="salario" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombres:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="nombres" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="fecha_nacimiento" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Departamento de residencia:</label>
                                <input type="text" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
                                    v-model="departamento_residencia" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Ciudad de residencia:</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="ciudad_residencia" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Barrio:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="barrio" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Dirección:</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="direccion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Género:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="genero" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fondo de salud (actual):</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="fondo_salud" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Corrreo electrónico:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="correo" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Número de contacto:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="numero_contacto" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Contacto de emergencia:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                    v-model="contacto_emergencia"></textarea>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Celular de contacto:</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="celular_contacto" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fondo Pension (Actual):</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="fondo_pension_actual" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">CCF (Actual):</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="ccf_actual" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" @click="atras()">
                        Atrás
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Token} from '../Mixins/Token'

export default {
    mixins:[Token],
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            tipo_identificacion: '',
            salario: '',
            numero_identificacion: '',
            departamento_residencia: '',
            fecha_expedicion: '',
            ciudad_residencia: '',
            fecha_nacimiento: '',
            barrio: '',
            nombres: '',
            direccion: '',
            genero: '',
            contacto_emergencia: '',
            correo: '',
            fondo_salud: '',
            numero_contacto: '',
            celular_contacto: '',
            fondo_pension_actual: '',
            ccf_actual: '',
            parametro_ruta: this.$route.params.id
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.getUser()
    },
    methods: {
        atras() {
            this.$router.push({ name: "empleados", params: { id: this.numero_identificacion } });
        },
        getUser() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/datosempleado/" + this.parametro_ruta, config)
                .then(function (result) {
                    self.llenarFormulario(result.data);
                });
        },
        llenarFormulario(result) {
            this.tipo_identificacion = result.des_tip
            this.salario = result.sal_bas
            this.numero_identificacion = result.num_ide
            this.departamento_residencia = result.nom_dep
            this.fecha_expedicion = result.fec_expdoc
            this.ciudad_residencia = result.nom_ciu
            this.fecha_nacimiento = result.fec_nac
            this.barrio = result.barrio
            this.nombres = result.nombre
            this.direccion = result.dir_res
            this.genero = result.sexo
            this.contacto_emergencia = result.avi_emp
            this.correo = result.e_mail
            this.fondo_salud = result.salud
            this.numero_contacto = result.tel_cel
            this.celular_contacto = result.tel_res
            this.fondo_pension_actual = result.pension
            this.ccf_actual = result.caja
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