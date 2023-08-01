<template>
    <div class="container">
        <h2>Gestión de solicitud de novedades nómina</h2>
        <div class="card col-xs-12 col-md-6">
            <form>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo destinatario: *</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="focus"
                                aria-describedby="emailHelp" v-model="destinatario"
                                @input="capturaCorreo($event.target.value,1)" rows="1"></textarea>
                            <div class="valida-carreo" v-if="correo_validado" @click="agregaCorreo(destinatario)">{{
                                destinatario
                            }}</div>
                            <span v-if="existen_errados">{{ mensaje_error }}</span>
                        </div>
                    </div>
                    <div class="col-1 first">
                        <button type="submit" class="btn btn-success" @click="cc = !cc">
                            CC
                        </button>
                    </div>
                    <div class="col-1 first">
                        <button type="submit" class="btn btn-success" @click="cco = !cco">
                            CCO
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col lista-correos" v-for="item, index in correos1" :key="index">
                        <button type="buttom" class="btn adjunto" @click="editarCorreo(item, index)">
                            {{ item }}<i class="bi bi-x" @click="correos.splice(index, 1)"></i>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6" v-if="cc">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CC</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="exampleInputEmail3"
                                aria-describedby="emailHelp" v-model="cc_" ></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col lista-correos" v-for="item, index in correos2" :key="index">
                            <button type="buttom" class="btn adjunto" @click="editarCorreo(item, index)">
                                {{ item }}<i class="bi bi-x" @click="correos.splice(index, 1)"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-6" v-if="cco">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CCO</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="exampleInputEmail3"
                                aria-describedby="emailHelp" v-model="cco_" ></textarea>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col lista-correos" v-for="item, index in correos" :key="index">
                        <button type="buttom" class="btn adjunto" @click="editarCorreo(item, index)">
                            {{ item }}<i class="bi bi-x" @click="correos.splice(index, 1)"></i>
                        </button>
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
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Adjuntar archivos</label>
                        <input class="form-control" type="file" @change="cargarArchivo($event)" id="formFileMultiple"
                            multiple>
                    </div>
                </div>
                <div class="row">
                    <div class="col botones" v-for="item, index in file" :key="index">
                        <button type="buttom" class="btn adjunto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                                <path
                                    d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                <path
                                    d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>{{ item.name }}<i class="bi bi-x" @click="file.splice(index, 1);"></i>
                        </button>
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
            // correo: {},
            enviar_correo: false,
            credenciales: true,
            cc: false,
            cco: false,
            cc_: '',
            cco_: '',
            file: [],
            correo_validado: false,
            correos: [],
            correos1: [],
            correos2: [],
            correo: '',
            mensaje_error: '¡Correos con formato herrado!',
            existen_errados: false,
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
            const correo = new FormData();
            correo.append('to', this.correos)
            correo.append('subject', this.asunto)
            correo.append('body', body)
            correo.append('cc', this.cc_)
            correo.append('cco', this.cco_)

            // for (var i = 0; i < this.file.length; i++) {
            this.file.forEach(function (item, index) {
                correo.append('archivo' + index, item)
            })


            axios
                .post(self.URL_API + "api/v1/enviocorreo", correo, config)
                .then(function (result) {
                    console.log(result)
                    // self.showAlert(result.data.message, result.data.status)
                });
        },
        cargarArchivo(event) {
            var self = this
            const file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                self.file.push(file[i])
            }
        },
        capturaCorreo(texto) {
            var self = this
            if (this.destinatario == '') {
                this.existen_errados = false
            }
            var correos_errados = ''
            const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (texto.includes(';')) {
                let correos = texto.split(';')
                correos.forEach(function (item) {
                    if (patron.test(item)) {
                        self.correos.push(item)
                    }
                    else {
                        correos_errados += item + ';'
                        self.existen_errados = true
                    }

                })
                this.destinatario = correos_errados

            }
            if (patron.test(texto)) {
                this.correo_validado = true
                this.correo = texto
            } else {
                this.correo_validado = false

            }
        },
        agregaCorreo(correo) {
            this.correo_validado = false
            this.correos.push(correo)
            this.destinatario = ''
            const focus = document.getElementById("focus");
            focus.focus();
        },
        configHeader() {
            let config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            return config;
        },
        editarCorreo(correo, index) {
            this.correo_validado = true
            this.existen_errados = false
            this.destinatario = correo
            this.correos.splice(index, 1)
            const focus = document.getElementById("focus");
            focus.focus();
        }

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

.first {
    margin-top: 30px;
    white-space: nowrap;
    min-width: 100px;
}

svg {
    font-size: 50px;
}

.adjunto {
    white-space: nowrap;
    margin-bottom: 10px;
    background-color: #239B56;
    color: rgb(255, 255, 255);
    width: 100%;
    max-width: 500px;
}

.botones {
    padding: 5px;
}

.valida-carreo {
    background-color: rgb(255, 255, 255);
    position: relative;
    border: solid #D5DBDB 0.5px;
    border-radius: 5px;
    top: 0px;
    cursor: pointer;

}

.lista-correos {
    margin: 20px 0px 20px 0px;
    max-width: 400px;
}

span {
    float: left;
    color: red;
}
</style>