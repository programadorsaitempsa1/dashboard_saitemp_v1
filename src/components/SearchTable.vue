<template>
    <div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">{{ nombreCampo }}:</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                <input type="text" @click="modal = true" autocomplete="off" class="form-control" id="exampleInputEmail2"
                    :placeholder="placeholder" aria-describedby="emailHelp" v-model="registro" />
                <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade show mask" id="exampleModal" :style="modal ? 'display: block' : 'display: none'"
            role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Seleccione registro</h1>
                        <button type="button" @click="modal = !modal" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-8">
                                <div class="input-group">
                                    <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                                    <input type="text" autocomplete="off" class="form-control" id="exampleInputEmail2"
                                        placeholder="Buscar por código o nombre" aria-describedby="emailHelp"
                                        v-model="search" />
                                </div>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Buscar</button>
                            </div>
                        </div>


                        <table class="table table-striped ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Código</th>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item, index in registros" :key="index">
                                    <td>{{ index }}</td>
                                    <td @click="registro = item.nombre, modal = false">{{ item.codigo }}</td>
                                    <td @click="registro = item.nombre, modal = false">{{ item.nombre }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="modal = !modal" class="btn btn-warning"
                            data-bs-dismiss="modal">Cerrar ventana</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        registros: [],
        nombreCampo: {},
        placeholder: {},
        showmodal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            modal: this.showModal,
            registro: '',
            search:''
        }
    },

    watch: {
        // showModal: function () { // Valida que se haya llenado un campo de firma para limpiar el pad de firmas
        //     // if(this.modal == true){
        //     //     this.modal = true
        //     // }
        // }
    },

    created() {

    },
    methods: {

    }
};
</script>
<style scoped>
tr td {
    cursor: pointer;
}

.mask {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
    transition: opacity 0.3s ease;
    position: fixed;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

.table td {
text-align: left;
} 
</style>