<template>
    <div class="was-validated">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{{ nombreCampo }}:</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                <input type="text" @focus="consultaEndPoint()" @click="modal = true" autocomplete="off" class="form-control"
                    id="exampleInputEmail2" :placeholder="placeholder" aria-describedby="emailHelp" v-model="registro"
                    :required="valida_campo" />
                <span class="input-group-text" style="cursor:pointer" @click="registro = '', retornoValorCampo()"
                    id="basic-addon3"><i class="bi bi-x"></i></span>
                <div class="invalid-feedback">
                    {{ mensaje_error }}
                </div>
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
                            <div class="col-6">
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail2"
                                        placeholder="Buscar por código o descripción" aria-describedby="emailHelp"
                                        v-model="search" />
                                </div>
                            </div>
                            <div class="col">
                                <button type="button" @click="buscarRegistro()" class="btn btn-success"
                                    data-bs-dismiss="modal">Buscar</button>
                            </div>
                            <div class="col">
                                <button type="button" @click="consultaEndPoint(), search = ''" class="btn btn-success"
                                    data-bs-dismiss="modal">Borrar búsqueda</button>
                            </div>
                        </div>
                        <div v-if="!sin_registros" class="table-responsive">
                            <table class="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">Código</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in items_tabla2" :key="item.id">
                                        <td v-for="(item2) in campos2" :key="item2.id" style="text-align:justify"
                                            @click="registro = item[campos2[0]] + ' ' + item[campos2[1]], retornoValorCampo(item[campos2[0]]), modal = !modal">
                                            {{ item[item2] }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="content">
                                <nav class="pagin" aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a :style="item.active == true
                                                    ? 'background-color:#d06519'
                                                    : 'background-color:#006b3f'
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
                        <div v-else>
                            <div v-if="spinner">
                                <div class="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <h5>Cargando por favor espere un momento.</h5>
                            </div>
                            <h3 v-else>No hay resgistros guardados</h3>
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
        datos: [],
        nombreCampo: {},
        placeholder: {},
        showmodal: {
            type: Boolean,
            default: false
        },
        nombreItem: [],
        endpoint: {},
        item: {
            type: String,
            default: ''
        },
        item1: {
            type: String,
            default: ''
        },
        item2: {
            type: String,
            default: ''
        },
        valida_campo: {
            type: Boolean,
            default: true
        },
        eventoCampo: {},
        ubicacion: {},
        posicion: {},
        consulta: {
            type: String,
            default: ''
        },

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
            URL_API: process.env.VUE_APP_URL_API,
            tabla2: [],
            items_tabla2: [],
            campos2: [],
            siguiente: 0,
            currentUrl: "",
            links: [],
            listaItem: [],
            sin_registros: true,
            spinner: true,
            mensaje_error: '¡Este campo debe ser diligenciado!'
        }
    },

    watch: {
        consulta: function () {
            this.registro = this.consulta
        },
        datos: function () {
            this.spinner = false
            if (this.datos.data != undefined) {
                this.llenarTabla(this.datos)
                this.sin_registros = false
            }

        },
    },

    created() {
        this.registro = this.consulta
    },
    methods: {
        buscarRegistro() {
            let self = this;
            let config = this.configHeader();
            let url = ''
            if (this.item) {
                url = self.URL_API + "api/v1/" + this.endpoint + '/' + this.item + '/' + this.search + '/' + this.item1 + '/' + this.item2, config
            } else {
                url = self.URL_API + "api/v1/" + this.endpoint + '/' + this.search, config
            }
            axios.get(url)
                .then(function (result) {
                    self.llenarTabla(result.data)
                }).catch(function (error) {
                    console.log(error);
                });
        },
        consultaEndPoint() {
            this.$emit(this.eventoCampo)
        },
        retornoValorCampo(item) {
            if (this.registro != undefined) {
                this.$emit(this.eventoCampo, this.registro)
                this.$emit('getValue', item + 'posicion' + this.posicion)
            }
        },
        codigoItem(item) {
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
                    self.links = result.data.links
                    self.llenarTabla(result.data)
                });
            }
        },
        llenarTabla(datos) {
            let self = this
            if (datos.data.length > 0) {
                let claves = Object.keys(datos.data[0]); // Crea un array con los campos de los registros para ordenarlos posteriormente
                self.campos2 = []
                claves.forEach((element) => {
                    self.campos2.push(element)
                });
            } else {
                this.sin_registros = true
            }
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
    margin: 0px;
    padding: 0px;
    margin: auto;
}

.pagination .page-item {
    display: flex;
    cursor: pointer;
}

.content ul li a {
    color: white;
}

/*spiner*/
.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 50px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(10, 10, 10);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(199, 195, 195) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* fin spinner*/</style>