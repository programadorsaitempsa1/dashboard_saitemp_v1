<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <Loading :loading="loading" />
      <div class="container">
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger btn-sm" @click="close">X</button>
        </div>
        <h3>Estado del contrato enviado.</h3>

        <div class="row">
          <div class="col-5">
            <label for="" class="form-check-label"
              >Correo Representante legal:</label
            >
            <input
              class="form-control"
              type="text"
              :value="contrato.correo_enviado_cliente"
              disabled
              required
            />
          </div>
          <div class="col-1 mt-4 tooltip-container">
            <label for=""><i class="bi bi-question-circle"></i></label>

            <span class="tooltip-text"
              >Para modificar los correos electrónicos primero debe anular el
              contrato actual.</span
            >
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <label for="" class="form-check-label">Firmado:</label>
              </div>
            </div>
            <div class="row d-flex align-items-center">
              <div class="col d-flex justify-content-start">
                <div class="form-check form-check-inline">
                  <input
                    disabled
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="si"
                    v-model="tipo_firmado_cliente"
                  />
                  <label class="form-check-label" for="inlineRadio3">Si</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    disabled
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="no"
                    v-model="tipo_firmado_cliente"
                  />
                  <label class="form-check-label" for="inlineRadio3">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <label for="" class="form-check-label">Correo Saitemp:</label>
            <input
              class="form-control"
              type="text"
              :value="contrato.correo_enviado_empresa"
              disabled
              required
            />
          </div>
          <div class="col-1 mt-4 tooltip-container">
            <label for=""><i class="bi bi-question-circle"></i></label>

            <span class="tooltip-text"
              >Para modificar los correos electrónicos primero debe anular el
              contrato actual.</span
            >
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <label for="" class="form-check-label">Firmado:</label>
              </div>
            </div>
            <div class="row d-flex align-items-center">
              <div class="col d-flex justify-content-start">
                <div class="form-check form-check-inline">
                  <input
                    disabled
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptionsEmpresa"
                    id="inlineRadioOptionsEmpresa"
                    value="si"
                    v-model="tipo_firmado_empresa"
                  />
                  <label
                    class="form-check-label"
                    for="inlineRadioOptionsEmpresa"
                    >Si</label
                  >
                </div>

                <div class="form-check form-check-inline">
                  <input
                    disabled
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptionsEmpresa"
                    id="inlineRadioOptionsEmpresa"
                    value="no"
                    v-model="tipo_firmado_empresa"
                  />
                  <label
                    class="form-check-label"
                    for="inlineRadioOptionsEmpresa"
                    >No</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="" class="form-check-label">Enviado por:</label>
            <input
              class="form-control"
              type="text"
              :value="contrato.nombre_usuario_envia"
              disabled
              required
            />
          </div>
          <div class="col">
            <label for="" class="form-check-label">Fecha de envio:</label>
            <input
              class="form-control"
              type="text"
              :value="formatearFecha"
              disabled
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="" class="form-check-label">Estado:</label>
            <input
              class="form-control"
              type="text"
              :value="contrato.estado_contrato"
              disabled
              required
            />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <button
              class="btn btn-danger btn-sm"
              @click="anularContratoController"
            >
              Anular contrato
            </button>
          </div>
          <div class="col">
            <button
              @click="verContratoHandle"
              class="btn btn-success btn-sm"
              v-if="
                contrato.ruta_contrato != '' && contrato.ruta_contrato != null
              "
            >
              <i class="bi bi-eye-fill"></i>
              Ver contrato
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-success btn-sm"
              @click="reenviarContratoController"
            >
              Reenviar contrato
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alerts } from "../Mixins/Alerts.js";
import { Token } from "../Mixins/Token.js";
import Loading from "./Loading.vue";
import { Permisos } from "../Mixins/Permisos.js";
import axios from "axios";
export default {
  components: { Loading },
  props: {
    contrato: {
      activo: 1,
      cliente_id: "",
      contrato_firma_id: "",
      correo_enviado_cliente: "",
      correo_enviado_empresa: "",
      estado_contrato: "",
      firmado_cliente: 0,
      firmado_empresa: 0,
      nombre_usuario_envia: "",
      ruta_contrato: "",
      transaccion_id: "",
      usuario_envia: "",
      created_at: "",
    },
  },
  mixins: [Alerts, Token, Permisos],
  computed: {
    formatearFecha: {
      get() {
        var fecha = new Date(this.contrato.created_at);
        var year = fecha.getFullYear();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var day = ("0" + fecha.getDate()).slice(-2);
        var formattedDate = `${day}/${month}/${year}`;
        console.log(formattedDate);
        return formattedDate;
      },
    },
    tipo_firmado_cliente: {
      get() {
        return this.firmado_cliente_com === 1 ? "si" : "no";
      },
    },
    tipo_firmado_empresa: {
      get() {
        return this.firmado_empresa_com === 1 ? "si" : "no";
      },
    },
  },
  created() {
    this.getEstadoFirmantes();
  },
  mounted() {
    this.getEstadoFirmantes();
  },
  data() {
    return {
      loading: false,
      firmado_empresa_com: 0,
      firmado_cliente_com: 0,
    };
  },
  methods: {
    close() {
      this.$emit("closeModalEstadoContrato");
    },
    verContratoHandle() {
      const url = `${this.URL_API}api/v1/verContratoDD/${this.contrato.transaccion_id}`;
      window.open(url, "_blank");
    },
    reenviarContratoController() {
      let self = this;
      let config = this.configHeader();
      this.loading = true;
      axios
        .get(
          self.URL_API + "api/v1/reenviarFirma/" + this.contrato.transaccion_id,
          config
        )
        .then((result) => {
          self.showAlert(result.data.response.mensaje, result.data.status);
          self.loading = false;
        });
    },
    getEstadoFirmantes() {
      this.loading = true;
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/consultaFirmantes/" +
            this.contrato.transaccion_id,
          config
        )
        .then((result) => {
          this.loading = false;
          if (result.data.status == "success") {
            this.firmado_cliente_com = result.data.contrato.firmado_cliente;
            this.firmado_empresa_com = result.data.contrato.firmado_empresa;
            axios.get(
              self.URL_API +
                `api/v1/consultaProcesoFirma/${this.contrato.transaccion_id}`,
              config
            );
          }
        });
    },
    anularContratoController() {
      let self = this;
      let config = this.configHeader();
      this.loading = true;
      var title = "¿Está seguro que quiere anular este contrato?";
      this.$swal
        .fire({
          title: title,
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .get(
                self.URL_API +
                  "api/v1/anularContrato/" +
                  this.contrato.transaccion_id,
                config
              )
              .then((result) => {
                self.showAlert(
                  result.data.response.mensaje,
                  result.data.status
                );
                this.loading = false;
                this.close();
              });
          }
        });
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  width: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
label {
  float: left;
  margin: 20px 0px 5px 0px;
}
.buttonContainer {
  height: 20px;
}
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  font-size: 0.8em;
  width: 250px;
  background-color: #fff7d4;
  color: #444343;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 85%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 0 12px #111;
}
.tooltip-text::before {
  content: "";
  width: 1em;
  height: 1em;
  background-color: #fff7d4;
  position: absolute;
  bottom: -6.5px;
  left: 40%;
  transform: translate(-50%, 0%) rotate(45deg);
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
