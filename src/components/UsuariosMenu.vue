<template>
    <div>
        <div class="container">
            <Loading :loading="loading" />
            <h2>Usuarios y menús</h2>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <SearchList nombreCampo="Usuario: *" :valida_campo="false" nombreItem="nombre" eventoCampo="getUsuarios"
                        :consulta="usuario" :registros="usuarios" @getUsuarios="getUsuarios"
                        placeholder="Seleccione una opción" />
                </div>
                <div class="col-xs-12 col-md-3">
                    <label style="width: 250px; margin-top: 25px; text-align: left">Menús</label>
                    <select id="inputState1" class="form-select" :disabled="checks.length > 1" v-model="menu_select"
                        @change=" menuId(menu_select)">
                        <option ref="item_select" v-for="item, index in menus" :key="index">
                            {{ item.nombre }}
                        </option>
                    </select>
                </div>
                <button type="button" id="newNews" class="col-xs-12 col-md-2 btn btn-sm btn-success" @click=" asignarMenu()"
                    style="margin-top: 33px">
                    <i class="bi bi-file-earmark-plus"></i> Asignar menús
                </button>
            </div>
            <div class="row">
                <div class="mb-3" v-if="asignar_usuarios.length > 0">
                    <span>Usuarios a asignar</span>
                    <div class="mb-3" style="padding:10px;border: solid #D5DBDB 0.5px;border-radius:10px">
                        <button type="button" style="margin:10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="item, index in asignar_usuarios" :key="index">{{
                                item.nombre
                            }}
                            <i class="bi bi-x" @click="asignar_usuarios.splice(index, 1)"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3" v-if="asignar_menus.length > 0">
                    <span>Menús a asignar</span>
                    <div class="mb-3" style="padding:10px;border: solid #D5DBDB 0.5px;border-radius:10px">
                        <button type="button" style="margin:10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="item, index in asignar_menus" :key="index">{{
                                item.nombre
                            }}
                            <i class="bi bi-x" @click="asignar_menus.splice(index, 1)"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <SearchList nombreCampo="Usuario: *" :valida_campo="false" nombreItem="nombre" eventoCampo="getUsuarios"
                        :consulta="usuario" :registros="usuarios" @getUsuarios="getUsuarios" :index="1"
                        placeholder="Seleccione una opción" />
                </div>
                <button type="button" id="reset" class="col-xs-12 col-md-2 btn btn-success btn-sm" style="margin-top: 33px"
                    @click="getItems(), (rol = '')">
                    <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
                </button>
            </div>
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
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
import SearchList from './SearchList.vue'
export default {
    props: {
        menu: []
    },
    mixins: [Token, Alerts, Scroll],
    components: {
        Tabla,
        Loading,
        SearchList
    },
    data() {
        return {
            menus: [],
            rolesunicos: [],
            roles: [],
            menu_select: "",
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
            endpoint: 'usuariosmenus',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombres", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Appelidos", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Menú", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            ruta: '',
            asignar_permisos: [],
            asignar_roles: [],
            asignar_usuarios: [],
            actualizar_menu: false,
            asignacion_por: '',
            usuarios: [],
            usuario_id: '',
            usuario: '',
            asignar_menus: [],
        };
    },
    mounted() {
        this.ruta = this.$route.path.substring(1)
    },
    created() {
        this.getItems();
        this.getMenu()
        this.getUsuarios()
    },
    methods: {
        getUsuarios(item, index = null) {
            this.usuario_id = ''
            this.usuario = ''
            if (index != null) {
                console.log(item)
                this.FiltroPorUsuario(item.id)
                return
            }
            if (item != null && index == null) {
                this.usuario_id = item.id
                this.usuario = item.nombre
                if (!this.actualizar_menu) {
                    const usuario_existe = this.asignar_usuarios.some(usuario => usuario.id === item.id);
                    if (!usuario_existe) {
                        this.asignar_usuarios.push({ id: item.id, nombre: item.nombre })
                    }
                } else {
                    this.asignar_permisos = []
                    this.actualizar_menu = false
                }
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/userslist", config)
                .then(function (result) {
                    self.usuarios = result.data
                });
        },
        FiltroPorUsuario(id) {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/filtromenuporusuario/" + id + '/' + self.cantidad, config)
                .then(function (result) {
                    self.datos = result
                });
        },
        getMenuNavbar() {
            this.$emit('getMenu');
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/usuariosmenus/" + self.cantidad
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
            console.log(response)
            this.actualizar_menu = true
            this.currentUrl = response.currentUrl
            this.menu_select = response.menu
            this.idItem = response.id
            this.actualizar = true
            this.menuId(response.menu)
            this.usuarioId(response.nombres + ' ' + response.apellidos)
            this.checks = []
        },
        getMenu() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/menuslista", config).then(function (result) {
                self.menus = result.data;
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
                .delete(self.URL_API + "api/v1/usuariosmenus/" + id, config)
                .then(function (result) {
                    self.showAlert(result.data.message, result.data.status);
                });
        },
        asignarMenu() {
            let self = this;
            this.loading = true
            this.scrollTop()
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.usuario_id = this.usuario_id
            } else {
                let urlEndPoint = ''
                let permiso_rol = []
                permiso_rol.push(this.asignar_usuarios)
                permiso_rol.push(this.asignar_menus)
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/usuariosmenus/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/usuariosmenus"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, permiso_rol, config)
                    .then(function (result) {
                        self.loading = false
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                        self.$emit('getMenu');
                    });
            }
        },
        usuarioId(usuario) {
            let self = this;
            var cont = 0;
            this.usuarios.forEach(function (element) {
                if (usuario == element.nombre) {
                    self.usuario = element.nombre
                    self.usuario_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.rolId_ = "";
            }
        },
        menuId(menu) {
            let self = this;
            var cont = 0;
            this.menus.forEach(function (element) {
                if (menu == element.nombre) {
                    self.menuId_ = element.id;
                    if (!self.actualizar_menu) {
                        const menu_existe = self.asignar_menus.some(menu => menu.id === element.id);
                        if (!menu_existe) {
                            self.asignar_menus.push({ id: element.id, nombre: element.nombre })
                        }
                    } else {
                        self.asignar_menus = []
                        self.actualizar_menu = false
                    }
                    cont++;
                }
            });
            if (cont <= 0) {
                self.menuId_ = "";
            }
        },
        clear() {
            this.menu_select = ''
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