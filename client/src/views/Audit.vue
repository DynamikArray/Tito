<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row class="justify-start align-self-stretch" no-gutters>
      <v-col>
        <AuditLogContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuditLogContainer from "@/components/AuditLog/AuditLogContainer";

export default {
  name: "Towels",
  components: {
    AuditLogContainer
  }
};
</script>
