<!-- src/views/Products_page.vue -->
<template>
  <v-container>
    <v-row>
      <!-- Search bar -->
      <v-col cols="12">
        <v-text-field v-model="searchQuery" label="Search Products" outlined @input="searchProducts"></v-text-field>
      </v-col>

      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" md="4">
        <Product :product="product" @addToParty="addToParty" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from "@/components/Product";

export default {
  components: {
    Product,
  },
  data() {
    return {
      searchQuery: "",
        products: [
          {
            id: 1,
            name: "Product 1",
            image: "https://placekitten.com/300/200",
            price: "$19.99",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            id: 2,
            name: "Product 2",
            image: "https://placekitten.com/301/200",
            price: "$29.99",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            id: 3,
            name: "Product 3",
            image: "https://placekitten.com/302/200",
            price: "$39.99",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
          {
            id: 4,
            name: "Product 4",
            image: "https://placekitten.com/303/200",
            price: "$49.99",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          },
          {
            id: 5,
            name: "Product 5",
            image: "https://placekitten.com/304/200",
            price: "$59.99",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
          },
          {
            id: 6,
            name: "Product 6",
            image: "https://placekitten.com/305/200",
            price: "$69.99",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            id: 7,
            name: "Product 7",
            image: "https://placekitten.com/306/200",
            price: "$79.99",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            id: 8,
            name: "Product 8",
            image: "https://placekitten.com/307/200",
            price: "$89.99",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
          {
            id: 9,
            name: "Product 9",
            image: "https://placekitten.com/308/200",
            price: "$99.99",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          },
          {
            id: 10,
            name: "Product 10",
            image: "https://placekitten.com/309/200",
            price: "$109.99",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
          },
          {
            id: 11,
            name: "Product 11",
            image: "https://placekitten.com/310/200",
            price: "$119.99",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            id: 12,
            name: "Product 12",
            image: "https://placekitten.com/311/200",
            price: "$129.99",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            id: 13,
            name: "Product 13",
            image: "https://placekitten.com/312/200",
            price: "$139.99",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
          {
            id: 14,
            name: "Product 14",
            image: "https://placekitten.com/313/200",
            price: "$149.99",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          },
          {
            id: 15,
            name: "Product 15",
            image: "https://placekitten.com/314/200",
            price: "$159.99",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
          },
        ],
      };
  },
  computed: {
    filteredProducts() {
      // Filter products based on the search query
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    addToParty(product) {
      // Implement your add to party logic here
      console.log("Added to Party:", product.name);
    },
    searchProducts() {
      // You can add additional logic for searching products if needed
    },
  },
};
</script>