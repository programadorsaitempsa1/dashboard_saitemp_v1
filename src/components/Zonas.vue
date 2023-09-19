<!-- <template>
    <div>
        <div class="container">
            <h2>Administrar subregiones</h2>
            <div class="card col-xs-12 col-md-6">
                <h5>{{ accion }}</h5>
                <form>
                     <!-- Select con filtro personalizado -->
                     <div class="row" id="contenedor-select"> 
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Departamento</label>
                            <div class="input-group">
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                            <input type="text" @click="hover1 = !hover1" autocomplete="off" @input="filterResults(departamento,departamentos,'departamentos')" class="form-control" id="exampleInputEmail2" placeholder="Departamento"
                            aria-describedby="emailHelp" v-model="departamento"/>
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover1 && departamentos.length > 0" id="select1" @mouseleave="hover1 = false">
                            <div  id="lista1" v-for="(item, index) in departamentosFilter" :key="index" @click="departamento = item.nombre, departamentoId(departamento), hover1 = !hover1, filterResults('',departamentos,'departamentos')">
                                {{ item.nombre }}
                            </div>
                        </div>
                    </div>
                     <!-- Fin select con filtro personalizado -->
                     <!-- Select con filtro personalizado -->
                     <div class="row" id="contenedor-select"> 
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Municipio</label>
                            <div class="input-group">
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                            <input type="text" @click="hover2 = !hover2" autocomplete="off" @input="filterResults(municipio,municipios,'municipios')" class="form-control" id="exampleInputEmail2" placeholder="Municipio"
                            aria-describedby="emailHelp" v-model="municipio"/>
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover2 && municipios.length > 0" id="select2" @mouseleave="hover2 = false">
                            <div  id="lista2" v-for="(item, index) in municioiosFilter" :key="index" @click="municipioId(municipio), municipiosSubregion.push(item.nombre), hover2 = !hover2, municipio= '',filterResults('',municipios,'municipios')">
                                {{ item.nombre }}
                            </div>
                        </div>
                    </div>
                     <!-- Fin select con filtro personalizado -->
                    <div class="mb-3" v-if="municipiosSubregion.length > 0">
                        <div class="mb-3" style="padding:10px;border: solid #D5DBDB 0.5px;border-radius:10px">
                            <button type="button" style="margin:10px 10px 5px 10px" id="btnMunicipio" class="btn btn-sm"
                                data-bs-toggle="button" v-for="item, index in municipiosSubregion" :key="index">{{
                                    item
                                }}
                                <i class="bi bi-x" @click="municipiosSubregion.splice(index, 1)"></i></button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre subregión</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="nombre" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Descripción</label>
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                v-model="observacion"></textarea>
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
            <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
                :listas="listas" @response="response" @clear="clear" @check="check" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Tabla from './Tabla.vue';
export default {
    components: {
        Tabla,
    },
    data() {
        return {
            zonas: [],
            URL_API: process.env.VUE_APP_URL_API,
            municipio_id: '',
            actualizar_zona: false,
            accion: "Insertar subregión",
            departamentos: [],
            municipios: [],
            departamentoId_: "",
            actualizar: false,
            currentUrl: '',
            cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
            // Campos formulario
            departamento: '',
            municipio: '',
            nombre: '',
            observacion: '',
            // Fin campos formulario
            // Info enviada al componente tabla por props
            datos: [],
            endpoint: 'zonas',
            tabla: [
                { nombre: "#", orden: "DESC" },
                { nombre: "Nombre subregión", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Descripción", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Departamento", orden: "DESC", tipo: "texto", calculado: 'false' },
                { nombre: "Municipios", orden: "DESC", tipo: "texto", calculado: 'false' },
            ],
            // Fin info enviada al componente tabla por props
            checks: [],
            massiveUpdate: false,
            campos: {},
            idItem: '',
            listas: [],
            municipiosSubregion: [],
            hover1: false,
            hover2: false,
            value:'',
            departamentosFilter:[],
            municioiosFilter:[],
            item:''
        };
    },
    created() {
        this.getItems()
        this.getDepartamentos()
    },
    methods: {
        filterResults ( value,array,nombrearray ) {
          const search = array.filter(item => item.nombre.toLowerCase().match(value.toLowerCase()));
          if(nombrearray == 'departamentos'){
              this.departamentosFilter = search
          }else{
            this.municioiosFilter = search
          }
        },
        getItems() {
            let self = this;
            let urlEndPoint = ''
            urlEndPoint = self.URL_API + "api/v1/zonas/" + self.cantidad
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
            this.departamentoId(response.departamento)
            this.currentUrl = response.currentUrl
            this.departamento = response.departamento
            this.nombre = response.nombre
            this.observacion = response.observacion
            this.idItem = response.id
            this.actualizar = true
            this.accion = "Editar subregión";
            this.checks = []
            let municipios = response.municipios.split(",")
            for (var i = 0; i < municipios.length; i++) {
                this.municipiosSubregion[i] = municipios[i].trim();
            }
        },
        check(check) {
            this.checks = check
        },
        getDepartamentos() {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/departamentos", config).then(function (result) {
                self.departamentos = result.data;
                self.departamentosFilter = result.data;
                // self.listas.splice(3, 0, result.data)
            });
        },
        getMunicipios(id) {
            let config = this.configHeader();
            let self = this;
            axios.get(self.URL_API + "api/v1/municipios/" + id, config).then(function (result) {
                self.municipios = result.data;
                self.municioiosFilter = result.data;
                // self.listas.splice(4, 0, result.data)
            });
        },
        save() {
            if (this.checks.length > 0) { // validación para realizar actualización masiva
                this.massiveUpdate = !this.massiveUpdate
                this.campos.nombre = this.nombre
                this.campos.observacion = this.observacion
                this.campos.departamento = this.departamento
            } else {
                let self = this;
                let urlEndPoint = ''

                self.contrato = {
                    'municipios': this.municipiosSubregion,
                    'nombre': this.nombre,
                    'observacion': this.observacion,
                    'departamento': this.departamento,
                }
                if (self.actualizar) {
                    urlEndPoint = self.URL_API + "api/v1/zonas/" + self.idItem
                } else {
                    urlEndPoint = self.URL_API + "api/v1/zonas"
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
        departamentoId(departamento) {
            let self = this;
            this.municipiosSubregion = []
            var cont = 0;
            this.departamentos.forEach(function (element) {
                if (departamento == element.nombre.trim()) {
                    self.departamentoId_ = element.id;
                    self.getMunicipios(self.departamentoId_);
                    cont++;
                }
            });
            if (cont <= 0) {
                self.departamentoId_ = "";
            }
        },
        municipioId(municipio) {
            let self = this;
            var cont = 0;
            this.municipios.forEach(function (element) {
                if (municipio == element.nombre.trim()) {
                    self.municipio_id = element.id;
                    cont++;
                }
            });
            if (cont <= 0) {
                self.municipio_id = "";
            }
        },
        clear() {
            this.municipiosSubregion = []
            this.departamento = ""
            this.municipio = ''
            this.nombre = ''
            this.observacion = ''
            this.actualizar = false
            this.accion = "Insertar subregión"
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

#btnMunicipio {
    background-color: #A569BD;
    color: white;
}

/* Select con filtro personalizado */
#contenedor-select{
    position: relative;
}

#select1{
    z-index: 200;
}
#select2{
    z-index: 100;
}

#select1, #select2 {
    padding: 5px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top:70px;
    left: 13px;
    background-color: white;
    cursor: pointer;
}

#select1 #lista1, #select2 #lista2{
  padding: 5px;
   cursor: pointer;
   border-radius: 5px;
}
#select1 #lista1:hover, #select2 #lista2:hover{
   background-color: #0d6efd;
   color: white;
}

span{
    height: 37px;
}
/* Fin select con filtro personalizado */
</style> -->