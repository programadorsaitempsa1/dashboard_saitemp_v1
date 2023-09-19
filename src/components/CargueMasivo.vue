<template>
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
    </div>
</template>
<script>
import axios from 'axios'
import { Alerts } from '../Mixins/Alerts.js';
export default {
    props: {
        endpoint: {}
    },
    mixins: [Alerts],
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            file: null,
            spinner: false,
        };
    },

    mounted() {

    },

    methods: {
        guardarMasivo() {
            let self = this;
            if (self.file != null) {
                self.spinner = true;
                let config = this.configHeader();
                const form = new FormData();
                form.append("cargamasiva", self.file);
                axios
                    .post(self.URL_API + "api/v1/" + self.endpoint + "masivo", form, config)
                    .then(function (result) {
                        if (result.data.status == "duplicate") {
                            self.showAlert2(result.data.message);
                        }
                        else {
                            self.showAlert(result.data.message, result.data.status);
                        }
                        self.file = null;
                        self.spinner = false;
                        self.$emit('getItems');
                    });
            }
            else {
                self.showAlert("Por favor cargue el archivo con los datos.", "error");
            }
        },
        cargarArchivo(e) {
            this.file = e.target.files[0];
        },
        deleteFile() {
            document.getElementById("seleccionArchivos").value = "";
            self.file = null;
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
.file button {
    float: left;
    margin-bottom: 20px;
}

label {
    float: left;
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
  
</style>