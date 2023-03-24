<template>
    <div>
        <div class="container">
            <h3>{{ titulo }}</h3>
            <div class="card col-xs-12 col-md-6" style="height: 680px;">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Nombres</label>
                        <input type="text" :autocomplete="false" class="form-control" v-model="nombres" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellidos</label>
                        <input type="text" :autocomplete="false" class="form-control" v-model="apellidos" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">N. Documento de identidad</label>
                        <input type="text" class="form-control" v-model="documento_identidad"
                        autocomplete="off" :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="prueba"
                            v-model="email"
                            :autocomplete="false" :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rol</label>
                        <select id="inputState1" class="form-select" v-model="rol" @change="rolId(rol)"
                            :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true">
                            <option v-for="(item, index) in roles" :key="index">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3" v-if="($route.params.id != null)">
                        <label class="form-label">Estado</label>
                        <select id="inputState2" class="form-select" v-model="estado" @change="estadoId(estado)"
                            :disabled="roluserlogued == 'S. Administrador' || roluserlogued == 'Administrador' ? false : true">
                            <option v-for="(item, index) in estados" :key="index">
                                {{ item.nombre }}
                            </option>
                        </select>
                    </div>
                    <button  type="button" class="btn btn-success" @click="register()">
                        Guardar
                    </button>
                    
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        titulo: String
    },
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

        };
    },

    created() {
        this.getUser()
        this.userLogued()
        this.getRoles()
        this.getEstados()
    },
    methods: {
        register() {
            let self = this;
            let config = this.configHeader();
            let accion = "register";
            let user = {
                nombres: this.nombres,
                apellidos: this.apellidos,
                email: this.email,
                password: this.password,
                rol_id: this.rolId_,
                documento_identidad: this.documento_identidad,
            };
            if (this.$route.params.id != undefined) {
                user.estado_id = self.estadoId_;
                user.id_user = this.$route.params.id
                accion = "user";
            }
            axios
                .post(self.URL_API + "api/v1/" + accion, user, config)
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
        contratoId(contrato) {
            let self = this;
            var cont = 0;
            this.contratos.forEach(function (element) {
                if (contrato == element.numero) {
                    self.contratoId_ = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.contratoId_ = "";
            }
        },
        getUser() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/userbyid/' + self.$route.params.id, config)
                .then(function (result) {
                    self.nombres = result.data[0].nombres
                    self.apellidos = result.data[0].apellidos
                    self.email = result.data[0].email
                    self.rol = result.data[0].rol
                    self.estado = result.data[0].estado
                    self.estadoId_ = result.data[0].id_estado;
                    self.rolId_ = result.data[0].id_rol;
                    self.contrato = result.data[0].contrato_numero;
                    self.contratoId_ = result.data[0].contrato_id;
                    self.documento_identidad = result.data[0].documento_identidad;
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
        showAlert(mensaje, icono) {
            this.$swal({
                position: 'top',
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: 1500,
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
    },
};
</script>
<style scoped>
.card {
    height: 520px;
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
    margin-bottom: 20px;
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
</style>