<!-- Sidebar.vue -->
<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item>
        <user-menu :user="user" />
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-on:click="goToPage('/products')" prepend-icon="mdi-package-variant" title="My Products"></v-list-item>
      <v-list-item v-on:click="goToPage('/login')" prepend-icon="mdi-login" title="Login"></v-list-item>
      <v-list-item v-on:click="goToPage('/register')" prepend-icon="mdi-account-plus" title="Register"></v-list-item>
      <v-list-item v-on:click="goToPage('/party')" prepend-icon="mdi-party-popper" title="Parties"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";

export default {
  components: {
    UserMenu,
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
  },
  data: () => ({
    user: {
      initials: '69',
      fullName: 'YoMomma69',
      email: 'john.doe@doe.com',
    },
  }),
};
</script>

<style scoped>
/* Add your component styles here */
</style>
