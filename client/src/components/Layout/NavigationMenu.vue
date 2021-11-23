<template>
  <div class="d-flex ml-4">
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon class="mr-1">fa fa-home</v-icon>Main Menu
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group>
          <v-list-item key="home">
            <v-list-item-title @click="navigateTo('/')">
              <v-icon class="mr-1">fas fa-home</v-icon>Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item key="towels">
            <v-list-item-title @click="navigateTo('towels')">
              <v-icon class="mr-1">fas fa-layer-group</v-icon>Towels
            </v-list-item-title>
          </v-list-item>

          <v-list-item key="audit">
            <v-list-item-title @click="navigateTo('audit')">
              <v-icon class="mr-1">fas fa-history</v-icon>Audit
            </v-list-item-title>
          </v-list-item>

          <v-list-item key="letters">
            <v-list-item-title @click="navigateTo('letters')">
              <v-icon class="mr-1">fas fa-sort-alpha-up</v-icon>Letters
            </v-list-item-title>
          </v-list-item>

          <v-list-item key="reports">
            <v-list-item-title @click="navigateTo('reports')">
              <v-icon class="mr-1">fas fa-file-alt</v-icon>Reports
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped></style>
