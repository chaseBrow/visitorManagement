<template>
  <v-app>
    <Navbar>

    </Navbar>
    <v-content class="primary">
      <router-view>

      </router-view>
    </v-content>
    <Footer>

    </Footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped> 

</style>
