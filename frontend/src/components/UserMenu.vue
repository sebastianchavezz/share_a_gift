<template>
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ on }">
        <v-list-item v-bind="on">
          <v-avatar color="brown" size="large">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">{{ user.email }}</p>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded>
              Edit Account
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded>
              Disconnect
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
    },
  };
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  