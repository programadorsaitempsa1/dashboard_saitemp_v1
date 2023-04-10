<template>
    <div>
        <div class="container">
            <h2>Datos básicos del empleado</h2>
            <div class="card col-xs-12 col-md-12">
                <form>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Tipo de identificación</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="tipo_identificacion" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Número de identificación</label>
                                <input type="text" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
                                    v-model="numero_identificacion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fecha de expedición documento</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="fecha_expedicion" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Salario</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="salario" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="nombres" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="fecha_nacimiento" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Departamento de residencia</label>
                                <input type="text" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
                                    v-model="departamento_residencia" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Ciudad de residencia</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="ciudad_residencia" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Barrio</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="barrio" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Dirección</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="direccion" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Género</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="genero" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Fondo de salud (actual)</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="fondo_salud" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Corrreo electrónico</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="correo" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Número de contacto</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="numero_contacto" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Contacto de emergencia</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="contacto_emergencia" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Celular de contacto</label>
                                <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    v-model="celular_contacto" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" @click="$router.go(-1)">
                        Atrás
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tipo_identificacion: '',
            salario: '',
            numero_identificacion: '',
            departamento_residencia: '',
            fecha_expedicion: '',
            ciudad_residencia: '',
            fecha_nacimiento: '',
            barrio: '',
            nombres: '',
            direccion: '',
            genero: '',
            contacto_emergencia: '',
            correo: '',
            fondo_salud: '',
            numero_contacto: '',
            celular_contacto: '',
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

span {
    margin: auto;
}

.col {
    margin-bottom: 20px;
}
</style>