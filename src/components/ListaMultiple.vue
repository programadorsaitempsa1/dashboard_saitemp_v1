<template>
    <div class="col-3 lista-multiple" id="contenedor-select" @click="hover2 = !hover2">
        <button style="margin:5px" class="btn btn-sm" v-for="(item, index) in elementos2" :key="index"
            type="button">{{ item.nombre }}<i @click="eliminarElemento(index),swict()" class="bi bi-x"></i></button>
        <div v-if="hover2 && elementoslist2.length > 0" id="select2" @mouseleave="hover2 = false">
            <div id="lista2" v-for="(item, index) in elementoslist2" :key="index"
                @click="agregarElemento(index)">
                {{ item.nombre }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListaMultiple',
    props: {
        hover: {
            type: Boolean,
            default: false,
        },
        elementoslist: {
            type: Array,
            default: () => []
        },
        elementos: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            hover2: false,
            elementos2: [],
            elementoslist2: []
        }
    },
    created() {
        this.hover2 = false;
        this.elementos2 = [...this.elementos];
        this.elementoslist2 = [...this.elementoslist];
    },
    methods: {
        agregarElemento(index) {
            this.elementos2.push(this.elementoslist2[index]);
            this.elementoslist2.splice(index, 1);
        },
        eliminarElemento(index) {
            this.elementoslist2.push(this.elementos2[index]);
            this.elementos2.splice(index, 1);
        },
        swict() {
            setTimeout(() => {
                this.hover2 = false
            }, "0,1");
        },
    }
};
</script>

<style scoped>
/* Select con filtro personalizado */
#contenedor-select {
    position: relative;
}

.lista-multiple {
    border: 0.7px rgba(207, 205, 205, 0.815) solid;
    border-radius: 7px;
    position: relative;
    padding: 10px;
}

#select2 #lista2:hover {
    background-color: #61CE70;
    color: white;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 5px;    
}

#select1 {
    z-index: 200;
}

#select2 {
    z-index: 100;
}

#select2 {
    padding: 5px;
    border: solid #7c7e7e 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top: 39px;
    left: 0px;
    background-color: white;

    cursor: pointer;
}

.btn{
    background-color: #126b41;
    color: white;
}
</style>