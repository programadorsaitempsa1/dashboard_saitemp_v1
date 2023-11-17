<template>
  <div>
    <div class="container contenedor">
      <div class="signature">
        <div class="col-xs-12 col-md-12">
          <VueSignaturePad id="signature" height="200px" ref="signaturePad" :options="options" />
        </div>
        <div class="buttons">
          <button type="button" @click="back" class="btn btn-primary btn-sm">Deshacer</button>
          <button type="button" @click="clear" class="btn btn-primary btn-sm btn-warning">Limpiar</button>
          <button type="button" @click="save" class="btn btn-primary btn-sm btn-success">Firmar</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    signed: Boolean
  },
  data() {
    return {
      textArea: '',
      options: {
        penColor: "#000000",
        velocityFilterWeight: 0,
      },
    }
  },

  watch: {
    signed: function () { // Valida que se haya llenado un campo de firma para limpiar el pad de firmas
      if (this.signed) {
        this.clear()
      }
    }
  },
  mounted() {
  },
  methods: {
    back() { // Borra la ultima linea escrita en el pad
      this.$refs.signaturePad.undoSignature();
    },
    clear() { // Limpia el pad de firmas
      this.$refs.signaturePad.clearSignature();
    },
    save() { // convierte la firma en imagen codificada en base64
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.textArea = data;
        // this.prueba()
        this.$emit('firma', this.textArea)
      }
    },

  },
};
</script>
  
<style>
#signature {
  border: double 1px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
}

.buttons {
  float: left;
}

.buttons button {
  margin-right: 10px;
  margin-top: 30px;
}
</style>
  