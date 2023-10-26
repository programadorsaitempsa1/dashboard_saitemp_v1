<template>
    <div>
        <Loading :loading="loading" />
        <div class="container">
            <h3>{{ titulo }}</h3>
            <div class="card col-xs-12 col-md-8">
                <form>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Nombres</label>
                                <input type="text" autocomplete="off" class="form-control" v-model="nombres" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Apellidos</label>
                                <input type="text" autocomplete="off" class="form-control" v-model="apellidos" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">N. Documento de identidad</label>
                        <input type="text" class="form-control" v-model="documento_identidad" autocomplete="off"
                            :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" />
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="prueba"
                                    v-model="usuario" autocomplete="off"
                                    :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Contraseña correo</label>
                                <input type="password" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="prueba" v-model="contrasena_correo" autocomplete="off" />
                                <!-- :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" -->
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Usuario</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="prueba"
                                    v-model="email" autocomplete="off"
                                    :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Contraseña</label>
                                <input type="password" autocomplete="new-password" required class="form-control"
                                    id="exampleInputPassword1" v-model="password" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">Rol</label>
                                <select id="inputState1" class="form-select" v-model="rol" @change="rolId(rol)"
                                    :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true">
                                    <option v-for="(item, index) in roles" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3" v-if="($route.params.id != null)">
                                <label class="form-label">Estado</label>
                                <select id="inputState2" class="form-select" v-model="estado" @change="estadoId(estado)"
                                    :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true">
                                    <option v-for="(item, index) in estados" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <label for="formFileMultiple" class="form-label">Adjuntar imagen firma correo</label>
                            <div class="input-group mb-3">
                                <input class="form-control" type="file" @change="cargarArchivo($event)"
                                    id="formFileMultiple" multiple>
                                <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos()"
                                    id="basic-addon1">Quitar archivos</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col botones" v-for="item, index in file" :key="index">
                                <div class="btn-group btn-group" role="group" aria-label="Small button group">
                                    <button type="button" class="btn btn-success btn adjunto"><i
                                            class="bi bi-file-earmark-check"></i>
                                        {{ item.name }} {{ '(' +
                                            formatearPesoArchivo(item.size) + ')' }}</button>
                                    <button type="button" @click="file.splice(index, 1)" class="btn btn-success"><i
                                            class="bi bi-x"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success" @click="register()">
                        Guardar
                    </button>

                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Loading from './Loading.vue'
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
export default {
    props: {
        titulo: String
    },
    components:{
        Loading
    },
    mixins:[Alerts,Token],
    data() {
        return {
            nombres: "",
            apellidos: "",
            documento_identidad: '',
            email: "",
            password: "",
            roles: [],
            rol: "",
            rolId_: "",
            estados: [],
            estado: "",
            estadoId_: "",
            mensaje_error: "",
            URL_API: process.env.VUE_APP_URL_API,
            id_user: "",
            roluserlogued: '',
            editar_usuario: false,
            usuario: '',
            contrasena_correo: '',
            loading: false,
            file: [],

        };
    },

    created() {
        this.urlExterna ()
        if (this.$route.params.id != undefined) {
            this.getUser()
        }
        this.userLogued()
        this.getRoles()
        this.getEstados()
    },
    methods: {
        register() {
            let self = this;
            let config = this.configHeader();
            let accion = "register";

            const form = new FormData();
            form.append("nombres", this.nombres);
            form.append('apellidos', this.apellidos);
            form.append('usuario', this.usuario);
            form.append('contrasena_correo', this.contrasena_correo);
            form.append('email', this.email);
            form.append('password', this.password);
            form.append('rol_id', this.rolId_);
            form.append('documento_identidad', this.documento_identidad);

            this.file.forEach(function (item, index) {
                form.append('archivo' + index, item)
            })
            if (this.$route.params.id != undefined) {
                form.append('estado_id', this.estadoId_);
                form.append('id_user', this.$route.params.id);
                accion = "user";
            }
            axios
                .post(self.URL_API + "api/v1/" + accion, form, config)
                .then(function (result) {
                    if (result.data.status == "error") {
                        self.showAlert(result.data.message, result.data.status);
                    } else {
                        self.showAlert(result.data.message, result.data.status);
                        if (self.roluserlogued == 'S. Administrador' || self.roluserlogued == 'Administrador') {
                            self.$router.push('/navbar/usuarios')
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        rolId(rol) {
            let self = this;
            var cont = 0;
            this.roles.forEach(function (element) {
                if (rol == element.nombre) {
                    self.rolId_ = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.rolId_ = "";
            }
        },
        estadoId(estado) {
            let self = this;
            var cont = 0;
            this.estados.forEach(function (element) {
                if (estado == element.nombre) {
                    self.estadoId_ = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.estadoId_ = "";
            }
        },
        getUser() {
            let self = this;
            self.loading = true
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/userbyid/' + self.$route.params.id, config)
                .then(function (result) {
                    self.nombres = result.data[0].nombres != 'null' ? result.data[0].nombres:''
                    self.apellidos = result.data[0].apellidos != 'null' ? result.data[0].apellidos:''
                    self.usuario = result.data[0].usuario
                    self.email = result.data[0].email != 'null' ? result.data[0].email:''
                    self.rol = result.data[0].rol
                    self.estado = result.data[0].estado
                    self.estadoId_ = result.data[0].id_estado;
                    self.rolId_ = result.data[0].id_rol;
                    self.documento_identidad = result.data[0].documento_identidad != 'null'?result.data[0].documento_identidad:''
                    self.loading = false
                }).catch(function () {
                    // self.$router.push("/");
                });
        },
        userLogued() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/userlogued', config)
                .then(function (result) {
                    self.roluserlogued = result.data[0].rol;
                }).catch(function (error) {
                    if (error.response.data == "Unauthorized.") {
                        self.$router.push("/");
                        localStorage.removeItem("access_token");
                    }
                });
        },
        getRoles() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/roleslista', config)
                .then(function (result) {
                    self.roles = result.data
                }).catch(function () {
                    // self.$router.push("/");
                });
        },
        getEstados() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/estadousuarios', config)
                .then(function (result) {
                    self.estados = result.data
                }).catch(function () {
                    // self.$router.push("/");
                });
        },
        cargarArchivo(event) {
            var self = this
            const file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                self.file.push(file[i])
            }
        },
        quitarAdjuntos() {
            this.file = []
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
    },
};
</script>
<style scoped>
.card {
    /* height: 520px; */
    margin: auto;
    padding: 20px;
    background-color: rgba(239, 237, 237, 0.642);
    min-width: 350px;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

h3 {
    margin: 20px;
}

label {
    float: left;
}

.form-control {
    background-color: white;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}

button {
    width: 100%;
    margin-bottom: 10px;
    /* margin-bottom: 20px; */
}

.logo {
    width: 150px;
    margin: auto;
    border-radius: 15px;
    margin-top: 50px;
}

.logo img {
    width: 100%;
    border-radius: 15px;
}

#emailHelp {
    color: red;
}

.adjunto {
    white-space: nowrap;
    margin-bottom: 10px;
    background-color: #239B56;
    color: rgb(255, 255, 255);
    width: 100%;
    /* max-width: 500px; */
}

.botones {
    padding: 5px;
}
</style>