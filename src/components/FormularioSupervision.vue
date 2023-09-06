<template>
    <div class="container">
        <h2>Formulario de supervisión</h2>
        <div class="card col-xs-12 col-md-6">
            <form class="was-validated">
                <div id="seccion">
                    <div class="row">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Conceptos</label>
                        <div class="row" id="label" v-for="item, index in conceptos" :key="index">
                            <div class="col-4">
                                <label class="form-check-label" for="flexSwitchCheckChecked">{{ item.nombre }}</label>
                            </div>
                            <div class="col-8" style="display: flex; justify-content: space-between;">
                                <div class="form-check m-2">
                                    <input class="form-check-input" type="radio" :value="false" v-model="concepto[index]"
                                        :name="'radio3' + index" id="radio3">
                                    Exelente
                                </div>
                                <div class="form-check m-2">
                                    <input class="form-check-input" type="radio" :value="false" v-model="concepto[index]"
                                        :name="'radio3' + index" id="radio3" checked>
                                    Bueno
                                </div>
                                <div class="form-check m-2">
                                    <input class="form-check-input" type="radio" :value="false" v-model="concepto[index]"
                                        :name="'radio3' + index" id="radio3" checked>
                                    Regular
                                </div>
                            </div>
                        </div>
                        <!-- <h5 style="text-align: left;">Número de Observaciones registradas: {{ observaciones.length }}</h5> -->
                        <div class="row" v-for="item, index in observaciones" :key="item.id">
                            <div class="mb-3">
                                <label for="formFileMultiple" class="form-label">Adjuntar imágenes: * </label>
                                <div class="input-group mb-3">
                                    <input class="form-control" type="file" accept="image/*"
                                        @change="cargarArchivo($event, index)" id="formFileMultiple" multiple>
                                    <span style="cursor: pointer" class="input-group-text" @click="quitarAdjuntos(index)"
                                        id="basic-addon1">Quitar imágenes</span>
                                </div>
                            </div>

                            <div class="col botones" v-for="item2, index2 in observaciones[index].file" :key="index2">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn adjunto"><i class="bi bi-file-earmark-check"></i>
                                        {{ item2.name
                                        }} {{ formatearPesoArchivo(item2.size) }}</button>
                                    <button type="button" @click= "item['file'].splice(index2, 1)" class="btn btn-success"><i
                                            class="bi bi-x"></i></button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Observaciones: </label>
                                    <br>
                                    <EditorTextoHtml :consulta="consulta_texto[index]" :index="index"
                                        @retornoTexto="retornoTexto" :showToolbar="true" />
                                </div>
                            </div>
                            <div class="col-1 trash">
                                <i class="bi bi-trash-fill" v-if="index > 0"
                                    @click="deleteDynamic(observaciones, index, 'identificador')"></i>
                            </div>
                        </div>
                        <span id="clasificador" @click="agregarObservacion()" style="cursor: pointer"><i
                                class="bi bi-plus-circle-fill"></i>
                            Agregar observacion
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
import EditorTextoHtml from './EditorTextoHtml.vue';
export default {
    name: '',
    components: {
        EditorTextoHtml
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            conceptos: [
                { nombre: 'Extintores', bueno: false, regular: false, malo: false },
                { nombre: 'Portería', bueno: false, regular: false, malo: false },
                { nombre: 'Muebles', bueno: false, regular: false, malo: false },
            ],
            concepto: [],
            consulta_texto: [],
            observaciones: [{ body: '', file: [] }],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        cargarArchivo(event, index) {
            console.log(this.observaciones, index)
            var self = this
            const file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                self.observaciones[index].file.push(file[i])
            }
        },
        quitarAdjuntos(index) {
            this.observaciones[index].file = []
        },
        formatearPesoArchivo(pesoBytes) {
            if (pesoBytes < 1024) {
                return `${pesoBytes} bytes`;
            } else if (pesoBytes < 1024 * 1024) {
                return `${Math.ceil(pesoBytes / 1024)} KB`;
            } else if (pesoBytes < 1024 * 1024 * 1024) {
                return `${Math.ceil(pesoBytes / (1024 * 1024))} MB`;
            } else {
                return `${Math.ceil(pesoBytes / (1024 * 1024 * 1024))} GB`;
            }
        },
        agregarObservacion() {
            this.verLista = this.verLista + 1
            if (this.observaciones.length <= 10) {
                this.observaciones.push({ body: '', file: [] })
            }

        },
        retornoTexto(index, texto) {
            this.observaciones[index].body = texto
            this.consulta_texto[index] = texto
        },
        deleteDynamic(array, index, identificador = null) {
            if (identificador != null) {
                this.consulta_texto.splice(index, 1)
                this.observaciones[index].file = []
            }
            array.splice(index, 1)
        },
        // guardarArchivos(id) {
        //     let self = this;
        //     let config = this.configHeader();
        //     const document = new FormData();
        //     var bandera = 0
        //     this.file.forEach(function (item, index) {
        //         if (item.size > self.limite) {
        //             self.showAlert('El archivo' + item.name + 'es demasiado pesado, el limite es de 3MB', 'error')
        //             bandera++
        //         }
        //         document.append('imagen' + index, item)
        //         if (self.fileInputsCount[index].tipo_documento_id != undefined) {
        //             document.append('id' + index, self.fileInputsCount[index].tipo_documento_id)
        //         } else {
        //             document.append('id' + index, self.fileInputsCount[index].id)
        //         }
        //         document.append('observacion' + index, item)
        //         if (self.fileInputsCount[index].tipo_documento_id != undefined) {
        //             document.append('id' + index, self.fileInputsCount[index].tipo_documento_id)
        //         } else {
        //             document.append('id' + index, self.fileInputsCount[index].id)
        //         }
        //     })
        //     if (bandera <= 0) {
        //         axios
        //             .post(self.URL_API + "api/v1/formulariocliente/doc/" + id, document, config)
        //             .then(function (result) {
        //                 self.showAlert(result.data.message, result.data.status)
        //             });
        //     } else {
        //         axios
        //             .delete(self.URL_API + "api/v1/formulariocliente/" + id, config)
        //             .then(function (result) {
        //                 console.log(result)
        //                 self.cliente_existe = false
        //             });
        //     }
        // },


    }
};
</script>
<style scoped>
#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.adjunto {
    white-space: nowrap;
    margin-bottom: 10px;
    background-color: #239B56;
    color: rgb(255, 255, 255);
    width: 100%;
}

.bi bi-x {
    margin: 20px 0px 20px 0px;
    max-width: 400px;
    cursor: pointer;
}

.card button {
    margin: auto;
    width: 99%;

}

.card {
    width: 100%;
    margin: 40px 0px 40px 0px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

#label {
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
}
</style>