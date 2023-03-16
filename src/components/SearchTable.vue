<template>
    <div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{{ nombreCampo }}:</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                <input type="text" @click="modal = true" autocomplete="off" class="form-control" id="exampleInputEmail2"
                    :placeholder="placeholder" aria-describedby="emailHelp" v-model="registro" />
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade show mask" id="exampleModal" :style="modal ? 'display: block' : 'display: none'"
            role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Seleccione registro</h1>
                        <button type="button" @click="modal = !modal" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-8">
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail2"
                                        placeholder="Buscar por código o nombre" aria-describedby="emailHelp"
                                        v-model="search" />
                                </div>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Buscar</button>
                            </div>
                        </div>


                        <table class="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Descripción</th>
                                </tr>
                            </thead>
                            <!-- <tbody>
                                <tr v-for="item, index in registros" :key="index">
                                    <td @click="registro = item.nombre, modal = false">{{ codigoItem(item) }}</td>
                                    <td @click="registro = item.nombre, modal = false">{{ descripcionItem(item) }}</td>
                                </tr>
                            </tbody> -->
                            <tbody>
                                <tr v-for="(item, index) in items_tabla2" :key="item.id">
                                    <td v-for="(item2) in campos2" :key="item2.id" style="text-align:justify">{{ item2 ==
                                        'id' ? index +
                                    1 : item[item2] ==
                                        null ? 'Sin datos' : item2.includes('valor') ?
                                        formatCurrency(item[item2]) : item[item2].includes('000000Z') ? fecha(item[item2]) :
                                            item[item2] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="content">
                            <nav class="pagin" aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a :style="
                                            item.active == true
                                                ? 'background-color:#d06519'
                                                : 'background-color:#21618C'
                                        " class="page-link" v-for="(item, index) in links" :key="index"
                                            @click="pagination(item.url), currentUrl = item.url">{{
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
                    <div class="modal-footer">
                        <button type="button" @click="modal = !modal" class="btn btn-warning" data-bs-dismiss="modal">Cerrar
                            ventana</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        registros: [],
        nombreCampo: {},
        placeholder: {},
        showmodal: {
            type: Boolean,
            default: false
        },
        nombreItem: [],
        endpoint: {},

        // *****************
        // tabla: [],
        // datos: [],
        // campos: {},
        // listas: []
    },
    data() {
        return {
            modal: this.showModal,
            registro: '',
            search: '',
            // ************
            URL_API: process.env.VUE_APP_URL_API,
            tabla2: [],
            items_tabla2: [],
            campos2: [],
            siguiente: 0,
            currentUrl: "",
            links: [],
            listaItem: [],
            datos: []
        }
    },

    watch: {
        registros: function () {
            this.datos = this.registros
            if (this.datos.data.length > 0) {
                this.llenarTabla(this.datos)
                this.sin_registros = false
            }
        },
    },

    created() {
    },
    methods: {
        codigoItem(item) {
            // console.log(this.nombreItem[0])
            return item[this.nombreItem[0]];
        },
        descripcionItem(item) {
            return item[this.nombreItem[1]];
        },
        pagination(pag) {
            if (pag != null) {
                let self = this;
                let config = this.configHeader();
                axios.get(pag, config).then(function (result) {
                    self.links = result.data
                    self.llenarTabla(result)
                    console.log(result)
                });
            }
        },
        llenarTabla(datos) {
            console.log('llenando tabla', datos)
            let self = this
            if (datos.data.length > 0) {
                let claves = Object.keys(datos.data[0]); // Crea un array con los campos de los registros para ordenarlos posteriormente
                console.log(claves)
                self.campos2 = []
                claves.forEach((element) => {
                    self.campos2.push(element)
                });
                console.log(self.campos2)
            } else {
                this.sin_registros = true
            }
            // this.tabla2 = this.tabla; // Encabezados de la tabla
            this.items_tabla2 = datos.data; // lista de registros
            self.links = datos.links;
            self.siguiente = this.links.length;
           
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
tr td {
    cursor: pointer;
}

.mask {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
    transition: opacity 0.3s ease;
    position: fixed;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

.table td,
.table th {
    text-align: justify;
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

</style>