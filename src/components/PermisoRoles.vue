<template>
    <div>
        <div class="container">
            <h2>Roles y permisos</h2>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 10px; text-align: left">Roles</label>
                    <select id="inputState1" class="form-select" v-model="rol_select" @change="rolId(rol_select)">
                        <!-- <option selected>Por favor seleccione un rol de usuario</option> -->
                        <option v-for="item in roles" :key="item.id">
                            {{ item.nombre }}
                        </option>
                    </select>
                </div>
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 10px; text-align: left">Permisos</label>
                    <select id="inputState1" class="form-select" v-model="permiso_select"
                        @change="permisoId(permiso_select)">
                        <!-- <option selected>Por favor seleccione un rol de usuario</option> -->
                        <option v-for="item in permisos" :key="item.id">
                            {{ item.nombre }}
                        </option>
                    </select>
                </div>
                <button type="button" id="newNews" class="col-xs-12 col-md-2 btn btn-success" @click="asignarPermiso()"
                    style="margin-top: 33px">
                    <i class="bi bi-file-earmark-plus"></i> Asignar permisos
                </button>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 10px; text-align: left">filtrar por rol</label>
                    <select id="inputState1" class="form-select" v-model="rol" @change="searchRol(rol)">
                        <option selected>Por favor seleccione un rol de usuario</option>
                        <option v-for="item in rolesunicos" :key="item.id">
                            {{ item }}
                        </option>
                    </select>
                </div>
                <button type="button" id="reset" class="col-xs-12 col-md-2 btn btn-success" style="margin-top: 33px"
                    @click="getRolespermisos(), (rol = '')">
                    <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
                </button>
            </div>
            <table class="table align-middle table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre rol</th>
                        <th scope="col">permisos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in rolespermisos" :key="item.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.rol }}</td>
                        <td>{{ item.permiso }}</td>
                        <td>
                            <button v-if="item.rol != 'S. Administrador'" type="button" class="btn btn-danger btn-sm"
                                @click="messageDelete(item.id_registro)">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button v-if="item.rol == 'S. Administrador' && roluserlogued == 'S. Administrador'"
                                type="button" class="btn btn-danger btn-sm" @click="messageDelete(item.id_registro)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
export default {
    mixins: [Token, Alerts],
    data() {
        return {
            rolespermisos: [],
            permisos_roles: [],
            permisos: [],
            rolesunicos: [],
            roles: [],
            rol_select: "",
            permiso_select: "",
            rolId_: "",
            permisoId_: "",
            rol: "",
            rows: [],
            URL_API: process.env.VUE_APP_URL_API,
            roluserlogued: ''
        };
    },
    created() {
        this.userLogued();
        this.getRolespermisos();
        this.getPermisos();
    },
    methods: {
        prueba(index) {
            console.log(index, "index");
            if (index == 4) index = 1;
            return this.rows[index];
        },
        getRolespermisos() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/rolespermisos", config)
                .then(function (result) {
                    try {
                        result.data.forEach(function (item) {
                            if (item.rol != 'S. Administrador' && self.roluserlogued != 'S. Administrador') {
                                self.rolespermisos.push(item);
                            }
                            else if (self.roluserlogued == 'S. Administrador') {
                                self.rolespermisos = result.data;
                            }
                        });
                        result.data.forEach(function (item) {
                            if (!self.rolesunicos.includes(item.rol) && self.roluserlogued != 'S. Administrador' && item.rol != 'S. Administrador') {
                                self.rolesunicos.push(item.rol);
                            } if (!self.rolesunicos.includes(item.rol) && self.roluserlogued == 'S. Administrador') {
                                self.rolesunicos.push(item.rol);
                            }
                        });
                        self.rows = [];
                        self.rolesunicos.forEach(function (item) {
                            var count = 0;
                            self.rolespermisos.forEach(function (item2) {
                                if (item == item2.rol) {
                                    count++;
                                }
                            });
                            self.rows.push(count);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
        },
        getPermisos() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/permisos", config).then(function (result) {
                try {
                    self.permisos = result.data;
                } catch (error) {
                    console.log(error);
                }
            });
        },
        getRoles(rol) {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/roleslista", config).then(function (result) {
                if (rol == 'S. Administrador') {
                    self.roles = result.data;
                } else {
                    self.roles = result.data.slice(1, result.data.length)
                }
            });
        },
        messageDelete(id) {
            let self = this;
            this.$swal
                .fire({
                    title: "Estas seguro de elimiar el resgistro?",
                    text: "Esta operación no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        self.eliminar(id);
                    }
                });
        },
        eliminar(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .delete(self.URL_API + "api/v1/rolpermiso/" + id, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                    self.getRolespermisos();
                });
        },
        asignarPermiso() {
            let self = this;
            let config = this.configHeader();
            if (self.rolId_ != "" && self.permisoId_ != "") {
                let asignacion = {
                    rol_id: self.rolId_,
                    permiso_id: self.permisoId_,
                };
                axios
                    .post(self.URL_API + "api/v1/rolpermiso", asignacion, config)
                    .then(function (result) {
                        self.getRolespermisos();
                        self.showAlert(result.data.message, result.data.status);
                    });
            } else {
                self.message("error", "Debes selecionar un rol y un permiso");
            }
        },
        searchRol(rol) {
            let self = this;
            if (rol != "Por favor seleccione un rol de usuario") {
                var rol_filtrado = [];
                self.rolespermisos.forEach(function (item) {
                    if (item.rol == rol) {
                        rol_filtrado.push(item);
                    }
                });
                self.rolespermisos = rol_filtrado;
            }
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
        permisoId(permiso) {
            let self = this;
            var cont = 0;
            this.permisos.forEach(function (element) {
                if (permiso == element.nombre) {
                    self.permisoId_ = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.permisoId_ = "";
            }
        },
        userLogued() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/userlogued', config)
                .then(function (result) {
                    self.roluserlogued = result.data[0].rol;
                    self.getRoles(result.data[0].rol);
                }).catch(function (error) {
                    if (error.response.data == "Unauthorized.") {
                        self.$router.push("/");
                        localStorage.removeItem("access_token");
                    }
                });
        },
    },
};
</script>
<style scoped>
.container {
    animation: fadeIn;
    animation-duration: 2s;
}

.row {
    margin: 30px 0px 30px 0px;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style>