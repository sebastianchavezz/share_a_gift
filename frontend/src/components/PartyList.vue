<template>
  <v-list>
    <v-list-item v-for="party in parties" :key="party.id">
      <v-list-item-content>
        <v-list-item-title>{{ party.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ party.occasion }} - {{ party.date }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="viewPartyDetails(party)">View</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import axios from 'axios';
import { getCurrentUserId, userIsLoggedIn } from '@/auth/auth'; // Import getCurrentUserId function

export default {
  props: {
    parties: Array,
  },
  methods: {
    async viewPartyDetails(party) {
      try {
        // Check if the user is logged in
        if (!userIsLoggedIn()) {
          // Redirect to login page or show login modal
          return;
        }
        
        // Retrieve user ID
        const userId = getCurrentUserId();
        console.log('userId: ', userId);
        
        // Fetch parties based on user ID
        const response = await axios.get(`http://localhost:3001/getParty-by-user/${userId}`);
        console.log('Parties retrieved successfully:', response.data);
        // Handle the response data as needed
      } catch (error) {
        console.error('Error fetching parties:', error.message);
        // Handle error
      }
    },
  },
};
</script>
