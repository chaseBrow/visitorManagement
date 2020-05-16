<template>
  <v-app>
    <Navbar>

    </Navbar>
    <v-content>
      <router-view>

      </router-view>
    </v-content>
    <Footer>

    </Footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
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
