<template>
    <div>
        <div class="container">
            <h2 v-if="!formulario">Ordenes de trabajo asignadas</h2>
            <div class="col-8 card" v-if="ordenes_trabajo_empleados.length > 0 && !formulario">
                <!-- <h5>{{ accion }}</h5> -->
                <form>
                    <!-- Select con filtro personalizado -->
                    <div class="row" id="contenedor-select">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Categoría</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                <input type="text" @click="hover1 = !hover1" autocomplete="off"
                                    @input="filterResults(categoria, categorias, 'categorias')" class="form-control"
                                    id="exampleInputEmail2" placeholder="Cantidad" aria-describedby="emailHelp"
                                    v-model="categoria" />
                                <span class="input-group-text" id="basic-addon3"><i
                                        class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover1 && categorias.length > 0" id="select1" @mouseleave="hover1 = false">
                            <div id="lista1" v-for="(item, index) in categoriasFilter" :key="index"
                                @click="categoria = item.nombre, id_codigo(categoria), hover1 = !hover1">
                                {{ item.nombre }}
                            </div>
                        </div>
                    </div>
                    <!-- Fin select con filtro personalizado -->
                    <!-- Select con filtro personalizado -->
                    <div class="row" id="contenedor-select">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Descripción item</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                <input type="text" @click="hover2 = !hover2" autocomplete="off"
                                    @input="filterResults(item, items, 'items')" class="form-control"
                                    id="exampleInputEmail2" placeholder="Cantidad" aria-describedby="emailHelp"
                                    v-model="item" />
                                <span class="input-group-text" id="basic-addon3"><i
                                        class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover2 && items.length > 0" id="select2" @mouseleave="hover2 = false">
                            <div id="lista2" v-for="(descripcionItem, index) in itemsFlter" :key="index"
                                @click="addItem(descripcionItem), hover2 = !hover2, item = '', filterResults('', items, 'items')">
                                {{ descripcionItem.item }} - {{ descripcionItem.descripcion }}
                            </div>
                        </div>
                    </div>
                    <!-- Fin select con filtro personalizado -->
                    <div v-for="item, index in selected" :key="index">
                        <div class="row"
                            style="padding:20px;border: solid #D5DBDB 0.5px;border-radius:10px; text-align: justify; margin-bottom:15px">
                            <div class="col-8">
                                {{ item.item }}
                            </div>
                            <div class="col-4">
                                <div class="col-xs-12 col-md-12">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="exampleInputEmail2"
                                            placeholder="Cantidad" autocomplete="off" aria-describedby="emailHelp"
                                            v-model="item.cantidadItem"
                                            @keyup="itemsCompletos[index].cantidad = item.cantidadItem" />
                                    </div>
                                    <!-- itemsCompletos[index].cantidad = item.cantidadItem validateNumericField(item.cantidadItem, index)-->
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn mt-2 btn-danger btn-sm" @click="deleteItem(index)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-12 card" v-if="asignados.length > 0">
                <div class="row" v-for="(item, index) in asignados" :key="index">
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Orden de trabajo</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="item.orden_trabajo_asignado" disabled />
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Empleado</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="item.empleado_asignado" disabled />
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Descripción</label>
                            <div class="mb-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                    v-model="item.descripcion_asignado"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn mt-2 btn-danger btn-sm" @click="eliminar(index)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            <FormularioSig :encargados="encargados" :OT="OT" :items_costos="itemsCompletos" :userlogued="userlogued"
                v-if="formulario" />
            <div v-if="ordenes_trabajo_empleados.length <= 0">
                <h3>No hay ordenes de trabajo asignadas</h3>
            </div>
            <div v-else>
                <div class="row" style="float: left; clear: both; color: #d06519">
                    <div class="col-xs-12 col-md-12">
                        <h5 v-if="ordenes_trabajo_empleados.length > 0 && !formulario">
                            Mostrando {{ links.per_page }} de {{ links.total }} registros -
                            página {{ links.current_page }}
                        </h5>
                    </div>
                </div>
                <div v-if="ordenes_trabajo_empleados.length > 0" class="row" style="clear: both">
                    <div class="col-xs-3 col-md-3" v-if="!formulario">
                        <label for="exampleFormControlInput1" class="form-label">Cantidad de registros a listar</label>
                        <select class="form-select form-select-sm" @change="getOrdenesTrabajo()" v-model="cantidad"
                            aria-label="Default select example">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div class="col-xs-3 col-md-3">
                        <button type="button" @click="abrirFormulario"
                            style="float:left;margin-top: 30px; margin-bottom:30px" class="btn btn-warning btn-sm">
                            {{ formulario == false ? 'Ejecutar ordenes de trabajo' : 'Ver mis ordenes de trabajo' }}
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table v-if="!formulario" class="table align-middle table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th @click="sort(item, index + 1, (sorted = !sorted))" scope="col"
                                    v-for="(item, index) in tabla" :key="index">
                                    {{ item.nombre }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in ordenes_trabajo_empleados" :key="item.id">
                                <td scope="row">{{ index + 1 }}</td>
                                <td>{{ item.numero }}</td>
                                <td>{{ item.estado }}</td>
                                <td>{{ item.actividad }}</td>
                                <td>{{ item.direccion }}</td>
                                <td>{{ item.responsable }}</td>
                                <td>{{
                                    item.descripcion == null ? 'Sin observación' : item.descripcion == '' ? 'Sin observación': item.descripcion }}</td>
                                <td>{{ item.fecha_asignado }}</td>
                                <td>
                                    <div class="form-check form-check-inline" v-if="item.estado == 'Activo'">
                                        <input class="form-check-input" @change="item.checked = !item.checked" v-model="OT"
                                            type="checkbox" :value="item.numero + '-' + item.id">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button v-if="ordenes_trabajo_empleados.length > 0 && !formulario" type="submit" style="margin: 15px"
                @click="goScroll(80, 0, 'up')" id="scroll" class="btn">
                <i class="bi bi-chevron-double-up"></i>
            </button>
            <div v-if="ordenes_trabajo_empleados.length > 0 && !formulario" class="content">
                <nav class="pagin" aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a :style="
                                item.active == true
                                    ? 'background-color:#d06519'
                                    : 'background-color:#21618C'
                            " class="page-link" v-for="(item, index) in links.links" :key="index"
                                @click="pagination(item.url), (currentUrl = item.url), goScroll(80, 0)">{{
                                    index == 0
                                    ? "Anterior"
                                    : index == siguiente - 1
                                        ? "siguiente"
                                        : item.label
                                }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import FormularioSig from './FormularioSig.vue';

export default {
    props: {
        userlogued: {}
    },
    components: {
        FormularioSig
    },
    data() {
        return {
            ordenes_trabajo: [],
            empleados: [],
            orden_trabajo_empleado: {},
            ordenes_trabajo_empleados: [],
            URL_API: process.env.VUE_APP_URL_API,
            accion: "Asinar orden de trabajo",
            asignados: [],
            orden_trabajo: "",
            empleado: "",
            descripcion: "",
            orden_trabajo_asignado: "",
            empleado_asignado: "",
            descripcion_asignado: "",
            OT: [],
            formulario: false,
            encargados: '',
            currentUrl: "",
            links: [],
            siguiente: 0,
            cantidad: 20,
            sorted: false,
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Orden de trabajo", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Estado", orden: "DESC", tipo: "texto", calculado: 'true' },
                { nombre: "Descripción actividad", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Dirección", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Encargado", orden: "DESC", tipo: "texto", calculado: 'true' },
                { nombre: "Observación", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Fecha creación", orden: "DESC", tipo: "fecha", calculado: 'false' },
                { nombre: "Ejecución", orden: "DESC", tipo: "texto", calculado: 'true' },
            ],
            categorias: [],
            categoria: '',
            item: '',
            items: [],
            codigo_id: '',
            observacion: '',
            selected: [
            ],
            cantidadItem: [],
            itemsCompletos: [],
            hover1: false,
            hover2: false,
            value: '',
            categoriasFilter: [],
            itemsFlter: []
        };
    },
    created() {
        this.getOrdenesTrabajo();
        this.getCategoriaItem();
    },
    methods: {
        filterResults(value, array, nombrearray) {
            let search = ''
            if (nombrearray == 'categorias') {
                search = array.filter(item => item.nombre.toLowerCase().match(value.toLowerCase()));
                this.categoriasFilter = search
            }
            if (nombrearray == 'items') {
                if (search == '') {
                    search = array.filter(item => item.item.toLowerCase().match(value.toLowerCase()));
                    this.itemsFlter = search
                }
                if (search == '') {
                    search = array.filter(item => item.descripcion.toLowerCase().match(value.toLowerCase()));
                    this.itemsFlter = search
                }
            }

        },
        deleteItem(index) {
            this.selected.splice(index, 1)
            this.itemsCompletos.splice(index, 1)
        },
        addItem(item) {
            this.selected.push({ item: item.descripcion })
            this.itemsCompletos.push(item)
        },
        abrirFormulario() {
            if (this.OT.length > 0) {
                this.formulario = !this.formulario
                if (this.formulario == false) {
                    this.getOrdenesTrabajo()
                    this.OT = []
                }
            } else {
                this.showAlert('No ha seleccionado ninguna orden de trabajo', 'error')
            }
        },
        // validateNumericField(numero, index) {
        //     if (numero != '') {
        //         if (isNaN(numero)) {
        //             console.log(numero, index)
        //             // this.item.cantidadItem = numero.substr(0, numero.length - 1);
        //             //   this.empleados[index].cedula = numero.substr(0, numero.length - 1);
        //         }
        //     }
        // },
        getOrdenesTrabajo() {
            let self = this;
            let config = this.configHeader();
            axios.get(self.URL_API + "api/v1/ordenestrabajoasignadas/" + self.cantidad, config).then(function (result) {
                self.ordenes_trabajo_empleados = result.data.data;
                self.encargados = result.data.data[0].responsable.split("-")[1] + ',' + result.data.data[0].gestor_sst.split("-")[1] + ',' + result.data.data[0].autor;
                self.links = result.data;
                self.siguiente = result.data.links.length;
                self.ordenes_trabajo_empleados.forEach(function (item) {
                    item.checked = false;
                });
            });
        },
        getCategoriaItem() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/listacodigoitem", config)
                .then(function (result) {
                    self.categorias = result.data;
                    self.categoriasFilter = result.data;
                });
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/costoitemcategoria/" + self.codigo_id
            let config = this.configHeader();
            axios
                .get(urlEndPoint, config)
                .then(function (result) {
                    self.items = result.data;
                    self.itemsFlter = result.data;
                });
        },
        id_codigo(categoria) {
            let self = this
            this.categorias.forEach(element => {
                if (categoria == element.nombre) {
                    self.codigo_id = element.id
                    self.getItems()
                }
            });
        },
        pagination(pag) {
            if (pag != null) {
                let self = this;
                let config = this.configHeader();
                axios.get(pag, config).then(function (result) {
                    self.links = result.data;
                    self.ordenes_trabajo_empleados = result.data.data;
                });
            }
        },
        goScroll(top, left, direction) {
            if (direction == 'down') {
                let container = document.getElementById("container");
                top = container.clientHeight
            }
            window.scroll({
                top: top,
                left: left,
                behavior: "smooth",
            });
        },
        sort(item, numero) {
            this.tabla.forEach(function (item, index) {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (index) + "):after", "content: \" \";");
            });
            if (item.orden == "DESC") {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero) + "):after", "content: \" ↓\";");
                this.sortDesc(numero);
                this.tabla[numero - 1].orden = "ASC";
            }
            else {
                document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero) + "):after", "content: \" ↑\";");
                this.sortAcs(numero);
                this.tabla[numero - 1].orden = "DESC";
            }
        },
        sortAcs(numero) {
            this.ordenes_trabajo_empleados.sort(function (a, b) {
                if (Object.values(a)[numero - 1] < Object.values(b)[numero - 1]) {
                    return -1;
                }
                if (Object.values(a)[numero - 1] > Object.values(b)[numero - 1]) {
                    return 1;
                }
                return 0;
            });
        },
        sortDesc(numero) {
            this.ordenes_trabajo_empleados.reverse(function (a, b) {
                if (Object.values(a)[numero - 1] < Object.values(b)[numero - 1]) {
                    return -1;
                }
                if (Object.values(a)[numero - 1] > Object.values(b)[numero - 1]) {
                    return 1;
                }
                return 0;
            });
        },
        agregar() {
            let self = this;
            this.asignados.push({ "orden_trabajo_asignado": self.orden_trabajo, "empleado_asignado": self.empleado, "descripcion_asignado": self.descripcion });
        },
        eliminar(index) {
            this.asignados.splice(index, 1);
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

input,
select {
    margin-bottom: 20px;
}

.form-check-input,
.form-check {
    margin: 0;
    padding: 0;
}

.pagin {
    margin: auto;
}

.pagination .page-item {
    display: flex;
    cursor: pointer;
}

.content ul li a {
    color: white;
}

#scroll {
    color: white;
    background: #e67e22;
    font-size: 1.3rem;
}

#desmonte {
    background-color: rgb(241, 7, 7);
    color: white;
}

th {
    white-space: nowrap;
    cursor: pointer;
}

/* Select con filtro personalizado */
#contenedor-select {
    position: relative;
}

#select1 {
    z-index: 200;
}

#select2 {
    z-index: 100;
}

#select1,
#select2 {
    padding: 5px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top: 70px;
    left: 13px;
    background-color: white;
    cursor: pointer;
}

#select1 #lista1,
#select2 #lista2 {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

#select1 #lista1:hover,
#select2 #lista2:hover {
    background-color: #0d6efd;
    color: white;
}

span {
    height: 37px;
}

/* Fin select con filtro personalizado */
</style>