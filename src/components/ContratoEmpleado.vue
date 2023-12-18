<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar contratos - empleados</h2>
            <div class="card col-xs-12 col-md-6" >
                <h5>{{ accion }}</h5>
                <form>
                    <div class="col-xs-12 col-md-12">
                        <div>
                            <label for="exampleFormControlInput1" class="form-label">Contrato</label>
                            <select class="form-select" v-model="contrato" @change="contratoId(contrato)"
                                aria-label="Default select example">
                                <option v-for="(item, index) in contratos" :key="index">{{ item.numero }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12">
                        <div>
                            <label for="exampleFormControlInput1" class="form-label">Empleado</label>
                            <select class="form-select" v-model="empleado" @change="empleadoId(empleado)"
                                aria-label="Default select example">
                                <option v-for="(item, index) in empleados" :key="index">{{ item.nombres }}
                                    {{ item.apellidos }} - {{ item.documento_identidad }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12">
                        <div>
                            <label for="exampleFormControlInput1" class="form-label">Subregión</label>
                            <select class="form-select" v-model="zona" @change="zonaId(zona)"
                                aria-label="Default select example">
                                <option v-for="(item, index) in zonas" :key="index">{{ item.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Observación</label>
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
        Tabla
    },
    data() {
        return {
            accion: 'Asignar empleado a un contrato',
            contrato_id: '',
            contratoId_: '',
            contratos: [],
            empleado_id: '',
            empleadoId_: '',
            empleados: [],
            zona_id: '',
            zonaId_: '',
            zonas: [],
            contrato_empleado: [],
            empleado_contrato: {},
            URL_API: process.env.VUE_APP_URL_API,
            actuallizar_empleado_contrato: false,

            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            contrato: '',
            empleado: '',
            zona: '',
            descripcion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'contratoempleado',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Contrato", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Estado del contrato", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Observaciones", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Descripción del contrato", orden: "DESC",tipo:"texto",calculado:'false' },
                { nombre: "Subregión", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Nombres empleado", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Apellidos empleado", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Documento de identidad", orden: "DESC",tipo:"texto",calculado:'true' },
                { nombre: "Cargo", orden: "DESC",tipo:"texto",calculado:'true' },
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
        this.getContratos();
        this.getEmpleados();
        this.getZonas();
        this.getContratoEmpleado();
        this.getItems();
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
            urlEndPoint = self.URL_API + "api/v1/contratoempleado/" + self.cantidad
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
            this.actualizar = true
            this.currentUrl = response.currentUrl
            this.contrato = response.contrato
            this.empleado = response.nombres_empleado + ' ' + response.apellidos_empleado + ' - ' + response.documento_identidad_empleado
            this.zona = response.zona
            this.descripcion = response.descripcion
            this.idItem = response.id
            this.contratoId(response.contrato)
            this.empleadoId(response.documento_identidad_empleado)
            this.zonaId(response.zona)
            this.accion = 'Editar Registro'
            this.checks = []

        },
        getContratos() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/contratoslista", config).then(function (result) {
                self.contratos = result.data;
                self.listas.splice(1,0,result.data)
                self.listas.splice(2,0,result.data)
            });
        },
        getEmpleados() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/sigempleadoslista", config).then(function (result) {
                self.empleados = result.data;
                self.listas.splice(6,0,result.data)
                self.listas.splice(7,0,result.data)
                self.listas.splice(8,0,result.data)
                self.listas.splice(9,0,result.data)
            });
        },
        getZonas() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/zonaslista", config).then(function (result) {
                self.zonas = result.data;
                self.listas.splice(5,0,result.data)
            });
        },
        getContratoEmpleado() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/contratoempleado/10", config).then(function (result) {
                self.contrato_empleado = result.data.data;
            });
        },
        contratoId(contrato) {
            let self = this;
            var cont = 0;
            this.contratos.forEach(function (element) {
                if (contrato == element.numero) {
                    self.contrato_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.contrato_id = "";
            }
        },
        empleadoId(empleado) {
            let documento = empleado.split(" ")
            let self = this;
            var cont = 0;
            this.empleados.forEach(function (element) {
                if (documento[documento.length - 1] == element.documento_identidad) {
                    self.empleado_id = element.id;
                    // console.log(element.id)
                    cont++;
                }
            });
            if (cont <= 0) {
                self.empleado_id = "";
            }
        },
        zonaId(zona) {
            let self = this;
            var cont = 0;
            this.zonas.forEach(function (element) {
                if (zona == element.nombre) {
                    self.zona_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.zona_id = "";
            }
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.contrato_id = this.contrato_id
                this.campos.empleado_id = this.empleado_id
                this.campos.zona_id = this.zona_id
                this.campos.descripcion = this.descripcion
            } else {
                let self = this;
                let urlEndPoint = ''
                self.empleado_contrato = {
                    'contrato': this.contrato_id,
                    'empleado': this.empleado_id,
                    'zona': this.zona_id,
                    'descripcion': this.descripcion,
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/contratoempleado/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/contratoempleado"
                }
                let config = this.configHeader();
                axios
                    .post(urlEndPoint, self.empleado_contrato, config)
                    .then(function (result) {
                        self.showAlert(result.data.message, result.data.status);
                        self.getItems();
                        self.clear()
                    });
            }
        },
        clear() {
            this.contrato = '';
            this.empleado = '';
            this.zona = '';
            this.descripcion = '';
            this.contrato_id = ''
            this.empleado_id = ''
            this.zona_id = ''
            this.actualizar = false
            this.accion='Asignar empleado a un contrato'
        },
        check(check) {
            this.checks = check
        },
        back() {
            this.$router.go(-1);
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

select {
    margin-bottom: 20px;
}
</style> -->