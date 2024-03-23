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
import { getCurrentUserId } from '@/auth/auth'; // Import getCurrentUserId function

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
        
        // Fetch user data after successful login
        this.fetchAndDisplayUserData(response.data.userId);
        
        // Emit an event containing the user data
        this.$emit('userLoggedIn', response.data.user);
        
        // Redirect to another page or update UI as needed
        // For example, redirect to the home page
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error.message);
        // Handle login error, e.g., show error message to the user
      }
    },
    async fetchAndDisplayUserData(userId) {
      try {
        const response = await axios.get(`http://localhost:3001/get-user/${userId}`);
        const userData = response.data;
        console.log('User data:', userData);
        // Update UI to display user data as needed
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error fetching user data
      }
    }
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
