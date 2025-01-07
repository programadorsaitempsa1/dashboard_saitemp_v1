<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="containerFlujo">
          <draggable
            class="list-group"
            tag="ul"
            v-model="lista1"
            v-bind="lista1"
            @start="isDragging = true"
            @end="onMove"
            group="estados"
          >
            <transition-group type="transition" :name="'flip-list'">
              <li
                class="list-group-item"
                v-for="(element, index) in lista1"
                :key="element.id"
                :class="{ 'green-background': (index + 1) % 2 !== 0 }"
              >
                {{ element.nombre }}
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="col">
        <div class="containerFlujo">
          <draggable
            class="list-group"
            tag="ul"
            v-model="lista2"
            v-bind="lista2"
            @start="isDragging = true"
            @end="onMove"
            group="estados"
          >
            <transition-group type="transition" :name="'flip-list'">
              <li
                class="list-group-item"
                v-for="(element, index) in lista2"
                :key="element.id"
                :class="{ 'green-background': (index + 1) % 2 !== 0 }"
              >
                {{ element.nombre }}
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  watch: {
    lista: {
      handler() {
        this.sliceLista();
      },
      immediate: true, // Ejecuta el watcher inmediatamente
    },
  },
  props: {
    lista: {
      default: () => [],
      type: Array,
    },
  },
  async mounted() {
    this.sliceLista();
  },
  created() {
    this.sliceLista();
  },
  data() {
    return {
      lista1: [],
      lista2: [],
    };
  },
  methods: {
    sliceLista() {
      const midIndex = Math.ceil(this.lista.length / 2);
      this.lista1 = this.lista.slice(0, midIndex);
      this.lista2 = this.lista.slice(midIndex);
    },
    onMove() {
      if (this.lista1.length > this.lista2.length) {
        this.lista2.unshift(this.lista1.pop());
      } else if (this.lista2.length > this.lista1.length) {
        this.lista1.push(this.lista2.shift());
      }
      const lista = this.lista1.concat(this.lista2);
      this.$emit("cambiarOrden", lista);
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 2em;
  animation: fadeIn;
  animation-duration: 2s;
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 1em;
  border-radius: 10px;
}

.list-group-item i {
  cursor: pointer;
}
.spanDrag {
  font-size: 1em;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.containerFlujo {
  margin: auto;
  width: 30vw;
}
.green-background {
  background-color: #d4edda; /* Verde claro */
  color: #000000;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
