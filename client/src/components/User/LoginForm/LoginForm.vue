<template>
  <v-card class="my-10 pa-0">
    <v-card-title class="ma-0 pa-2 primary textShadow"
      ><div class="text-h4">
        <v-icon class="mr-2 pa-0">fa fa-sign-in-alt</v-icon>Sign In
      </div>
    </v-card-title>
    <v-card-text class="white--text">
      <div class="d-flex flex-column align-center justify-center flex-grow-1">
        <v-form
          ref="userLoginForm"
          v-model="blnValidLogin"
          @submit.prevent="validateLogin"
        >
          <div class="d-flex align-center justify-center text-body-1 pa-2">
            Enter your username and password to sign in.
          </div>
          <div class="d-flex align-center justify-start w-100 px-4">
            <v-text-field
              autofocus
              autocomplete="off"
              hide-details="auto"
              class="my-2"
              dense
              v-model="username"
              name="username"
              label="Username"
              hint="Enter your username"
              outlined
              :rules="fieldRules.username"
            ></v-text-field>
          </div>
          <div class="d-flex align-center justify-center w-100 px-4">
            <v-text-field
              type="password"
              v-model="password"
              autocomplete="off"
              hide-details="auto"
              class="my-2"
              dense
              name="password"
              label="Password"
              hint="Enter your password"
              :rules="fieldRules.password"
              outlined
              @keydown.enter="submitForm()"
            ></v-text-field>
          </div>
        </v-form>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-space-between text-shadow">
      <v-btn color="error" @click="resetForm"
        ><v-icon small class="mr-1">fa fa-sign-in-alt</v-icon>Reset</v-btn
      >
      <v-btn type="submit" color="success" @click.prevent="submitForm()"
        ><v-icon small class="mr-1">fa fa-sign-in-alt</v-icon>Sign In</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { USER_LOGIN } from "@/components/User/store/actionTypes";
import fieldRules from "./fieldRules";

const defaultUser = {
  username: "",
  password: ""
};

export default {
  data: () => ({
    blnValidLogin: false,
    username: defaultUser.username,
    password: defaultUser.password,
    fieldRules
  }),
  methods: {
    validateLogin() {
      return this.$refs.userLoginForm.validate();
    },
    submitForm() {
      if (!this.validateLogin()) return false;
      const user = { username: this.username, password: this.password };
      this.$store.dispatch(`user/${USER_LOGIN}`, user, { root: true });
    },
    resetForm() {
      this.username = defaultUser.username;
      this.password = defaultUser.password;
    }
  }
};
</script>

<style scoped></style>
