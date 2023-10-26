<template>
    <div id="contenedor-select" class="was-validated">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{{ nombreCampo }}</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                <input type="text" @focus="consultaEndPoint()" @click="hover = !hover" @keyup="hover = true"
                    autocomplete="off" @input="filterResults(registro, registros, 'registros')" class="form-control"
                    id="exampleInputEmail2" :placeholder="placeholder" aria-describedby="emailHelp" v-model="registro"
                    :disabled="disabled" :required="valida_campo"/>
                <span class="input-group-text" style="cursor:pointer; border-top-right-radius:5px;border-bottom-right-radius:5px" @click="listaEnCadena(registro), registro = ''"
                    id="basic-addon3"><i class="bi bi-x"></i></span>
                <div class="invalid-feedback">
                    {{ mensaje_error }}
                </div>
            </div>
        </div>
        <div v-if="hover && registros.length > 0" id="select1" @mouseleave="hover = false">
            <div id="lista1" v-for="(item, index) in registrosFilter" :key="index"
                @click="registro = nombreItems(item), retornoValorCampo(item), hover = !hover, filterResults('', registros, 'registros'), listaEnCadena(item)">
                {{ nombreItems(item) }}
                <!-- {{ item.nom_pai != null ? item.nom_pai: item.nom_dep != null? item.nom_dep: item.nom_ciu != null ? item.nom_ciu: '' }} -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        nombreCampo: {},
        placeholder: {},
        registros: [],
        nombreItem: {},
        eventoCampo: {},
        ubicacion: {},
        clearInput: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: null
        },
        ordenCampo: {
            type: Number,
            default: null
        },
        archivos: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        valida_campo: {
            type: Boolean,
            default: true
        },
        consulta: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            hover: false,
            registro: '',
            registrosFilter: this.registros,
            mensaje_error:'¡Este campo debe ser diligenciado!'
        }
    },

    watch: {
        consulta: function () {
            this.registro = this.consulta
        },
        registros: function () {
            this.registrosFilter = this.registros
        },
        clearInput: function () {
            if (this.clearInput == true) {
                this.registro = ''
            }
        }
    },
    created() {
        this.registro = this.consulta
    },
    methods: {
        consultaEndPoint() {
            if (this.eventoCampo != undefined) {
                this.$emit(this.eventoCampo)
            }

        },
        retornoValorCampo(item) {
            if (this.registro != '' && this.nombreCampo != 'Pais' && this.nombreCampo != 'Departamento' && this.nombreCampo != 'Ciudad' && this.index == null) {
                this.$emit(this.eventoCampo, item)
            } else if (this.index != null) {
                this.$emit(this.eventoCampo, item, this.index)
            }
        },
        nombreItems(item) {
            return item[this.nombreItem];
        },
        filterResults(value, array, nombrearray) {
            var search = null
            if (this.archivos) {
                let self = this
                search = array.forEach(function (element) {
                    if (self.nombreItems(element) != undefined) {
                        return element;
                    }
                });
            } else {
                search = array.filter(item => this.nombreItems(item).toLowerCase().match(value.toLowerCase()));
                if (nombrearray == 'registros') {
                    this.registrosFilter = search
                }
            }
        },
        listaEnCadena(item) {
            switch (this.eventoCampo) {
                case 'getPaises':
                    this.$emit('getDepartamentos', item, this.ordenCampo, this.index)
                    break;
                case 'getDepartamentos':
                    this.$emit('getMunicipios', item, this.ordenCampo, this.index)
                    break;
                case 'setMunicipios':
                    this.$emit('setMunicipios', item, this.ordenCampo, this.index)
                    break;
                case 'getCodigosCiiu':
                    this.$emit('getActividadesCiiu', item)
                    break;
                case 'getSubCategoryReports':
                    this.$emit('getSubCategoryReports', item)
                    break;
                case 'getTipoIdentificacion':
                    this.$emit('setTipoIdentificacion', item, this.ordenCampo, this.index)
                    break;
                case 'getAfirmacionNegacion':
                    this.$emit('setAfirmacionNegacion', item, this.ordenCampo, this.index)
                    break;
                case 'getBancos':
                    this.$emit('setBanco', item, this.ordenCampo, this.index)
                    break;
                case 'getTipoCuentaBancos':
                    this.$emit('setTipoCuentaBancos', item, this.ordenCampo, this.index)
                    break;
                case 'getTipoOrigenMedios':
                    this.$emit('setTipoOrigenMedios', item, this.ordenCampo)
                    break;
                case 'getTipoArhivo':
                    this.$emit('setTipoArchivo', item, this.index)
                    break;
            }
        }
    }
};
</script>
<style  scoped>
label {
    float: left;
    margin: 20px 0px 5px 0px;
}

/* Select con filtro personalizado */
#contenedor-select {
    position: relative;
}

#select1 {
    z-index: 200;
}

#select2 {
    z-index: 100;
}

#select1,
#select2 {
    padding: 5px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top: 85px;
    left: 35px;
    background-color: white;
    cursor: pointer;
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

#select1 #lista1,
#select2 #lista2 {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

#select1 #lista1:hover,
#select2 #lista2:hover {
    background-color: #0d6efd;
    color: white;
}

span {
    height: 38px;
}

/* Fin select con filtro personalizado */
</style>