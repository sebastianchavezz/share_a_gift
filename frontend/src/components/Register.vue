<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline">Register</v-card-title>
            <v-card-text>
              <!-- Your modern registration form goes here -->
              <v-form>
                <v-text-field label="Username" v-model="username"></v-text-field>
                <v-text-field label="Email" type="email" v-model="email"></v-text-field>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        // Implement your registration logic here
        console.log('Registering:', this.username, this.email);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  