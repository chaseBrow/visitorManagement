<template>
    <v-menu left v-model="menu" :close-on-content-click="false" >
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
                <span class="mr-1 primary--text">New Guest</span>
                <v-icon color="white">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-form ref="form">
            <v-card class="pa-4">
                <v-row>
                    <v-col>
                        <v-text-field  label="First Name" outlined color="accent" v-model="guest.firstName"
                            :rules="guest.firstNameRules">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field  label="Last Name" outlined color="accent" v-model="guest.lastName"
                            :rules="guest.lastNameRules">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select outlined color="accent" label="Status" 
                            :items="['Arrived', 'Expected']" v-model="status">
                        </v-select>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3" elevation="0" color="info" outlined v-on:click="clear()">
                        Clear
                    </v-btn>
                    <v-btn class="success mr-3" v-on:click="saveGuest()"> 
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-menu>
</template>
<script>
import Parse from 'parse'
export default {
    data() {
        return {
            guest: {
                firstName: null,
                firstNameRules: [
                    v => !!v || "First Name is a required field.",
                    v => (/^[a-zA-Z]+$/.test(v)) || "Invalid First Name"
                ],
                lastName: null,
                lastNameRules: [
                    v => !!v || "Last Name is a required field.",
                    v => (/^[a-zA-Z]+$/.test(v)) || "Invalid Last Name."
                ],
            },
            status: null,
            menu: false,
            record: null

        }
    },
    
    methods: {
        clear: function () {
            this.$refs.form.reset();
        },
        saveGuest: async function () {
            if(this.$refs.form.validate() == true) {
                const Visitor = Parse.Object.extend("Visitor");
                let person = new Visitor();

                let comp = Parse.User.current();

                person.set("firstName", this.guest.firstName);
                person.set("lastName", this.guest.lastName);
                person.set("company", comp);
                person.set("access", "Guest");
                await person.save();
                this.clear();
                this.menu = !this.menu;


                const Record = new Parse.Object.extend('Record');
                this.record = new Record();
                this.record.set("visitor", person);
                this.record.set("status", this.status);
                if(this.status == "Arrived") {
                    this.record.set("arrive", this.getDate());
                }
                
                await this.record.save();
            }
        },
        getDate: function () {
            let today = new Date();
            return today;
        }
    }
}
</script>

<style scoped>

</style>