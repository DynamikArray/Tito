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
      <NavigationMenu />
      <v-spacer></v-spacer>
      <div class="d-flex">
        <UserMenu />
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserMenu from "@/components/User/UserMenu/UserMenu";
import NavigationMenu from "@/components/Layout/NavigationMenu";

export default {
  components: {
    UserMenu,
    NavigationMenu
  },
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
