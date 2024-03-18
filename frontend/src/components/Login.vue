<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" v-model="username"></v-text-field>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Send login credentials to the backend
        const response = await axios.post('http://localhost:3001/login', {
          username: this.username,
          password: this.password
        });
        
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        // Handle successful login
        console.log('Login successful:', response.data);
        
        // Redirect to another page or update UI as needed
      } catch (error) {
        console.error('Login failed:', error.message);
        // Handle login error, e.g., show error message to the user
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
