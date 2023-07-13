<template>
    <div class="container">
        <h2>Gestión novedades nómina</h2>
        <form @submit.prevent="save()">
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Nombre completo / Razón social:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                            @input="razon_social = formatInputUpperCase($event.target.value)" aria-describedby="emailHelp"
                            v-model="razon_social" />
                        <span id="validate" v-if="razon_social == '' && submitted" class="error">{{ mensaje_error }}</span>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">NIT:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="20"
                            aria-describedby="emailHelp" v-model="nit"
                            @input="nit = validarNumero(nit), calcularDigitoVerificacion(nit)" />
                        <span id="validate" v-if="nit == '' && submitted" class="error">{{
                            mensaje_error }}</span>

                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Dígito de verificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1" maxlength="6"
                            aria-describedby="emailHelp" v-model="digito_verificacion" :disabled="true" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de convenio:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_convenio"
                            @input="numero_convenio = validarNumero(numero_convenio), calcularDigitoVerificacion(numero_convenio)" />
                        <span id="validate" v-if="numero_convenio == '' && submitted" class="error">{{ mensaje_error
                        }}</span>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Carga documentos</h6>
            <div id="seccion">
                <div class="row upload" v-for="item, index in fileInputsCount" :key="index">
                    <div class="col-2" v-if="$route.params.id != null">
                        <a :href="URL_API + item.ruta" target="_blank" rel="noopener noreferrer"><button type="button"
                                class="btn btn-sm ver"><i class="bi bi-eye"> ver</i></button></a>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" :disabled="true"
                                v-model="item.nombre"></textarea>
                        </div>
                        <span id="validate" v-if="file[index] == undefined && submitted" class="error">¡Por favor adjunte el
                            archivo!</span>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" :id="'seleccionArchivos' + index"
                                :accept="fileInputsCount[index].tipo_archivo" @change="cargarArchivo($event, index)"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" @click="deleteFile(index)"
                                id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <!-- <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" :disabled="true"
                                v-model="label_horas_extras"></textarea>
                        </div> -->
                        <input type="text" class="form-control" :disabled="true" autocomplete="off" id="exampleInputEmail1" maxlength="200"
                           aria-describedby="emailHelp" v-model="label_horas_extras" />
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="seleccionArchivos"
                                accept=".pdf" @change="cargarArchivo($event, index)"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" @click="deleteFile(index)"
                                id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <textarea placeholder="Observaciones" class="form-control" id="exampleFormControlTextarea1"
                                v-model="horas_extras"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <!-- <div class="mb-3">
                            <textarea  class="form-control" id="exampleFormControlTextarea1" :disabled="true"
                                v-model="label_comisiones"></textarea>
                        </div> -->
                        <input type="text" class="form-control" :disabled="true"  autocomplete="off" id="exampleInputEmail1" maxlength="200"
                           aria-describedby="emailHelp" v-model="label_comisiones" />
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="seleccionArchivos"
                                accept=".pdf" @change="cargarArchivo($event, index)"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" @click="deleteFile(index)"
                                id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                     <div class="col">
                        <div class="mb-3">
                            <textarea placeholder="Observaciones" class="form-control" id="exampleFormControlTextarea1"
                                v-model="comisiones"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-success" type="submit" style="margin:30px">Guardar</button>
        </form>
    </div>
</template>
<script>
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            razon_social: '',
            nit: '',
            digito_verificacion: '',
            numero_convenio: '',
            submitted: false,
            file: [],
            fileInputsCount: [],
            label_horas_extras:'Horas extras: *',
            horas_extras:'',
            label_comisiones:'Comisiones: *',
            comisiones:''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {
        this.documentsList()
    },
    methods: {
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        validarNumero(valor) {
            return valor.replace(/\D/g, "");
        },
        calcularDigitoVerificacion(myNit) {
            var vpri,
                x,
                y,
                z;

            // Procedimiento
            vpri = new Array(16);
            z = myNit.length;

            vpri[1] = 3;
            vpri[2] = 7;
            vpri[3] = 13;
            vpri[4] = 17;
            vpri[5] = 19;
            vpri[6] = 23;
            vpri[7] = 29;
            vpri[8] = 37;
            vpri[9] = 41;
            vpri[10] = 43;
            vpri[11] = 47;
            vpri[12] = 53;
            vpri[13] = 59;
            vpri[14] = 67;
            vpri[15] = 71;

            x = 0;
            y = 0;
            for (var i = 0; i < z; i++) {
                y = (myNit.substr(i, 1));

                x += (y * vpri[z - i]);
            }

            y = x % 11;

            this.digito_verificacion = (y > 1) ? 11 - y : y;
            console.log('')
        },
        documentsList() {
            this.fileInputsCount = [
                {
                    "id": 1,
                    "nombre": "Cámara de comercio (Archivo PDF, expedición menor 30 días): ",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 2,
                    "nombre": "RUT (Archivo PDF, Actualizado): *",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 3,
                    "nombre": "Cedula (Archivo PDF, Actualizado): *",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 4,
                    "nombre": "ARL (Archivo PDF, Actualizado): ",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 5,
                    "nombre": "Certificado bancario (Archivo PDF, Actualizado): *",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 6,
                    "nombre": "Certificado comercial (Archivo PDF, Actualizado): *",
                    "abreviacion": "",
                    "tipo_archivo": ".pdf",
                    "tipo_proveedor_id": "1",
                    "created_at": null,
                    "updated_at": null
                }
            ]
        },
        cargarArchivo(event, index) {
            const file = event.target.files[0];
            this.file[index] = file;
        },
        deleteFile(index) {
            this.file.splice(index, 1)
            document.getElementById("seleccionArchivos" + index).value = ''

        },
        save(){
            
        }
    }
};
</script>
<style scoped>
.filled {
    border-color: green;
}

.row:first-child {
    margin-top: 30px;
}

.row .col h5 {
    margin-top: 30px;
}

h2 {
    margin: 20px;
}

h6 {
    font-weight: bold
}

#seccion:last-child {
    margin-bottom: 50px;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.tituloseccion {
    position: relative;
    display: inline-block;
    background-color: white;
    padding: 5px;
    top: 22px;
}

span {
    height: 38px;
}

/* Fin select con filtro personalizado */

#clasificador {
    width: 100%;
    text-align: left;
    float: left;
}

.upload {
    margin-bottom: 20px;
}

p {
    text-align: justify;
}

#contenedor-select .col {
    padding: 10px;
    margin: 10px;
}

ul li {
    list-style: decimal;
}

section span {
    padding-bottom: 30px;
    background-color: red;
}

.ver {
    background-color: #006b3f;
    color: white;
}

.ver:hover {
    background-color: #05a562;
}

.trash {
    position: relative;
    width: 30px;
}

.bi-trash-fill {
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
}

ul li {
    list-style: none;
}

#validate {
    color: red;
    font-size: 0.7rem;
    float: left;
}

.error {
    color: red;
}
</style>