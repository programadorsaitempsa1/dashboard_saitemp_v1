<template>
    <div>
        <div class="container">
            <Loading :loading="loading" />
            <h2>Roles y permisos</h2>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 25px; text-align: left">Roles</label>
                    <select id="inputState1" class="form-select" v-model="rol_select" @change="rolId(rol_select)">
                        <option v-for="item, index in roles" :key="index">
                            {{ item.nombre }}
                        </option>
                    </select>
                </div>
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 25px; text-align: left">Permisos</label>
                    <select id="inputState1" class="form-select" :disabled="checks.length > 1" v-model="permiso_select"
                        @change="permisoId(permiso_select)">
                        <option ref="item_select" v-for="item, index in permisos_usuario" :key="index">
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
                <div class="mb-3" v-if="asignar_roles.length > 0">
                    <span>Roles a asignar</span>
                    <div class="mb-3" style="padding:10px;border: solid #D5DBDB 0.5px;border-radius:10px">
                        <button type="button" style="margin:10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="item, index in asignar_roles" :key="index">{{
                                item.nombre
                            }}
                            <i class="bi bi-x" @click="asignar_roles.splice(index, 1)"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3" v-if="asignar_permisos.length > 0">
                    <span>Permisos a asignar</span>
                    <div class="mb-3" style="padding:10px;border: solid #D5DBDB 0.5px;border-radius:10px">
                        <button type="button" style="margin:10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="item, index in asignar_permisos" :key="index">{{
                                item.nombre
                            }}
                            <i class="bi bi-x" @click="asignar_permisos.splice(index, 1)"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 10px; text-align: left">filtrar por rol</label>
                    <select id="inputState1" class="form-select" v-model="rol" @change="filtroRol(rol)">
                        <option v-for="item, index in rolesunicos" :key="index">
                            {{ item.rol }}
                        </option>
                    </select>
                </div>
                <button type="button" id="reset" class="col-xs-12 col-md-2 btn btn-success" style="margin-top: 33px"
                    @click="getItems(), (rol = '')">
                    <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
                </button>
            </div>
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos" :eliminar="permisos[18].autorizado"
                @response="response" @clear="clear" @check="check" @getMenuNavbar="getMenuNavbar" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Tabla from "./Tabla.vue";
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
import Loading from './Loading.vue'
import { Scroll } from '../Mixins/Scroll.js';
import { Permisos } from '../Mixins/Permisos.js';
// import SearchList from './SearchList.vue'
export default {
    props: {
        menu: []
    },
    mixins: [Token, Alerts, Scroll, Permisos],
    components: {
        Tabla,
        Loading,
        // SearchList
    },
    data() {
        return {
            rolesmenu: [],
            permisos_roles: [],
            permisos_usuario: [],
            rolesunicos: [],
            roles: [],
            rol_select: "",
            permiso_select: "",
            rolId_: "",
            permisoId_: "",
            rol: "",
            URL_API: process.env.VUE_APP_URL_API,
            roluserlogued: "",
            result: [],
            actualiced: false,
            loading: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            codigo: '',
            item: '',
            unidad_medida: '',
            valor_unitario: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'rolpermiso',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre rol", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Permiso", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            ruta: '',
            asignar_permisos: [],
            asignar_roles: [],
            actualizar_menu: false,
        };
    },
    mounted() {
        this.ruta = this.$route.path.substring(1)
    },
    created() {
        this.getItems();
        this.getMenu();
        this.getRoles()
        this.getRolesMenu()
    },
    methods: {
        getMenuNavbar() {
            this.$emit('getMenu');
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/rolpermiso/" + self.cantidad
            if (this.currentUrl != '') {
                urlEndPoint = this.currentUrl
            }
            let config = this.configHeader();
            axios
                .get(urlEndPoint, config)
                .then(function (result) {
                    self.datos = result;
                });
        },
        response(response) {
            this.actualizar_menu = true
            this.currentUrl = response.currentUrl
            this.rol_select = response.rol
            this.permiso_select = response.permiso
            this.idItem = response.id
            this.actualizar = true
            this.permisoId(response.menu)
            this.rolId(response.rol)
            this.checks = []
        },
        getMenu() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/permisoslista", config).then(function (result) {
                try {
                    self.permisos_usuario = result.data;
                } catch (error) {
                    console.log(error);
                }
            });
        },
        getRoles() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/roleslista", config).then(function (result) {
                self.roles = result.data;
            });
        },
        getRolesMenu() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/rolespermisos", config).then(function (result) {
                self.rolesunicos = result.data;
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
                    self.getRolesMenu();
                    self.showAlert(result.data.message, result.data.status);
                });
        },
        asignarPermiso() {
            let self = this;
            this.loading = true
            this.scrollTop()
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.rol_id = this.rolId_
            } else {
                let urlEndPoint = ''
                let permiso_rol = []
                permiso_rol.push(this.asignar_roles)
                permiso_rol.push(this.asignar_permisos)
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/rolpermiso/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/rolpermiso"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, permiso_rol, config)
                    .then(function (result) {
                        self.loading = false
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                        self.getRolesMenu()
                        self.$emit('getMenu');
                    });
            }
        },
        rolId(rol) {
            let self = this;
            var cont = 0;
            this.roles.forEach(function (element) {
                if (rol == element.nombre) {
                    self.rolId_ = element.id;
                    if (!self.actualizar_menu) {
                        const rol_existe = self.asignar_roles.some(rol => rol.id === element.id);
                        if (!rol_existe) {
                            self.asignar_roles.push({ id: element.id, nombre: element.nombre })
                        }
                    } else {
                        self.asignar_permisos = []
                        self.actualizar_menu = false
                    }
                    cont++;
                }
            });
            if (cont <= 0) {
                self.rolId_ = "";
            }
        },
        filtroRol(rol) {
            let self = this;
            this.roles.forEach(function (element) {
                if (rol == element.nombre) {
                    let config = self.configHeader();
                    axios
                        .get(self.URL_API + "api/v1/filtrorol/" + element.id + '/' + self.cantidad, config)
                        .then(function (result) {
                            self.datos = result;
                        });
                }
            });
        },
        permisoId(menu) {
            let self = this;
            var cont = 0;
            this.permisos_usuario.forEach(function (element) {
                if (menu == element.nombre) {
                    self.permisoId_ = element.id;
                    if (!self.actualizar_menu) {
                        const permiso_existe = self.asignar_permisos.some(menu => menu.id === element.id);
                        if (!permiso_existe) {
                            self.asignar_permisos.push({ id: element.id, nombre: element.nombre })
                        }
                    } else {
                        self.asignar_permisos = []
                        self.actualizar_menu = false
                    }
                    cont++;
                }
            });
            if (cont <= 0) {
                self.permisoId_ = "";
            }
        },
        clear() {
            this.rol_select = ''
            this.permiso_select = ''
            this.idItem = ''
            this.actualizar = false
        },
        check(check) {
            this.checks = check
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

label {
    float: left;
}

#btnMenu {
    background-color: rgb(28, 146, 77);
    color: white;
}
</style>