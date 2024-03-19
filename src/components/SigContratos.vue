<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar Contratos</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número</label>
                        <input type="text" class="form-control" :disabled="checks.length > 0" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero" />
                    </div>
                    <div class="col-xs-12 col-md-12" v-if="actualizar || checks.length > 0">
                        <div>
                            <label for="exampleFormControlInput1" class="form-label">Estado</label>
                            <select class="form-select" v-model="estado_contrato"
                                @change="estadoContratoId(estado_contrato)" aria-label="Default select example">
                                <option v-for="(item, index) in estados_contrato" :key="index">{{ item.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Descripción</label>
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                v-model="descripcion"></textarea>
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
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos" :listas="listas" 
                @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Tabla from './Tabla.vue';

export default {
    components: {
        Tabla,
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            accion: 'Insertar Contrato',
            contratos: [],
            estados_contrato: [],
            estado_contrato: '',
            contrato: {},
            estado_contrato_id: '',
            actualizar: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            numero: '',
            estado: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'contratos',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Número contrato", orden: "DESC",tipo:"texto", calculado:'false' },
                { nombre: "Descripción", orden: "DESC",tipo:"texto", calculado:'false' },
                { nombre: "Estado", orden: "DESC",tipo:"texto", calculado:'true' },
                { nombre: "Fecha Inserción", orden: "DESC",tipo:"fecha", calculado:'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            idItem: '',
            listas:[]
        };
    },
    created() {
        this.llenarLista()
        this.getItems()
        this.getEstadosContrato()
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
            urlEndPoint = self.URL_API + "api/v1/contratos/" + self.cantidad
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
            this.numero = response.numero
            this.estado_contrato = response.estado_contrato_id
            this.descripcion = response.descripcion
            this.idItem = response.id
            this.actualizar = true
            this.estadoContratoId(this.estado_contrato)
            this.accion = 'Editar Contrato'
            this.checks = []
        },
        check(check) {
            this.checks = check
        },
        getEstadosContrato() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadocontratolista", config)
                .then(function (result) {
                    self.estados_contrato = result.data;
                    self.listas.splice(3,0,result.data)
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
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.numero = this.numero
                this.campos.estado_contrato_id = this.estado_contrato_id
                this.campos.descripcion = this.descripcion
            } else {
                let self = this;
                let urlEndPoint = ''
                self.contrato = {
                    'numero': this.numero,
                    'estado': this.estado_contrato_id,
                    'descripcion': this.descripcion,

                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/contratos/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/contratos"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.contrato, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        clear() {
            this.contrato = {};
            this.numero = ""
            this.descripcion = ""
            this.estado_contrato = ""
            this.estado_contrato_id = ""
            this.id = ""
            this.actualizar = false
            this.accion = "Insertar contrato";
        },
        back() {
            this.$router.go(-1);
        },
        estadoContratoId(estado_contrato) {
            let self = this;
            var cont = 0;
            this.estados_contrato.forEach(function (element) {
                if (estado_contrato == element.nombre.trim()) {
                    self.estado_contrato_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.estado_contrato_id = "";
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

select {
    margin-bottom: 20px;
}
</style> -->