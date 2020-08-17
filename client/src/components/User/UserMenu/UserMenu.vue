<template>
  <div class="d-flex align-center justifye-end" v-if="username">
    <div class="d-flex align-center justifye-end">
      {{ username }}
    </div>
    <div class="d-flex align-center justifye-end">
      <v-btn small icon class="ml-2 pl-1" @click="logoutUser">
        <v-icon small>fa fa-sign-out-alt</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_LOGOUT } from "../store/actionTypes";

export default {
  props: {},
  components: {},
  computed: {
    ...mapGetters({
      username: "user/getUsername",
      loading: "user/getLoading"
    })
  },
  methods: {
    logoutUser() {
      this.$store.dispatch(`user/${USER_LOGOUT}`);
    }
  }
};
</script>

<style scoped></style>
