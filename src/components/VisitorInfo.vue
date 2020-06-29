<template>
    <!-- <v-menu close-on-content-click="false" close-on-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 primary" v-bind="attrs" v-on="on">
                <span class="mr-1 black--text">New Vistor</span>
                <v-icon color="black">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-card> 
            <v-text-field  label="First Name" outlined color="black">
            </v-text-field>
            <v-text-field  label="Last Name" outlined color="black">
            </v-text-field>    
            <v-text-field  label="Company" outlined color="black"> 
            </v-text-field> 
            <v-text-field  label="Email" outlined color="black">  
            </v-text-field>
            <v-select label="Access" outlined color="black" :items="options">
            </v-select>
        </v-card>





    </v-menu> -->
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu as Popover
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
              <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="menu = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

</template>
<script>
    export default {
        data() {
            return {
                options: [
				    'Data Suite 1',
				    'Escort Required',
				    'Contractor',
                ],
                fav: true,
                menu: false,
                message: false,
                hints: true,

            }
        }
    }
</script>

<style scoped>

</style>