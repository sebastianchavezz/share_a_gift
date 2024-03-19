<!-- src/components/PartyForm.vue -->
<template>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="partyName" label="Name of Party" required></v-text-field>
      <v-text-field v-model="occasion" label="Occasion" required></v-text-field>
      <v-date-picker v-model="date" label="Date of Birthday" required></v-date-picker>
  
      <!-- Member input section -->
      <v-row v-for="(member, index) in members" :key="index">
        <v-col cols="10">
          <v-text-field v-model="member.email" label="Member Email" required></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn @click="removeMember(index)" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- Button to add a new member input -->
      <v-btn @click="addMember" color="primary">Add Member</v-btn>
  
      <v-btn type="submit" color="primary">Create Party</v-btn>
    </v-form>
  </template>

<script>
  import axios from 'axios';
  import {getCurrentUserId, userIsLoggedIn }from '@/auth/auth';
  
  export default {
    data() {
      return {
        partyName: "",
        occasion: "",
        date: null,
        members: [{ email: "" }], // Start with one input field
      };
    },
    methods: {
      async submitForm() {
        try {
          if (!userIsLoggedIn()) {
            // Redirect to login page or show login modal
            return;
          }
          // Retrieve user ID
          const userId = getCurrentUserId();
          const newParty = {
            userId: userId,
            occasion: this.occasion,
            date: this.date,
            users: this.members.map(member => ({ email: member.email }))
          };
          const response = await axios.post('http://localhost:3001/add-party', newParty);
          console.log('Party added successfully:', response.data);
          this.$emit('party-added', response.data);
        } catch (error) {
          console.error('Error adding party:', error.message);
          // Handle error
        }
  
        // Clear the form fields after submission
        this.occasion = "";
        this.date = null;
        this.members = [{ email: "" }];
      },
      addMember() {
        this.members.push({ email: "" });
      },
      removeMember(index) {
        this.members.splice(index, 1);
      },
    },
  };
</script>