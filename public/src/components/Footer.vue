<template>
  <v-footer color="secondary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="secondary lighten-2 py-4 text-center primary--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Chase Brown</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  })
};
</script>

<style scoped></style>
