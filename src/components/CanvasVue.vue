<template>
    <div>
        <canvas @mousemove="draw" @mousedown="beginDrawing" @mouseup="stopDrawing" id="myCanvas" ref="canvas">
            Tu navegador no admite el elemento &lt;canvas&gt;.
        </canvas>
        <div class="input-group mb-3">
            <input @change="createImage" style="cursor:pointer" type="file" class="form-control" id="seleccionArchivos">
            <label class="input-group-text" style="cursor:pointer" @click="beginDrawing()"
                for="inputGroupFile02">Guardar</label>
            <label class="input-group-text" style="cursor:pointer" @click="clear()"
                for="inputGroupFile02">Borrar</label>
        </div>
        <div class="imagen">
            <img :src="previewImage" alt="">
        </div>

    </div>
</template>
<script>
export default {


    data() {
        return {
            canvas: null,
            x: 0,
            y: 0,
            isDrawing: false,
            imagen: null,
            url: null,
            imagenInput: '',
            dataUrl: null,
            previewImage:''
        };
    },

    mounted() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        this.vueCanvas = ctx;
    },
    created() {
    },

    methods: {

        cargarImagen(e) {
            this.imagen = e.target.files[0];

            if (this.imagen != null) {
                this.url = URL.createObjectURL(this.imagen);
                this.imagenInput = this.url
            }


        },
        createImage(e) {
           
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                    console.log( this.previewImage)
                };
        
        },

        mousedown() {

        },
        mouseup() {

        },
        mouseout() {

        },
        mousemove() {

        },
        draw() {

        },
        drawLine() {

        },
        clear() {
            this.vueCanvas.clearRect(0, 0, this.vueCanvas.canvas.clientWidth, this.vueCanvas.canvas.clientHeight);
            this.imagen = null
        },

        beginDrawing() {
            let img = new Image();
            img.src = this.url
            this.vueCanvas.drawImage(img, 0, 0)
            let canvas = document.getElementById('myCanvas');
            let fullQuality = canvas.toDataURL('image/jpeg', 1.0);
            console.log(fullQuality);

        },
        stopDrawing() {
        }


    },
};
</script>
<style scoped>
#myCanvas {
    margin: 30px;
    width: 60%;
    border: 1px solid gray;
    clear: both;
}

.imagen {
    margin: auto;
    width: 60%;
    padding: 30px;
}

.imagen img {
    width: 100%;
}
</style>