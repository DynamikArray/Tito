<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container fluid class="fill-height">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <Footer />

    <BottomNav v-if="showBottomNav" />
  </v-app>
</template>

<script>
import AppBar from "./components/Layout/AppBar";
import Footer from "./components/Layout/Footer";
import BottomNav from "./components/Layout/BottomNav";

export default {
  name: "App",
  components: {
    AppBar,
    Footer,
    BottomNav
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  data: () => ({
    showBottomNav: false
  })
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.5, 0.8, 0.5);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.toast-container {
  font-family: "Roboto", sans-serif;
}

.textShadow {
  text-shadow: #333 1px 1px 1px;
}

.w-100 {
  width: 100%;
}
</style>
