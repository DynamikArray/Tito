<template>
  <section class="LettersContainer">
    <h1 class="text-h3">Alphabet Letter Counter</h1>
    <v-divider class="my-3"></v-divider>
    <v-textarea filled autofocus outlined v-model="text2count"></v-textarea>
    <v-btn class="primary" v-on:click="countLetters">
      <v-icon class="mr-1">fa fa-calculator</v-icon>Process</v-btn
    >
    <div class="d-flex flex-wrap align-center justify-center mt-3">
      <div
        class="d-flex align-center justify-center"
        v-for="letter in aToZArray"
        :key="`index-${letter}`"
      >
        <div
          class="mx-3 my-3 pa-4 align-center"
          :class="countLetters[letter] ? 'primary' : 'grey darken-4'"
        >
          <div class="text-h3 text-center">
            {{ countLetters[letter] || "0" }}
          </div>
          <div class="text-h6 text-center">
            {{ letter.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const aToZString = "abcdefghijklmnopqrstuvwxyz";
const aToZArray = aToZString.split("");

export default {
  data: () => ({
    aToZString,
    aToZArray,
    text2count: ""
  }),
  computed: {
    countLetters() {
      return this.text2count
        .toLowerCase()
        .replace(/[^A-Za-z0-9]/g, "")
        .split("")
        .reduce((acc, letter) => {
          if (!acc[letter]) return { ...acc, [letter]: 1 };
          if (acc[letter]) {
            return { ...acc, [letter]: ++acc[letter] };
          }
        }, {});
    }
  }
};
</script>

<style scoped></style>
