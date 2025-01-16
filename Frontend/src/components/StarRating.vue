<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= currentRating }"
      @click="rate(star)"
    >
      ★
    </span>
  </div>
</template>
  
  <script>
  export default {
    props: {
      value: Number,
    },
    data() {
      return {
        currentRating: this.value || 0,
      };
    },
    methods: {
      rate(star) {
        this.currentRating = star;
        this.$emit('input', star);
      },
    },
  };
  </script>
  
  <style scoped>
  .star {
    font-size: 1.5rem;
    cursor: pointer;
    color: gray;
  }
  .star.filled {
    color: gold;
  }
  </style>
  