<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar costos</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <div>
                                <label for="exampleFormControlInput1" class="form-label">Categoría</label>
                                <select class="form-select" v-model="codigo" @change="id_codigo(codigo)"
                                    aria-label="Default select example">
                                    <option v-for="(item, index) in categorias" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Item</label>
                                <input type="text" class="form-control" id="exampleInputEmail2"
                                    aria-describedby="emailHelp" v-model="item" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <div>
                                <label for="exampleFormControlInput1" class="form-label">Unidad de medida</label>
                                <select class="form-select" v-model="unidad_medida"
                                    @change="id_unidad_medida(unidad_medida)" aria-label="Default select example">
                                    <option v-for="(item, index) in unidades_medida" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Valor unitario</label>
                                <input type="text" class="form-control" @keyup="validateNumericField(valor_unitario)"
                                    id="exampleInputEmail2" aria-describedby="emailHelp" v-model="valor_unitario" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <div>
                                <label for="exampleFormControlInput1" class="form-label">Subregión</label>
                                <select class="form-select" v-model="subregion"
                                    @change="id_subregion(subregion)" aria-label="Default select example">
                                    <option v-for="(item, index) in subregiones" :key="index">
                                        {{ item.nombre }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Descripción</label>
                                <div class="mb-3">
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        v-model="descripcion"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success" @click="save()">
                        Guardar
                    </button>
                    <button type="submit" class="btn btn-warning" @click="clear">
                        Limpiar
                    </button>
                    <button type="submit" class="btn btn-primary" @click="back">
                        Atrás
                    </button>
                </form>
            </div>
            <CargueMasivo :endpoint="endpoint" @getItems="getItems" />
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos" :listas="listas"
                @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Tabla from './Tabla.vue';
import CargueMasivo from './CargueMasivo.vue';

export default {
    components: {
        Tabla,
        CargueMasivo
    },
    data() {
        return {
            mensaje:'error por favor intente nuevamente alerta!!!',
            URL_API: process.env.VUE_APP_URL_API,
            accion: 'Insertar items de costos',
            categorias: [],
            costo_item: {},
            unidades_medida: [],
            subregiones: [],
            actualizar: false,
            idItem: '',
            codigo_id: '',
            unidad_medida_id: '',
            subregion_id: '',
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            codigo: '',
            item: '',
            unidad_medida: '',
            valor_unitario: '',
            descripcion: '',
            subregion:'',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'costoitem',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Categoría", orden: "DESC",tipo:"texto", calculado:'true' },
                { nombre: "Item", orden: "DESC",tipo:"texto", calculado:'false' },
                { nombre: "Descripcion ítem", orden: "DESC",tipo:"texto", calculado:'false' },
                { nombre: "Unidad de medida", orden: "DESC",tipo:"texto", calculado:'true' },
                { nombre: "Valor unitario", orden: "DESC",tipo:"numero", calculado:'false' },
                { nombre: "Subregion", orden: "DESC",tipo:"texto", calculado:'true' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            listas:[]
        };
    },

    created() {
        this.llenarLista()
        this.getItems()
        this.getCategoriaItem()
        this.getUnideadesMedida()
        this.getSubregiones()
    },

    methods: {
        llenarLista(){
            this.tabla.forEach((item)=>{
                if(item.calculado == 'false'){
                    this.listas.push([])
                }
            })
            this.listas.push([])
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/costoitem/" + self.cantidad
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
            this.currentUrl = response.currentUrl
            this.codigo = response.id_codigo
            this.item = response.item
            this.descripcion = response.descripcion
            this.unidad_medida = response.id_unidad_medida
            this.valor_unitario = response.valor_unitario
            this.subregion = response.id_subregion
            this.idItem = response.id
            this.actualizar = true
            this.id_codigo(this.codigo)
            this.id_unidad_medida(this.unidad_medida)
            this.id_subregion(this.subregion)
            this.accion = 'Editar items de costos'
            this.checks = []
        },
        getCategoriaItem() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/listacodigoitem", config)
                .then(function (result) {
                    self.categorias = result.data;
                    self.listas.splice(1,0,result.data)
                });
        },
        getUnideadesMedida() {
            let config = this.configHeader();
            let self = this;
            axios
                .get(self.URL_API + "api/v1/listaunidadmedida", config)
                .then(function (result) {
                    self.unidades_medida = result.data;
                    self.listas.splice(4,0,result.data)
                });
        },
        getSubregiones() {
            let config = this.configHeader();
            let self = this;
            axios
                .get(self.URL_API + "api/v1/zonaslista", config)
                .then(function (result) {
                    self.subregiones = result.data;
                    self.listas.splice(6,0,result.data)
                });
        },
        id_codigo(categoria) {
            let self = this
            this.categorias.forEach(element => {
                if (categoria == element.nombre) {
                    self.codigo_id = element.id
                }
            });
        },
        id_unidad_medida(unidad) {
            let self = this
            this.unidades_medida.forEach(element => {
                if (unidad == element.nombre) {
                    self.unidad_medida_id = element.id
                }
            });
        },
        id_subregion(subregion) {
            let self = this
            this.subregiones.forEach(element => {
                if (subregion == element.nombre) {
                    self.subregion_id = element.id
                }
            });
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.id_codigo = this.codigo_id
                this.campos.item = this.item
                this.campos.id_unidad_medida = this.unidad_medida_id
                this.campos.valor_unitario = this.valor_unitario
                this.campos.descripcion = this.descripcion
                this.campos.id_subregion = this.subregion_id
            } else {
                let self = this;
                let urlEndPoint = ''
                self.costo_item = {
                    'codigo': this.codigo_id,
                    'item': this.item,
                    'descripcion': this.descripcion,
                    'unidad_medida': this.unidad_medida_id,
                    'valor_unitario': this.valor_unitario,
                    'id_subregion': this.subregion_id,
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/costoitem/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/costoitem"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.costo_item, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        back() {
            this.$router.go(-1);
        },
        clear() {
            this.codigo = ''
            this.item = ''
            this.descripcion = ''
            this.unidad_medida = ''
            this.valor_unitario = ''
            this.subregion = ''
            this.actualizar = false
            this.accion = 'Insertar items de costos'
        },
        check(check) {
            this.checks = check
        },
        showAlert(mensaje, icono) {
            this.$swal({
                position: "top",
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: 1500,
            });
        },
        validateNumericField(numero) {
            try {
                if (numero != "") {
                    if (isNaN(numero)) {
                        this.valor_unitario = numero.substr(
                            0,
                            numero.length - 1
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
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

span {
    margin: auto;
}

.col {
    margin-bottom: 20px;
}
</style> -->