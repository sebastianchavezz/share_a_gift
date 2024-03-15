<!-- src/components/PartyList.vue -->
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
  export default {
    props: {
      parties: Array,
    },
    methods: {
      viewPartyDetails(party) {
        // Implement the logic to view party details
        console.log("Viewing party details:", party);
      },
    },
  };
  </script>
  