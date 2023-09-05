<template>
    <div class="container">
        <h2>Formulario de supervisión</h2>
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
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    components: {

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
            concepto: []
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style scoped>
#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

#label {
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    border: solid #D5DBDB 0.5px;
    border-radius: 10px;
}
</style>