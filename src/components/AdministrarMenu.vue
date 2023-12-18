<template>
    <div>
        <div class="container">
            <h2>Administrar Menús</h2>
            <div class="card col-xs-12 col-md-12">
                <h5>{{ accion1 }}</h5>
                <form class="was-validated" @submit.prevent="saveCategoria()">
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombre categoría:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    required v-model="categoria_menu.nombre" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Icono categoría:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    required v-model="categoria_menu.icono" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Posición:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    @input="categoria_menu.posicion = validarNumero(categoria_menu.posicion)"
                                    v-model="categoria_menu.posicion" />
                            </div>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">¿Este menú debe estár oculto?</label>
                            <select class="form-select" v-model="categoria_menu.oculto" aria-label="Default select example">
                                <!-- <option selected>Seleccione una opción</option> -->
                                <option value="0">No</option>
                                <option value="1">Si</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col" v-if="!actualizar1 && permisos[4].autorizado">
                            <button type="submit" class="btn btn-success">
                                Guardar
                            </button>
                        </div>
                        <div class="col" v-if="actualizar1 && permisos[5].autorizado">
                            <button type="submit" class="btn btn-success">
                                Actualizar
                            </button>
                        </div>
                        <div class="col">
                            <button type="submit" class="btn btn-warning" @click="clear1">
                                Limpiar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Tabla :datos="categorias_menu" :tabla="tabla_catageria_menu" :endpoint="endpoint1" :editar="permisos[5].autorizado" :eliminar="permisos[6].autorizado"
                :messageDelete="messageDelete" :massiveUpdate="massiveUpdate1" :campos="campos" @getItems="getItems"
                @response="response1" @clear="clear1" @check="check"/>
            <div class="card col-xs-12 col-md-12">
                <h5>{{ accion2 }}</h5>
                <form class="was-validated" @submit.prevent="saveMenu()">
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombre:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    required v-model="menu.nombre" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Url:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    required v-model="menu.url" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Icono:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    required v-model="menu.icono" />
                            </div>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">¿La url dirige a una página externa?</label>
                            <select class="form-select" v-model="menu.url_externa" aria-label="Default select example">
                                <!-- <option selected>Seleccione una opción</option> -->
                                <option value="0">No</option>
                                <option value="1">Si</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Posición:</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    @input="menu.posicion = validarNumero(menu.posicion)" v-model="menu.posicion" />
                            </div>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">¿Este menú debe estár oculto?</label>
                            <select class="form-select" v-model="menu.oculto" aria-label="Default select example">
                                <!-- <option selected>Seleccione una opción</option> -->
                                <option value="0">No</option>
                                <option value="1">Si</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <SearchList nombreCampo="Menú principal:" @getCategoriasMenuLista="getCategoriasMenuLista"
                                eventoCampo="getCategoriasMenuLista" :ordenCampo="1" nombreItem="nombre" required="true"
                                :registros="categorias_menu_lista" :consulta="consulta_categoria_menu"
                                placeholder="Seleccione una opción" />
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Url powerbi:</label>
                            <!-- <div class="form-floating"> -->
                            <textarea class="form-control" v-model="menu.powerbi" id="floatingTextarea"></textarea>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col" v-if="!actualizar2 && permisos[7].autorizado">
                            <button type="submit" class="btn btn-success">
                                Guardar
                            </button>
                        </div>
                        <div class="col" v-if="actualizar2 && permisos[8].autorizado">
                            <button type="submit" class="btn btn-success">
                                Actualizar
                            </button>
                        </div>
                        <div class="col">
                            <button type="submit" class="btn btn-warning" @click="clear2">
                                Limpiar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Tabla :datos="menus" :tabla="tabla_menu" :endpoint="endpoint2" :massiveUpdate="massiveUpdate2" :campos="campos" :editar="permisos[8].autorizado" :eliminar="permisos[9].autorizado" 
                @response="response2" @clear="clear2" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Tabla from './Tabla.vue';
import { Alerts } from '../Mixins/Alerts.js';
import { Token } from '../Mixins/Token.js';
import { Crud } from '../Mixins/Crud.js';
import SearchList from './SearchList.vue';
import { Permisos } from '../Mixins/Permisos.js';
export default {
    name: '',
    components: {
        Tabla,
        SearchList
    },
    mixins: [Token, Alerts, Permisos,Crud],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            endpoint1: 'categoriasMenu',
            endpoint2: 'menus',
            accion1: 'Insertar categoría menú',
            accion2: 'Insertar menú',
            menu: {},
            categoria_menu: {},
            datos: [],
            massiveUpdate1: false,
            massiveUpdate2: false,
            campos: {},
            menus: [],
            categorias_menu: [],
            categorias_menu_lista: [],
            consulta_categoria_menu: '',
            tabla_catageria_menu: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Icono", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Posición", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Oculto", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            tabla_menu: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Url", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Icono", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Url externa", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Posición", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Oculto", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Id menú principal", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Menú principal", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Gráfico powerbi", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            actualizar1: false,
            actualizar2: false,
            mensaje:"Estas seguro de elimiar el resgistro? si elimina esta categoria de menú eliminará también las subcategorias de menú asociadas."
        }
    },
    computed: {

    },
    watch: {
    },
    mounted() {

    },
    created() {
        this.getItems()
    },
    methods: {
        getItems() {
            this.getCategoriasMenuLista()
            this.getCategoriasMenu()
            this.getMenus()
        },
        getMenus() {
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/menus/10', config)
                .then(function (result) {
                    self.menus = result
                }).catch(function () {
                });
        },
        getCategoriasMenu() {
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/categoriasMenu/10', config)
                .then(function (result) {
                    self.categorias_menu = result
                }).catch(function () {
                });

        },
        getCategoriasMenuLista(item = null) {
            if (item != null) {
                this.consulta_categoria_menu = item.nombre
                this.menu.categoria_menu_id = item.id
            }
            let self = this
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/categoriasMenulista', config)
                .then(function (result) {
                    self.categorias_menu_lista = result.data
                }).catch(function () {
                });

        },
        saveCategoria() {
            var self = this
            this.validaCamposCategoriasMenu()
            var url = ''
            if (this.categoria_menu.id != undefined) {
                url = self.URL_API + 'api/v1/categoriasMenu/' + this.categoria_menu.id

            } else {
                url = self.URL_API + 'api/v1/categoriasMenu'
            }
            let config = this.configHeader();
            axios
                .post(url, this.categoria_menu, config)
                .then(function (result) {
                    self.getMenuNavbar()
                    self.getCategoriasMenu()
                    self.showAlert(result.data.message, result.data.status);
                }).catch(function () {
                });
        },
        getMenuNavbar() {
            this.$emit('getMenu');
        },
        saveMenu() {
            var self = this
            this.validaCamposMenu()
            var url = ''
            if (this.menu.id != undefined) {
                url = self.URL_API + 'api/v1/menus/' + this.menu.id

            } else {
                url = self.URL_API + 'api/v1/menus'
            }
            let config = this.configHeader();
            axios
                .post(url, this.menu, config)
                .then(function (result) {
                    self.getMenuNavbar()
                    self.getMenus()
                    self.showAlert(result.data.message, result.data.status);
                }).catch(function () {
                });
        },
        validaCamposCategoriasMenu() {
            if (this.categoria_menu.oculto == undefined) {
                this.categoria_menu.oculto = 0
            }
            if (this.categoria_menu.posicion == undefined) {
                this.categoria_menu.posicion = parseInt(this.categorias_menu.data.data[0].posicion) + 1
            }
        },
        validaCamposMenu() {
            if (this.menu.posicion == undefined) {
                this.menu.posicion = parseInt(this.menus.data.data[0].posicion) + 1
            }
            if (this.menu.url_externa == undefined) {
                this.menu.url_externa = 0
            }
            if (this.menu.oculto == undefined) {
                this.menu.oculto = 0
            }
        },
        clear1() {
            this.actualizar1 = false
            this.categoria_menu = {}
        },
        clear2() {
            this.actualizar2 = false
            this.consulta_categoria_menu = ''
            this.menu = {}
        },
        check(check) {
            this.checks = check
        },
        response1(response) {
            // this.categoria_menu.nombre = response.currentUrl
            this.categoria_menu = {}
            this.categoria_menu.id = response.id
            this.categoria_menu.nombre = response.nombre
            this.categoria_menu.icono = response.icon
            this.categoria_menu.posicion = response.posicion
            this.categoria_menu.oculto = response.oculto
            this.actualizar1 = true
            this.accion1 = "Editar categoria menú"
            this.checks = []
        },
        response2(response) {
            // this.menu.nombre = response.currentUrl
            this.menu = {}
            this.menu.id = response.id
            this.menu.nombre = response.nombre
            this.menu.url = response.url
            this.menu.url_externa = response.urlExterna
            this.menu.icono = response.icon
            this.menu.posicion = response.posicion
            this.menu.oculto = response.oculto
            this.menu.powerbi = response.powerbi
            this.consulta_categoria_menu = response.categoria
            this.menu.categoria_menu_id = response.categoria_menu_id
            this.actualizar2 = true
            this.accion2 = "Editar menú"
            this.checks = []
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
    }
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
</style>