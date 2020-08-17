<template>
  <v-card class="my-10 pa-0">
    <v-card-title class="ma-0 pa-2 primary textShadow"
      ><div class="text-h4">
        <v-icon class="mr-2 pa-0">fa fa-sign-in-alt</v-icon>Sign In
      </div>
    </v-card-title>
    <v-card-text class="white--text">
      <div class="d-flex flex-column align-center justify-center flex-grow-1">
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
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-space-between text-shadow">
      <v-btn color="error" @click="resetForm()"
        ><v-icon small class="mr-1">fa fa-sign-in-alt</v-icon>Reset</v-btn
      >
      <v-btn color="success" @click="submitForm()"
        ><v-icon small class="mr-1">fa fa-sign-in-alt</v-icon>Sign In</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { USER_LOGIN } from "@/components/User/store/actionTypes";
const defaultUser = {
  username: "",
  password: ""
};

export default {
  data: () => ({
    username: defaultUser.username,
    password: defaultUser.password,
    fieldRules: {
      username: [],
      password: []
    }
  }),
  methods: {
    submitForm() {
      //put a form in an validate it ,
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
