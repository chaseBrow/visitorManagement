<template>
  <v-container>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          Login form
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="username"
            label="Username"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="login()">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import Parse from "parse";
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },

  methods: {
    login: async function() {
      await Parse.User.logIn(this.username, this.password);
      this.$router.push("dashboard");
    }
  }
};
</script>

<style scoped></style>
