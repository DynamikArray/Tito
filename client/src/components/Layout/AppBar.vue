<template>
  <div>
    <v-app-bar color="primary" app dark dense>
      <div class="loadingIndicator">
        <v-progress-linear
          :indeterminate="Boolean(loading)"
          color="white"
          height="5"
        ></v-progress-linear>
      </div>

      <v-app-bar-nav-icon>
        <v-img max-width="40px" src="@/assets/images/towels_icon_small.png" />
      </v-app-bar-nav-icon>
      <v-toolbar-title>TiTo</v-toolbar-title>
      <div class="d-flex ml-4">
        <v-btn text to="/">
          <v-icon class="mr-1">fa fa-home</v-icon>Home
        </v-btn>
        <v-btn text to="towels">
          <v-icon class="mr-1">fas fa-layer-group</v-icon>Towels
        </v-btn>
        <v-btn text to="audit">
          <v-icon class="mr-1">fas fa-history</v-icon>Audit
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <div class="d-flex">
        <!--USER MENU -->
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      loading: state => state.api.loading
    })
  }
};
</script>

<style scoped>
.loadingIndicator {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
