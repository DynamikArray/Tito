<template>
  <div>
    <v-btn
      small
      color="red darken-4"
      class="pr-0 pl-2 white--text textShadow"
      style="min-width:35px"
      @click="confirmDelete"
      ><v-icon small class="mr-2">fa fa-times-circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { DELETE_TOWEL } from "@/components/Towels/store/actionTypes";

export default {
  props: {
    towel: [Boolean, Object]
  },
  methods: {
    async confirmDelete() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete Towel?</h3>
       <p>This will remove this towel from inventory.</p>`,
        {
          title: "  Delete Towel"
        }
      );
      if (confirm) await this.deleteTowel();
    },
    async deleteTowel() {
      await this.$store.dispatch(`towels/${DELETE_TOWEL}`, this.towel);
    }
  }
};
</script>

<style scoped></style>
