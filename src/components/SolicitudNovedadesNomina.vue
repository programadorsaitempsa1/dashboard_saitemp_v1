<template>
    <div class="container">
        <div v-if="loading" class="loading">
            <div class="loader" id="loader">Loading...</div>
        </div>
        <h2>Gestión de solicitud de novedades nómina</h2>
        <div class="card col-xs-12 col-md-6">
            <form>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo destinatario: *</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="focus"
                                aria-describedby="emailHelp" v-model="destinatario"
                                @input="capturaCorreo($event.target.value, 1)" rows="1"></textarea>
                            <div class="valida-carreo" v-if="correo_validado" @click="agregaCorreo(destinatario, 1)">{{
                                destinatario
                            }}</div>
                            <span v-if="existen_errados" class="error">{{ mensaje_error }}</span>
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
                    <div class="col lista-correos" v-for="item, index in correos" :key="index">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" @click="editarCorreo(item, index, 1)" class="btn adjunto">{{ item
                            }}</button>
                            <button type="button" @click="correos.splice(index, 1)" class="btn btn-success"><i
                                    class="bi bi-x"></i></button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6" v-if="cc">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CC</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="focus1"
                                aria-describedby="emailHelp" v-model="cc_" @input="capturaCorreo($event.target.value, 2)"
                                rows="1"></textarea>
                            <div class="valida-carreo" v-if="correo_validado1" @click="agregaCorreo(cc_, 2)">{{
                                cc_ }}</div>
                            <span v-if="existen_errados1" class="error">{{ mensaje_error }}</span>
                        </div>
                    </div>
                    <div class="row" v-if="cc">
                        <div class="col lista-correos" v-for="item, index in correos1" :key="index">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" @click="editarCorreo(item, index, 2)" class="btn adjunto">{{ item
                                }}</button>
                                <button type="button" @click="correos1.splice(index, 1)" class="btn btn-success"><i
                                        class="bi bi-x"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-6" v-if="cco">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">CCO</label>
                            <textarea type="text" autocomplete="off" class="form-control" id="focus2"
                                aria-describedby="emailHelp" v-model="cco_" @input="capturaCorreo($event.target.value, 3)"
                                rows="1"></textarea>
                            <div class="valida-carreo" v-if="correo_validado2" @click="agregaCorreo(cco_, 3)">{{
                                cco_ }}</div>
                            <span v-if="existen_errados2" class="error">{{ mensaje_error }}</span>
                        </div>
                    </div>
                    <div class="row" v-if="cco">
                        <div class="col lista-correos" v-for="item, index in correos2" :key="index">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" @click="editarCorreo(item, index, 3)" class="btn adjunto">{{ item
                                }}</button>
                                <button type="button" @click="correos2.splice(index, 1)" class="btn btn-success"><i
                                        class="bi bi-x"></i></button>
                            </div>
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
                        <EditorTextoHtml :enviar_correo="enviar_correo" @valida_campos="valida_campos" />
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Adjuntar archivos</label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="file" @change="cargarArchivo($event)" id="formFileMultiple"
                                multiple>
                            <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos()"
                                id="basic-addon1">Quitar archivos</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col botones" v-for="item, index in file" :key="index">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn adjunto"><i class="bi bi-file-earmark-check"></i> {{ item.name
                            }} {{ formatearPesoArchivo(item.size) }}</button>
                            <button type="button" @click="file.splice(index, 1)" class="btn btn-success"><i
                                    class="bi bi-x"></i></button>
                        </div>
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
            enviar_correo: false,
            credenciales: true,
            cc: false,
            cco: false,
            cc_: '',
            cco_: '',
            file: [],
            correo_validado: false,
            correo_validado1: false,
            correo_validado2: false,
            correos: [],
            correos1: [],
            correos2: [],
            correo: '',
            mensaje_error: '¡Correos con formato herrado!',
            existen_errados: false,
            existen_errados1: false,
            existen_errados2: false,
            body: '',
            loading:false
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
        enviar() {
            let self = this;
            this.loading = true
            let config = this.configHeader();
            const correo = new FormData();
            correo.append('to', this.correos)
            correo.append('subject', this.asunto)
            correo.append('body', this.body)
            correo.append('cc', this.correos1)
            correo.append('cco', this.correos2)

            this.file.forEach(function (item, index) {
                correo.append('archivo' + index, item)
            })


            axios
                .post(self.URL_API + "api/v1/enviocorreo", correo, config)
                .then(function (result) {
                    self.loading = false
                    self.showAlert(result.data.message, result.data.status);
                });
        },
        cargarArchivo(event) {
            var self = this
            const file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                self.file.push(file[i])
            }
        },
        capturaCorreo(texto, input) {
            var self = this
            var correos_errados = ''
            const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (texto.includes(';')) {
                let correos = texto.split(';')
                correos.forEach(function (item) {
                    if (patron.test(item)) {
                        if (input == 1) {
                            self.correos.push(item)
                        }
                        if (input == 2) {
                            self.correos1.push(item)
                        }
                        if (input == 3) {
                            self.correos2.push(item)
                        }
                    }
                    else {
                        correos_errados += item + ';'
                        if (input == 1) {
                            self.existen_errados = true
                        }
                        if (input == 2) {
                            self.existen_errados1 = true
                        }
                        if (input == 3) {
                            self.existen_errados2 = true
                        }
                    }

                })
                if (input == 1) {
                    this.destinatario = correos_errados
                }
                if (input == 2) {
                    this.cc_ = correos_errados
                }
                if (input == 3) {
                    this.cco_ = correos_errados
                }

            }
            if (patron.test(texto)) {
                if (input == 1) {
                    this.correo_validado = true
                    this.existen_errados = false
                    this.correo = texto
                }
                if (input == 2) {
                    this.correo_validado1 = true
                    this.existen_errados1 = false
                    this.correo = texto
                }
                if (input == 3) {
                    this.correo_validado2 = true
                    this.existen_errados2 = false
                    this.correo = texto
                }

            } else {
                if (input == 1) {
                    this.correo_validado = false
                    this.existen_errados = true
                }
                if (input == 2) {
                    this.correo_validado1 = false
                    this.existen_errados1 = true
                }
                if (input == 3) {
                    this.correo_validado2 = false
                    this.existen_errados2 = true
                }

            }
            if (this.destinatario == '') {
                this.existen_errados = false
            }
            if (this.cc_ == '') {
                this.existen_errados1 = false
            }
            if (this.cco_ == '') {
                this.existen_errados2 = false
            }
        },
        agregaCorreo(correo, input) {
            if (input == 1) {
                this.correo_validado = false
                this.correos.push(correo)
                this.destinatario = ''
                const focus = document.getElementById("focus");
                focus.focus();
            }
            if (input == 2) {
                this.correo_validado1 = false
                this.correos1.push(correo)
                this.cc_ = ''
                const focus = document.getElementById("focus");
                focus.focus();
            }
            if (input == 3) {
                this.correo_validado2 = false
                this.correos2.push(correo)
                this.cco_ = ''
                const focus = document.getElementById("focus");
                focus.focus();
            }
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
        editarCorreo(correo, index, input) {
            if (input == 1) {
                this.correo_validado = true
                this.existen_errados = false
                this.destinatario = correo
                this.correos.splice(index, 1)
                const focus = document.getElementById("focus");
                focus.focus();
            }
            if (input == 2) {
                this.correo_validado1 = true
                this.existen_errados1 = false
                this.cc_ = correo
                this.correos1.splice(index, 1)
                const focus = document.getElementById("focus1");
                focus.focus();
            }
            if (input == 3) {
                this.correo_validado2 = true
                this.existen_errados2 = false
                this.cco_ = correo
                this.correos2.splice(index, 1)
                const focus = document.getElementById("focus2");
                focus.focus();
            }
        },
        quitarAdjuntos() {
            this.file = []
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
        valida_campos(body) {
            this.body = body
            if (this.correos.length <= 0) {
                this.showAlert('Error, debe diligenciar el destinatario', 'error')
                return true
            }
            if (this.asunto == '') {
                this.showAlert('Error, debe diligenciar un asunto para el correo.', 'error')
                return true
            }
            if (body == '') {
                this.showAlert('Error, debe diligenciar el cuerpo del correo.', 'error')
                return true
            } if (this.file.length <= 0) {
                this.confirmationMessage('¿Está seguro de enviar el correo sin adjuntos?', 'Si', 'No')
                return true
            }

            this.enviar()
        },
        confirmationMessage(title, btnConfirm, btnDenied) {
            this.$swal({
                icon: 'warning',
                title: title,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: btnConfirm,
                denyButtonText: btnDenied,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.enviar()
                } else if (result.isDenied) {
                    this.showAlert('Accion cancelada', 'info')
                }
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

.bi bi-x {
    margin: 20px 0px 20px 0px;
    max-width: 400px;
    cursor: pointer;
}


.error {
    float: left;
    color: red;
}

/* Loading */
.loading {
    background-color: rgba(252, 252, 252, 0.63);
    position: fixed;
    width: 100%;
    height: 1000px;
    top: 0%;
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

/* Fin loading */</style>