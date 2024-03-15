<!-- src/views/Party.vue -->
<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">Make A Party</v-card-title>
            <v-card-text>
              <PartyForm @submit="createParty" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">Your Parties</v-card-title>
            <v-card-text>
              <PartyList :parties="userParties" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PartyForm from "@/components/PartyForm.vue";
  import PartyList from "@/components/PartyList.vue";
  
  export default {
    components: {
      PartyForm,
      PartyList,
    },

    data() {
      return {
        userParties: [
          // Initialize with sample data or fetch from backend
          {
            id: 1,
            name: "John's Birthday",
            occasion: "Birthday",
            date: "2024-02-29",
            members: ["friend1@example.com", "friend2@example.com"],
          },
        ],
      };
    },
    methods: {
      createParty(party) {
        // Add the newly created party to the userParties array
        this.userParties.push(party);
      },
    },
  };
  </script>
  