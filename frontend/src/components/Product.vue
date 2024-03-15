<!-- src/components/Product.vue -->
<template>
  <v-card @click="openDetailsPopup">
    <v-img :src="product.image" height="200px"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.price }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-btn @click.stop="addToParty" color="primary">Add To Party</v-btn>

    <!-- Dialog component -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-img :src="product.image" height="200px"></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>{{ product.price }}</v-card-subtitle>
        <v-card-text>{{ product.description }}</v-card-text>

        <v-btn @click="closeDetailsPopup">Close</v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    addToParty() {
      // Implement your add to cart logic here
      console.log('Added to Cart:', this.product.name);
    },
    openDetailsPopup() {
      this.dialog = true;
    },
    closeDetailsPopup() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
