<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <TimeLine></TimeLine>
    </div>
  </div>
</template>
<script>
import TimeLine from "./TimeLine.vue";
export default {
  name: "",
  components: {
    TimeLine,
  },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  width: 100%;
  height: 90%;
  animation: fadeIn 0.3s ease;
  min-height: 50%;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
