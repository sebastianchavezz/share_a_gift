<template>
  <div>
    <v-btn @click="viewPartyDetails">Fetch Party Details</v-btn>
    <v-list v-if="partyDetails.length > 0">
      <v-list-item v-for="(detail, index) in partyDetails" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ detail.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ detail.date }}</v-list-item-subtitle>
          <!-- Add more details as needed -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-alert v-else-if="fetchError" type="error">{{ fetchError }}</v-alert>
  </div>
</template>

<script>
import axios from 'axios';
import { getCurrentUserId, userIsLoggedIn } from '@/auth/auth'; // Import getCurrentUserId function
import router from '@/router'; // Import Vue Router instance

export default {
  props: {
    parties: Array,
  },
  data() {
    return {
      partyDetails: [],
      fetchError: null
    };
  },
  methods: {
    async viewPartyDetails() {
      try {
        // Check if the user is logged in
        if (!userIsLoggedIn()) {
          // Redirect to login page
          router.push('/login');
          return;
        }
        
        // Retrieve user ID
        const userId = getCurrentUserId();
        console.log('userId: ', userId);
        
        // Fetch parties based on user ID
        const response = await axios.get(`http://localhost:3001/getParty-by-user/${userId}`);
        console.log('Parties retrieved successfully:', response.data);
        
        // Assign response data to partyDetails
        this.partyDetails = response.data;
        this.fetchError = null; // Reset fetch error if any
      } catch (error) {
        console.error('Error fetching parties:', error.message);
        this.fetchError = 'Error fetching parties. Please try again.'; // Set fetch error
      }
    },
  },
  mounted() {
    // Call viewPartyDetails method when component is mounted
    this.viewPartyDetails();
  },
};
</script>

