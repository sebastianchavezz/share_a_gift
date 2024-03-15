<!-- src/components/ProductDetailsPopup.vue -->
<template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-img :src="product.image" height="200px"></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>{{ product.price }}</v-card-subtitle>
        <v-card-text>{{ product.description }}</v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <!-- Additional details or actions can be added here -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="closeDialog" color="primary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      closeDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  