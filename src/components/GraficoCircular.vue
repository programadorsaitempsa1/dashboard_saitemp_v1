<template>
  <div class="flex">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle cx="50" cy="50" :r="radius" fill="rgba(213, 219, 219, 0.5)" />
      <!-- <defs>
        <linearGradient id="gradiente-color" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#A2D9CE" />
          <stop offset="100%" stop-color="#B2BABB" />
        </linearGradient>
      </defs> -->
      <circle cx="50" cy="50" :r="radius" fill="url(#gradiente-color)" />
      <circle cx="50" cy="50" :r="radius" fill="none" :stroke-width="strokeWidth" :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset" :style="{ stroke: color }" transform="rotate(-90, 50, 50)" />
      <text x="50%" y="50%" :font-size="fontSize" :dominant-baseline="'middle'" :text-anchor="'middle'">
        {{ currentPercentage }}
      </text>
    </svg>
    <p>{{ label }}</p>
  </div>
</template>
  
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 200,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    radius: {
      type: Number,
      default: 40,
    },
    strokeWidth: {
      type: Number,
      default: 5,
    },
    maxPercentage: {
      type: Number,
      default: 0,
      // validator: (value) => value >= 0 && value <= 100000,
    },
  },
  data() {
    return {
      color: this.getRandomColor(),
      currentPercentage: 0,
      intervalId: null,
    };
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    dashOffset() {
      const percentage = this.currentPercentage / 1000;
      return this.circumference * (1 - percentage);
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (this.currentPercentage < this.maxPercentage) {
        this.currentPercentage += 1;
      } else {
        clearInterval(this.intervalId);
      }
    }, 20);
    setTimeout(this.loadComplete, 1500); // Llamamos el método loadComplete después de 4 segundos
  },
  created(){
    
  },
  methods: {
    getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    },
    loadComplete() {
      this.currentPercentage = this.maxPercentage; // Establecemos el valor de currentPercentage a maxPercentage
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
<style></style>
  