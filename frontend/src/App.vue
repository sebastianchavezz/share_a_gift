<template>
  <v-app>
    <Sidebar />

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <!-- Add your footer content here -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
