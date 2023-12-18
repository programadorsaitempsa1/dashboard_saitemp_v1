<!-- <template>
  <div>
    <div v-if="spinner">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h5>Cargando por favor espere un momento.</h5>
    </div>
    <div v-else class="container" id="container">
      <h2>Administrar Ordenes de Trabajo</h2>
      <div class="card col-xs-12 col-md-6">
        <h5>{{ accion }}</h5>
        <form>
          <div class="row">
            <div class="col mb-3">
              <label for="exampleInputEmail1" class="form-label">Número</label>
              <input type="text" class="form-control" :disabled="actualizar_orden_trabajo || OT.length > 0"
                id="exampleInputEmail1" aria-describedby="emailHelp" v-model="orden_trabajo.numero" />
            </div>
            <div class="col mb-3">
              <label for="exampleInputEmail1" class="form-label">Actividad</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model="orden_trabajo.actividad" />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6" v-if="
              userlogued.rol == 'S. Administrador' ||
              userlogued.rol == 'Administrador'
            ">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Contrato</label>
                <select class="form-select" v-model="orden_trabajo.contrato"
                  @change="contratoId(orden_trabajo.contrato)" aria-label="Default select example">
                  <option v-for="(item, index) in contratos" :key="index">
                    {{ item.numero }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-xs-12 col-md-6" v-if="actualizar_orden_trabajo">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Estado</label>
                <select class="form-select" v-model="orden_trabajo.estado"
                  @change="estadoOrdenTrabajoId(orden_trabajo.estado)" aria-label="Default select example">
                  <option v-for="(item, index) in orden_trabajo_estados" :key="index">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6 mb-3">
              <label for="exampleInputEmail1" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model="orden_trabajo.direccion" />
            </div>
            <div class="col-xs-12 col-md-6">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Responsable</label>
                <select class="form-select" v-model="orden_trabajo.responsable" aria-label="Default select example">
                  <option v-for="(item, index) in usuarios" :key="index">
                    {{ item.nombres }} {{ item.apellidos }} -
                    {{ item.documento_identidad }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Gestor SST</label>
                <select class="form-select" v-model="orden_trabajo.gestor_sst" aria-label="Default select example">
                  <option v-for="(item, index) in empleados" :key="index">
                    {{ item.nombres }} {{ item.apellidos }} -
                    {{ item.documento_identidad }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Observación</label>
            <div class="mb-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                v-model="orden_trabajo.descripcion"></textarea>
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

      <div class="file">
        <label for="" style="margin-bottom: 15px">Carga masiva:</label>
        <div class="input-group mb-3">
          <input @change="cargarArchivo" style="cursor: pointer" type="file" accept=".csv" class="form-control"
            id="seleccionArchivos" />
          <label class="input-group-text" style="cursor: pointer" @click="deleteFile()"
            for="inputGroupFile02">Borrar</label>
        </div>
        <button type="button" class="btn btn-success btn-sm" @click="guardarMasivo()">
          Cargar archivo
        </button>
      </div>
      <div class="row" style="float: left; clear: both; color: #d06519">
        <div class="col-xs-12 col-md-12">
          <h5 v-if="ordenes_trabajo.length > 0">
            Mostrando {{ links.per_page }} de {{ links.total }} registros -
            página {{ links.current_page }}
          </h5>
        </div>
      </div>
      <div v-if="ordenes_trabajo.length > 0" class="row" style="clear: both">
        <div class="col-xs-3 col-md-3">
          <label for="exampleFormControlInput1" class="form-label">Cantidad de registros a listar</label>
          <select class="form-select form-select-sm" @change="getOrdenesTrabajo()" v-model="cantidad"
            aria-label="Default select example">
            <option>20</option>
            <option>50</option>
            <option>100</option>
            <option>300</option>
            <option>500</option>
          </select>
        </div>
        <div v-if="ordenes_trabajo.length > 0" class="col-xs-3 col-md-3">
          <button type="button" style="margin-top: 35px" @click="selectAll((select_all = !select_all))"
            class="btn btn-success btn-sm">
            Seleccionar todo
          </button>
        </div>
        <div v-if="OT.length > 1" class="col-xs-3 col-md-3">
          <button type="button" style="margin-top: 35px; background-color:#E74C3C;color:white" @click="masiveDelete()" class="btn btn-sm">
            Eliminar seleccionados
          </button>
        </div>
        <div v-if="cantidad > 50" class="col-xs-3 col-md-3">
          <button type="submit" style="margin: 15px" @click="goScroll(0, 0, 'down')" id="scroll" class="btn">
            <i class="bi bi-chevron-double-down"></i>
          </button>
        </div>
      </div>

      <div style="margin: 80px" v-if="ordenes_trabajo.length <= 0">
        <h3>No hay ordenes de trabajo resgistradas</h3>
      </div>
        <div v-else class="table-responsive">
        <table class="table align-middle table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th colspan="2">Acciones</th>
              <th scope="col">Seleccionar</th>
              <th @click="sort(item, index + 1, (sorted = !sorted))" scope="col" v-for="(item, index) in tabla"
                :key="index">
                {{ item.nombre }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in ordenes_trabajo" :key="item.id">
              <td>
                <button type="button" class="btn btn-warning btn-sm" @click="actualizar(item)"
                  v-if="item.nombre != 'S. Administrador'">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-warning btn-sm" @click="actualizar(item)" v-if="
                  item.nombre == 'S. Administrador' &&
                  roluserlogued.rol == 'S. Administrador'
                ">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger btn-sm" @click="messageDelete(item.id)"
                  v-if="item.nombre != 'S. Administrador'">
                  <i class="bi bi-trash"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm" @click="messageDelete(item.id)" v-if="
                  item.nombre == 'S. Administrador' &&
                  roluserlogued.rol == 'S. Administrador'
                ">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
              <td>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" @change="(item.checked = !item.checked), clear()" v-model="OT"
                    type="checkbox" :value="item.id" />
                </div>
              </td>
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ item.numero }}</td>
              <td>{{ item.actividad }}</td>
              <td>{{ item.direccion }}</td>
              <td>{{ item.estado }}</td>
              <td>
                {{
                  item.descripcion == null
                    ? "Sin descripción"
                    : item.descripcion == ""
                      ? "Sin descripción"
                      : item.descripcion
                }}
              </td>
              <td>{{ item.responsable }}</td>
              <td>{{ item.gestor_sst }}</td>
              <td>{{ item.fecha_creacion }}</td>
              <td>
                {{
                  item.fecha_actualizacion == item.fecha_creacion
                    ? "No ha sido actualizado"
                    : item.fecha_actualizacion
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PiePagina @response="response" :actualiced="actualiced" :cantidad="cantidad" :result="result" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PiePagina from "./PiePagina.vue";
export default {
  components: {
    PiePagina
  },
  props: {
    userlogued: {},
  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      orden_trabajo_estados: [],
      ordenes_trabajo: [],
      orden_trabajo: {},
      accion: "Insertar orden de trabajo",
      actualizar_orden_trabajo: false,
      estado_orden_trabajo_id: "",
      contrato_id: "",
      contratos: [],
      usuarios: [],
      usuario_id: "",
      gestor_id: "",
      empleados: [],
      file: null,
      spinner: false,
      sorted: false,
      links: [],
      result: [],
      siguiente: 0,
      cantidad: 20,
      tabla: [
        { nombre: "#", orden: "DESC" },
        { nombre: "Número OT", orden: "DESC",tipo:"texto",calculado:'false' },
        { nombre: "Actividad", orden: "DESC",tipo:"texto",calculado:'false' },
        { nombre: "Direccion", orden: "DESC",tipo:"texto",calculado:'false' },
        { nombre: "Estado", orden: "DESC",tipo:"texto",calculado:'true' },
        { nombre: "Observación", orden: "DESC",tipo:"texto",calculado:'false' },
        { nombre: "Responsable", orden: "DESC",tipo:"texto",calculado:'true' },
        { nombre: "Gestor SST", orden: "DESC",tipo:"texto",calculado:'true' },
        { nombre: "Fecha creación", orden: "DESC",tipo:"fecha",calculado:'false' },
        { nombre: "Fecha última actualización", orden: "DESC",tipo:"texto",calculado:'false' },
      ],
      temporal: "",
      OT: [],
      select_all: false,
      currentUrl: "",
      actualiced:false,
      listas:[]
    };
  },
  created() {
    this.llenarLista()
    this.getOrdenesTrabajo();
    this.getEstadoOrdenesTrabajo();
    this.getContratos();
    this.getUsuarios();
    this.getEmpleados();
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
    response(response) {
      this.ordenes_trabajo = response.data.data;
      this.links = response.data;
      this.currentUrl = response.data.currentUrl;
      this.siguiente = response.data.links.length;
      this.ordenes_trabajo.forEach(function (item) {
        item.checked = false;
      });
      this.actualiced = false
      this.accion = "Editar orden de trabajo"
      this.checks = []
    },
    selectAll() {
      let self = this;
      if (this.select_all) {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = true;
          });
        self.ordenes_trabajo.forEach(function (item) {
          self.OT.push(item.id);
        });
      }
      else {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = false;
          });
        self.ordenes_trabajo.forEach(function (item) {
          item.checked = false;
          self.OT.pop(item.id);
        });
      }
    },
    goScroll(top, left, direction) {
      if (direction == "down") {
        let container = document.getElementById("container");
        top = container.clientHeight;
      }
      window.scroll({
        top: top,
        left: left,
        behavior: "smooth",
      });
    },
    cargarArchivo(e) {
      this.file = e.target.files[0];
    },
    deleteFile() {
      document.getElementById("seleccionArchivos").value = "";
      self.file = null;
    },
    guardarMasivo() {
      let self = this;
      if (self.file != null) {
        self.spinner = true;
        let config = this.configHeader();
        const form = new FormData();
        form.append("cargamasiva", self.file);
        axios
          .post(self.URL_API + "api/v1/ordenestrabajomasivo", form, config)
          .then(function (result) {
            if (result.data.status == "duplicate") {
              self.showAlert2(result.data.message);
            }
            else {
              self.showAlert(result.data.message, result.data.status);
            }
            self.file = null;
            self.getOrdenesTrabajo();
            self.spinner = false;
          });
      }
      else {
        self.showAlert("Por favor cargue el archivo con los datos.", "error");
      }
    },
    getContratos() {
      let config = this.configHeader();
      let self = this;
      axios
        .get(self.URL_API + "api/v1/contratoslista", config)
        .then(function (result) {
          self.contratos = result.data;
        });
    },
    getOrdenesTrabajo() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ordenestrabajo/" + self.cantidad, config)
        .then(function (result) {
          self.ordenes_trabajo = result.data.data;
          self.links = result.data;
          self.result = result;
          self.currentUrl = result.data.links[1].url;
          self.siguiente = result.data.links.length;
          self.ordenes_trabajo.forEach(function (item) {
            item.checked = false;
          });
        });
    },
    getEstadoOrdenesTrabajo() {
      let config = this.configHeader();
      let self = this;
      axios
        .get(self.URL_API + "api/v1/estadoordenestrabajolista", config)
        .then(function (result) {
          self.orden_trabajo_estados = result.data;
        });
    },
    getUsuarios(id_contrato) {
      let self = this;
      let config = this.configHeader();
      if (id_contrato != null) {
        axios
          .get(self.URL_API + "api/v1/usuariosporcontrato/" + id_contrato, config)
          .then(function (result) {
            self.usuarios = result.data;
          });
      }
      else {
        axios
          .get(self.URL_API + "api/v1/getEmpleadoEncargado", config)
          .then(function (result) {
            self.usuarios = result.data;
          });
      }
    },
    getEmpleados() {
      let config = this.configHeader();
      let self = this;
      axios
        .get(self.URL_API + "api/v1/sigempleadosst", config)
        .then(function (result) {
          self.empleados = result.data;
        });
    },
    estadoOrdenTrabajoId(estado) {
      let self = this;
      var cont = 0;
      this.orden_trabajo_estados.forEach(function (element) {
        if (estado == element.nombre.trim()) {
          self.orden_trabajo.estado_orden_trabajo_id = element.id;
          cont++;
        }
      });
      if (cont <= 0) {
        self.orden_trabajo.estado_orden_trabajo_id = "";
      }
    },
    save() {
      let self = this;
      let config = this.configHeader();
      if (this.actualizar_orden_trabajo) {
        if (self.orden_trabajo.contrato_id == null) {
          self.orden_trabajo.contrato_id = this.userlogued.contrato_id;
        }
        axios
          .post(self.URL_API + "api/v1/ordenestrabajo/" + self.orden_trabajo.id, self.orden_trabajo, config)
          .then(function (result) {
            self.showAlert(result.data.message, result.data.status);
            self.actualiced = true
            self.accion = "Insertar orden de trabajo";
            if (result.data.status == "success") {
              self.clear();
            }
          });
      }
      else if (self.OT.length > 0) {
        this.masiveUpdate();
      }
      else if (self.orden_trabajo.numero != null) {
        if (self.orden_trabajo.contrato_id == null) {
          self.orden_trabajo.contrato_id = this.userlogued.contrato_id;
        }
        axios
          .post(self.URL_API + "api/v1/ordenestrabajo", self.orden_trabajo, config)
          .then(function (result) {
            self.showAlert(result.data.message, result.data.status);
            self.getOrdenesTrabajo();
            if (result.data.status == "success") {
              self.clear();
            }
          });
      }
      else {
        self.showAlert("Cargue al menos un número de orden de trabajo", "error");
      }
    },
    sort(item, numero) {
      this.tabla.forEach(function (item, index) {
        document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + index + "):after", "content: \"\";");
      });
      if (item.orden == "DESC") {
        document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero + 2) + "):after", "content: \" ↓\";");
        this.sortDesc(numero);
        this.tabla[numero - 1].orden = "ASC";
      }
      else {
        document.styleSheets[0].addRule(".table-responsive tr th:nth-child(" + (numero + 2) + "):after", "content: \" ↑\";");
        this.sortAcs(numero);
        this.tabla[numero - 1].orden = "DESC";
      }
    },
    sortAcs(numero) {
      switch (numero) {
        case 1:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.numero < b.numero) {
              return -1;
            }
            if (a.numero > b.numero) {
              return 1;
            }
            return 0;
          });
          break;
        case 2:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.numero < b.numero) {
              return -1;
            }
            if (a.numero > b.numero) {
              return 1;
            }
            return 0;
          });
          break;
        case 3:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.actividad < b.actividad) {
              return -1;
            }
            if (a.actividad > b.actividad) {
              return 1;
            }
            return 0;
          });
          break;
        case 4:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.direccion < b.direccion) {
              return -1;
            }
            if (a.direccion > b.direccion) {
              return 1;
            }
            return 0;
          });
          break;
        case 5:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.estado < b.estado) {
              return -1;
            }
            if (a.estado > b.estado) {
              return 1;
            }
            return 0;
          });
          break;
        case 6:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.descripcion < b.descripcion) {
              return -1;
            }
            if (a.descripcion > b.descripcion) {
              return 1;
            }
            return 0;
          });
          break;
        case 7:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.responsable < b.responsable) {
              return -1;
            }
            if (a.responsable > b.responsable) {
              return 1;
            }
            return 0;
          });
          break;
        case 8:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.gestor_sst < b.gestor_sst) {
              return -1;
            }
            if (a.gestor_sst > b.gestor_sst) {
              return 1;
            }
            return 0;
          });
          break;
        case 9:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.fecha_creacion < b.fecha_creacion) {
              return -1;
            }
            if (a.fecha_creacion > b.fecha_creacion) {
              return 1;
            }
            return 0;
          });
          break;
        case 10:
          this.ordenes_trabajo.sort(function (a, b) {
            if (a.fecha_actualizacion < b.fecha_actualizacion) {
              return -1;
            }
            if (a.fecha_actualizacion > b.fecha_actualizacion) {
              return 1;
            }
            return 0;
          });
          break;
      }
    },
    sortDesc(numero) {
      switch (numero) {
        case 1:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.numero < b.numero) {
              return -1;
            }
            if (a.numero > b.numero) {
              return 1;
            }
            return 0;
          });
          break;
        case 2:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.numero < b.numero) {
              return -1;
            }
            if (a.numero > b.numero) {
              return 1;
            }
            return 0;
          });
          break;
        case 3:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.actividad < b.actividad) {
              return -1;
            }
            if (a.actividad > b.actividad) {
              return 1;
            }
            return 0;
          });
          break;
        case 4:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.direccion < b.direccion) {
              return -1;
            }
            if (a.direccion > b.direccion) {
              return 1;
            }
            return 0;
          });
          break;
        case 5:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.estado < b.estado) {
              return -1;
            }
            if (a.estado > b.estado) {
              return 1;
            }
            return 0;
          });
          break;
        case 6:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.descripcion < b.descripcion) {
              return -1;
            }
            if (a.descripcion > b.descripcion) {
              return 1;
            }
            return 0;
          });
          break;
        case 7:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.responsable < b.responsable) {
              return -1;
            }
            if (a.responsable > b.responsable) {
              return 1;
            }
            return 0;
          });
          break;
        case 8:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.gestor_sst < b.gestor_sst) {
              return -1;
            }
            if (a.gestor_sst > b.gestor_sst) {
              return 1;
            }
            return 0;
          });
          break;
        case 9:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.fecha_creacion < b.fecha_creacion) {
              return -1;
            }
            if (a.fecha_creacion > b.fecha_creacion) {
              return 1;
            }
            return 0;
          });
          break;
        case 10:
          this.ordenes_trabajo.reverse(function (a, b) {
            if (a.fecha_actualizacion < b.fecha_actualizacion) {
              return -1;
            }
            if (a.fecha_actualizacion > b.fecha_actualizacion) {
              return 1;
            }
            return 0;
          });
          break;
      }
    },
    clear() {
      this.orden_trabajo = {
        numero: "",
        actividad: "",
        direccion: "",
        descripcion: "",
        id: "",
      };
      this.accion = "Insertar orden de trabajo";
      this.actualizar_orden_trabajo = false;
    },
    back() {
      this.$router.go(-1);
    },
    actualizar(item) {
      this.OT = [];
      window.scroll({
        top: 80,
        left: 0,
        behavior: "smooth",
      });
      this.orden_trabajo = {
        numero: item.numero,
        actividad: item.actividad,
        direccion: item.direccion,
        descripcion: item.descripcion,
        estado_orden_trabajo_id: item.estado_orden_trabajo_id,
        id: item.id,
        estado: item.estado,
        contrato_id: item.contrato_id,
        responsable: item.responsable,
        gestor_sst: item.gestor_sst,
      };
      this.contratoId(item.contrato_id);
      this.actualizar_orden_trabajo = true;
      this.accion = "Editar orden de trabajo";
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
    masiveDelete() {
      let self = this;
      this.$swal
        .fire({
          title: "Estas seguro de elimiar los resgistros selccionados?",
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            let config = self.configHeader();
            let ordenes_trabajo = {};
            ordenes_trabajo.ot = self.OT;
            axios
              .post(self.URL_API + "api/v1/otseliminacionmasiva", ordenes_trabajo, config)
              .then(function (result) {
                self.showAlert(result.data.message, result.data.status);
                self.getOrdenesTrabajo();
                if (result.data.status == "success") {
                  self.OT = [];
                  self.select_all = false;
                  self.clear();
                }
              });
          }
        });
    },
    masiveUpdate() {
      let self = this;
      this.$swal
        .fire({
          title: "Estas seguro de realizar una actualización a varios resgistros?",
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, actualizar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.orden_trabajo.ots = self.OT;
            let config = self.configHeader();
            axios
              .post(self.URL_API + "api/v1/otsactualizacionmasiva", self.orden_trabajo, config)
              .then(function (result) {
                self.showAlert(result.data.message, result.data.status);
                self.actualiced = true
                if (result.data.status == "success") {
                  self.OT = [];
                  self.clear();
                }
              });
          }
        });
    },
    eliminar(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(self.URL_API + "api/v1/ordenestrabajo/" + id, config)
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
          self.getOrdenesTrabajo();
          self.clear();
          self.accion = "Insertar orden de trabajo";
        });
    },
    contratoId(contrato) {
      let self = this;
      var cont = 0;
      this.contratos.forEach(function (element) {
        if (contrato == element.numero) {
          self.orden_trabajo.contrato_id = element.id;
          cont++;
        }
        else if (contrato == element.id) {
          self.orden_trabajo.contrato = element.numero;
          cont++;
        }
      });
      this.getUsuarios(self.orden_trabajo.contrato_id);
      if (cont <= 0) {
        self.contrato_id = "";
      }
    },
    showAlert(mensaje, icono) {
      this.$swal({
        position: "top",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: icono == "error" ? 3500 : 1500,
      });
    },
    showAlert2(mensaje) {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: mensaje,
      });
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

.file button {
  float: left;
  margin-bottom: 20px;
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

/* fin spinner*/

th {
  white-space: nowrap;
  cursor: pointer;
}

.table-responsive {
  clear: both;
}

.content {
  width: 90%;
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

.form-check-input,
.form-check {
  margin: 0;
  padding: 0;
}

#scroll {
  color: white;
  background: #e67e22;
  font-size: 1.3rem;
}

</style> -->
