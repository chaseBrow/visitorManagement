<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
                <span class="mr-1 primary--text">New Guest</span>
                <v-icon color="white">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-form>
            <v-card class="pa-4">
                <v-row>
                    <v-col cols="12">
                        <v-text-field  label="First Name" outlined color="accent" v-model="guest.firstName">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field  label="Last Name" outlined color="accent" v-model="guest.lastName">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3" elevation="0" color="info" outlined v-on:click="cancel()">
                        Cancel
                    </v-btn>
                    <v-btn class="success mr-3" v-on:click="submitGuest()"> 
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-menu>
</template>
<script>
import Parse from 'parse'
// import NewRecord from './NewRecord'
export default {
    // components: {
    //     NewRecord
    // },
    data() {
        return {
            guest: {
                firstName: null,
                lastName: null,
                company: null,
                access: null,
            },
            menu: false,

        }
    },
    
    methods: {
        cancel: function () {
            this.guest.firstName = null;
            this.guest.lastName = null;
            this.guest.company = null;
            this.guest.access = null;
        },
        saveGuest: async function () {
            const Visitor = Parse.Object.extend("Visitor");
            let person = new Visitor();

            const compQuery = new Parse.Query(Parse.User);
            console.log("the company we are looking for is " + this.guest.company);
            compQuery.equalTo("name", this.guest.company);
            let comp = await compQuery.first();
            console.log("setting company to " + comp);

            person.set("firstName", this.guest.firstName);
            person.set("lastName", this.guest.lastName);
            person.set("company", comp);
            person.set("access", this.guest.access);
            
            await person.save()
            this.clear();
            this.menu = !this.menu;
            // location.reload();
        }
    }
}
</script>

<style scoped>

</style>