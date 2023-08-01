<template>
    <div class="container">
        <h2>Gestión de solicitud de novedades nómina</h2>
        <div class="card col-xs-12 col-md-6">
            <form>
                <!-- <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo remitente: *</label>
                            <input type="email" autocomplete="off" :disabled="true" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="remitente" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Contraseña correo: *</label>
                            <input type="password" autocomplete="off" :disabled="credenciales" class="form-control" id="exampleInputEmail2"
                                aria-describedby="emailHelp" v-model="contrasena" />
                        </div>
                    </div>
                </div> -->
                <!-- <div class="row">
                    <div class="col-3">
                        <div class="mb-3">
                            <button type="submit" class="btn btn-success" @click="credenciales = !credenciales">
                               {{ credenciales ? ' Actualizar contraseña':' Guardar credenciales' }}
                            </button>
                        </div>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo destinatario: *</label>
                            <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail3"
                                aria-describedby="emailHelp" v-model="destinatario" />
                        </div>
                    </div>
                    <div class="col-1">
                        <button type="submit" class="btn btn-success" @click="cc = !cc">
                            CC
                        </button>
                    </div>
                    <div class="col-1">
                        <button type="submit" class="btn btn-success" @click="cco = !cco">
                            CCO
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6" v-if="cc">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CC</label>
                            <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail3"
                                aria-describedby="emailHelp" v-model="cc_" />
                        </div>
                    </div>
                    <div class="col-6" v-if="cco">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CCO</label>
                            <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail3"
                                aria-describedby="emailHelp" v-model="cco_" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Asunto: *</label>
                            <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail4"
                                aria-describedby="emailHelp" v-model="asunto" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Descripción: *</label>
                        <br>
                        <EditorTextoHtml :enviar_correo="enviar_correo" @enviar="enviar" />
                        <!-- <EditorTextoHtml :remitente="remitente" :destinatario="destinatario" :contrasena="contrasena"
                            :asunto="asunto" :enviar_correo="enviar_correo" @enviar="enviar" /> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <button type="submit" class="btn btn-success" @click="send()">
                            Enviar correo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import EditorTextoHtml from './EditorTextoHtml.vue';
export default {
    name: '',
    components: {
        EditorTextoHtml
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            remitente: '',
            destinatario: '',
            contrasena: '',
            asunto: '',
            correo: {},
            enviar_correo: false,
            credenciales: true,
            cc: false,
            cco: false,
            cc_: '',
            cco_: '',
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        send() {
            this.enviar_correo = !this.enviar_correo
        },
        enviar(body) {
            let self = this;
            let config = this.configHeader();
            var correo = {}
            correo.to = this.destinatario
            correo.subject = this.asunto
            correo.body = body
            correo.cc = this.cc_
            correo.cco = this.cco_

            axios
                .post(self.URL_API + "api/v1/enviocorreo", correo, config)
                .then(function (result) {
                    console.log(result)
                    // self.showAlert(result.data.message, result.data.status)
                });
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
.card {
    width: 100%;
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
    float: left;
}

.card button {
    margin: auto;
    width: 99%;

}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style>