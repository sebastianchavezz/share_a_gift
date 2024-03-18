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
              <v-text-field label="Telephone" v-model="tel"></v-text-field>
              <v-btn color="primary" @click="register">Register</v-btn>
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
      email: '',
      password: '',
      tel: '',
    };
  },
  methods: {
    async register() {
      try {
        // Make a POST request to the /register endpoint with user data
        await axios.post('http://localhost:3001/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          tel: this.tel,
        });
        // Registration successful, handle redirect or display a success message
        console.log('Registration successful');
      } catch (error) {
        // Registration failed, handle error
        console.error('Registration error:', error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
