<template>
    <div class="container">
        <h2>Gestión de solicitud de novedades nómina</h2>
        <div class="card col-xs-12 col-md-6">
            <form>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo remitente: *</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="nombre" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo destinatario: *</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="nombre" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Asunto: *</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="nombre" />
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Descripción: *</label>
                    <br>
                    <EditorTextoHtml />
                    <!-- <div class="mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            v-model="descripcion"></textarea>
                    </div> -->
                </div>
                <!-- <button type="submit" class="btn btn-success" @click="save()">
                        Guardar
                    </button>
                    <button type="submit" class="btn btn-warning" @click="clear">
                        Limpiar
                    </button>
                    <button type="submit" class="btn btn-primary" @click="back">
                        Atrás
                    </button> -->

            </form>
        </div>
    </div>
</template>
<script>
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
            nombre: '',
            descripcion: ''
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
.card {
    width: 100%;
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
</style>