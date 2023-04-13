<template>
    <div id="contenedor-select">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{{ nombreCampo }}:</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                <input type="text" @focus="consultaEndPoint()" @click="hover = !hover" @keyup="hover = true" autocomplete="off"
                    @input="filterResults(registro, registros, 'registros')" class="form-control" id="exampleInputEmail2"
                    :placeholder="placeholder" aria-describedby="emailHelp" v-model="registro" />
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
            </div>
        </div>
        <div v-if="hover && registros.length > 0" id="select1" @mouseleave="hover = false">
            <div id="lista1" v-for="(item, index) in registrosFilter" :key="index"
                @click="registro = nombreItems(item), retornoValorCampo(), hover = !hover, filterResults('', registros, 'registros'), listaEnCadena(item)">
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
        eventoCampo:{},
        ubicacion:{},
        clearInput:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hover: false,
            registro: '',
            registrosFilter: this.registros,
        }
    },

    watch: {
        registros: function () {
            this.registrosFilter = this.registros
        },
        clearInput: function () {
            if(this.clearInput == true){
                this.registro = ''
            }
        }
    },
    created() {

    },
    methods: {
        consultaEndPoint() {
            if(this.eventoCampo != undefined){
                this.$emit(this.eventoCampo)
            }
            
        },
        retornoValorCampo() {
            if(this.registro != '' && this.nombreCampo != 'Pais' && this.nombreCampo != 'Departamento' && this.nombreCampo != 'Ciudad'){
                this.$emit(this.eventoCampo, this.registro)
            }
        },
        nombreItems(item) {
            return item[this.nombreItem];
        },
        filterResults(value, array, nombrearray) {
            const search = array.filter(item => this.nombreItems(item).toLowerCase().match(value.toLowerCase()));

            if (nombrearray == 'registros') {
                this.registrosFilter = search
            }
        },
        listaEnCadena(item) {
            switch (this.nombreItem) {
                case 'nom_pai':
                    this.$emit('getDepartamentos', item.cod_pai, this.ubicacion, this.registro)
                    break;
                    case 'nom_dep':
                    this.$emit('getMunicipios', item.cod_dep, this.ubicacion, this.registro)
                    break;
                    case 'nom_ciu':
                    this.$emit('setMunicipios', item.cod_ciu, this.ubicacion, this.registro)
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