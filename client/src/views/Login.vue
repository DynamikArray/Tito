<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row>
      <v-col class="text-center">
        <div class="text-h1"><b>TITO</b></div>
        <div class="text-h3">Towels In & Towels Out</div>
        <div class="d-flex align-center justify-center">
          <LoginForm />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/User/LoginForm/LoginForm";
export default {
  components: {
    LoginForm
  }
};
</script>

<style scoped></style>
