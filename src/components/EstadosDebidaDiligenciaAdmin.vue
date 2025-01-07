<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Administrar estados Debida Diligencia</h2>
    <div id="seccion">
      <div class="row">
        <div class="col">
          <SearchList
            nombreCampo="Estados"
            nombreItem="nombre"
            @getEstados="getEstados"
            eventoCampo="getEstados"
            :consulta="nombre"
            :registros="estados"
            placeholder="Seleccione una opción"
            :valida_campo="false"
          />
        </div>
        <div class="col pt-5">
          <button
            type="button"
            class="btn btn-success"
            style="float: left"
            @click="crearNuevoEstado"
          >
            Añadir nuevo estado
          </button>
        </div>
      </div>
      <form action="save" @submit.prevent="save()" class="was-validated">
        <div class="row">
          <div class="col-6 mb-3">
            <label class="form-label labelLeft">Nombre: * </label>
            <input
              :disabled="disabled"
              type="text"
              class="form-control"
              autocomplete="off"
              id="nombreEstado"
              aria-describedby="inputName"
              v-model="nombre"
              required
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <label class="form-label labelLeft">Tiempo: </label>
              </div>
            </div>
            <div class="row d-flex align-items-center">
              <div class="col">
                <div class="form-check form-check-inline">
                  <input
                    :disabled="disabled"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="minutos"
                    v-model="tipo_tiempo"
                    @change="changeTipoTiempo('minutos')"
                  />
                  <label class="form-check-label" for="inlineRadio1"
                    >Minutos</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    :disabled="disabled"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="horas"
                    v-model="tipo_tiempo"
                    @change="changeTipoTiempo('horas')"
                  />
                  <label class="form-check-label" for="inlineRadio2"
                    >Horas</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    :disabled="disabled"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="dias"
                    v-model="tipo_tiempo"
                    @change="changeTipoTiempo('dias')"
                  />
                  <label class="form-check-label" for="inlineRadio3"
                    >Dias</label
                  >
                </div>
              </div>
              <div class="col">
                <input
                  required
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  autocomplete="off"
                  id="tiempoEstado"
                  aria-describedby="inputTiempo"
                  v-model="tiempo_respuesta"
                />
              </div>
            </div>
          </div>
          <div class="row border rounded">
            <label for="" class="labelLeft">Responsables: *</label>
            <div class="col">
              <SearchList
                nombreCampo=""
                :valida_campo="false"
                nombreItem="nombre"
                eventoCampo="getUsuarios"
                :consulta="usuario"
                :registros="usuarios"
                @getUsuarios="getUsuarios"
                placeholder="Seleccione una opción"
                :index="1"
                :disabled="disabled"
              />
              <div class="row mt-4">
                <div class="col-2">
                  <label class="form-label labelLeft">Color: </label>
                </div>
                <div class="col-2 d-flex align-items-center">
                  <input
                    :disabled="disabled"
                    type="color"
                    class="form-control"
                    autocomplete="off"
                    id="nombreEstado"
                    aria-describedby="inputName"
                    v-model="color"
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div
                class="mb-3"
                style="
                  padding: 10px;
                  border: solid #d5dbdb 0.5px;
                  border-radius: 10px;
                "
              >
                <button
                  type="button"
                  style="margin: 10px 10px 5px 10px"
                  id="btnMenu"
                  class="btn btn-sm"
                  data-bs-toggle="button"
                  v-for="(usuario, index) in asignar_usuarios"
                  :key="index"
                >
                  {{ usuario.nombre }}
                  <i
                    class="bi bi-x"
                    @click="asignar_usuarios.splice(index, 1)"
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6">
              <button
                id="btnGroupDrop1"
                type="button"
                class="btn btn-danger"
                aria-expanded="false"
                :disabled="disabled"
                @click="eliminarEstadoHandler"
              >
                Eliminar Estado
              </button>
            </div>
            <div class="col-6">
              <button
                id="btnGroupDrop1"
                type="submit"
                class="btn btn-success"
                aria-expanded="false"
                :disabled="disabled"
              >
                Guardar Estado
              </button>
            </div>
            <div class="row">
              <ListaEstados
                :lista="estados"
                @cambiarOrden="cambiarOrdenEstados"
              ></ListaEstados>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import ListaEstados from "./ListaEstados.vue";

export default {
  components: {
    Loading,
    SearchList,
    ListaEstados,
  },
  mixins: [Token, Alerts],
  data() {
    return {
      estados1: [],
      estados2: [],
      mensaje_error: "",
      URL_API: process.env.VUE_APP_URL_API,
      usuario: "",
      usuarios: [],
      estados: [],
      color: "#9EAEAC",
      id_estado: "",
      loading: false,
      tiempo_respuesta: 0,
      tiempo_respuesta_cambio: 0,
      nombre: "",
      disabled: true,
      tipo_tiempo: "minutos",
      asignar_usuarios: [],
    };
  },
  watch: {
    $route() {
      this.limpiarFormulario();
    },
  },
  async mounted() {
    this.getEstados();
  },
  created() {
    this.getEstados();
  },
  methods: {
    async cambiarOrdenEstados(lista) {
      let self = this;
      let config = this.configHeader();
      this.loading = true;
      const formLista = { estados: lista };
      const response = await axios.put(
        self.URL_API + `api/v1/estadosfirma`,
        formLista,
        config
      );
      this.getEstados();
      this.showAlert(response.data.message, response.data.status);
      this.loading = false;
    },
    changeTipoTiempo(option) {
      this.tipo_tiempo = option;
      if (this.id_estado == "") {
        return;
      } else {
        switch (option) {
          case "minutos":
            this.tiempo_respuesta = this.tiempo_respuesta_cambio;
            break;
          case "horas":
            this.tiempo_respuesta = Math.trunc(
              this.tiempo_respuesta_cambio / 60
            );
            break;
          case "dias":
            this.tiempo_respuesta = Math.trunc(
              this.tiempo_respuesta_cambio / 480
            );
            break;
          default:
            break;
        }
      }
    },

    getResponsablesEstado(estado) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + `api/v1/estadoResponsableFirma/${estado}`, config)
        .then(function (result) {
          self.asignar_usuarios = result.data;
          self.loading = false;
        });
    },
    async eliminarEstadoHandler() {
      this.loading = true;
      this.messageDelete(
        "¿Está seguro que desea eliminar este estado?",
        this.deleteEstado,
        this.id_estado
      );
      setTimeout(() => {
        this.limpiarFormulario();
        this.loading = false;
        this.disabled = true;
      }, 2000);
    },
    deleteEstado(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(self.URL_API + "api/v1/estadosfirma/" + id, config)
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
          console.log(result);
        });
    },
    getEstados(item = null) {
      if (item != null) {
        this.loading = true;
        this.color = item.color;
        this.nombre = item.nombre;
        this.id_estado = item.id;
        this.tiempo_respuesta = item.tiempo_respuesta;
        this.tiempo_respuesta_cambio = item.tiempo_respuesta;
        this.disabled = false;
        this.getResponsablesEstado(item.id);
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosfirma", config)
        .then(function (result) {
          self.estados = result.data;
        });
    },
    getUsuarios(item = null, index = null) {
      if (item != null) {
        switch (index) {
          case 1:
            this.asignar_usuarios.push({
              usuario_id: item.id,
              nombre: item.nombre,
            });

            break;
          case 2:
            this.cierra_pqrsf_id = item.id;
            this.consulta_cierra_pqrsf = item.nombre;
            break;
          case 3:
            this.visitante_id = item.id;
            this.visitante = item.nombre;
            break;
        }
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usuarios = result.data;
        });
    },
    limpiarFormulario() {
      this.id_estado = "";
      this.nombre = "";
      this.color = "#9EAEAC";
      this.tiempo_respuesta = 0;
      this.tipo_tiempo = "minutos";
      this.asignar_usuarios = [];
      this.usuario = "";
      this.tiempo_respuesta_cambio = 0;
      this.estados = [];
    },
    crearNuevoEstado() {
      this.limpiarFormulario();
      this.disabled = false;
    },
    save() {
      let self = this;
      this.loading = true;
      switch (this.tipo_tiempo) {
        case "horas":
          this.tiempo_respuesta = Math.trunc(this.tiempo_respuesta * 60);
          break;
        case "dias":
          this.tiempo_respuesta = Math.trunc(this.tiempo_respuesta * 480);
          break;
        default:
          break;
      }
      const estadoForm = {
        nombre: this.nombre,
        color: this.color,
        responsables: this.asignar_usuarios,
        tiempo_respuesta: this.tiempo_respuesta,
      };
      if (this.asignar_usuarios.length == 0) {
        this.showAlert("Debe asignar por lo menos un responsable", "error");
        this.loading = false;
        return;
      }
      if (this.id_estado == "") {
        let config = this.configHeader();
        axios
          .post(self.URL_API + "api/v1/estadosfirma", estadoForm, config)
          .then((result) => {
            this.limpiarFormulario();
            self.showAlert(result.data.message, result.data.status);
            this.disabled = true;
            this.loading = false;
          });
      } else {
        let config = this.configHeader();
        axios
          .put(
            self.URL_API + `api/v1/estadosfirma/${this.id_estado}`,
            estadoForm,
            config
          )
          .then((result) => {
            this.limpiarFormulario();
            self.showAlert(result.data.message, result.data.status);
            this.disabled = true;
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  animation: fadeIn;
  animation-duration: 2s;
}
.labelLeft {
  float: left;
  margin: 20px 0px 5px 0px;
  text-align: left;
}
#btnMenu {
  background-color: rgb(28, 146, 77);
  color: white;
}
#seccion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>
