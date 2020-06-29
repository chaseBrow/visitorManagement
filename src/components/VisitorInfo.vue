<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 primary" v-bind="attrs" v-on="on">
                <span class="mr-1 black--text">New Vistor</span>
                <v-icon color="black">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-card class="secondary pa-4"> 
            <v-text-field  label="First Name" outlined color="black" v-model="firstName">
            </v-text-field>
            <v-text-field  label="Last Name" outlined color="black" v-model="lastName">
            </v-text-field>    
            <v-text-field  label="Company" outlined color="black" v-model="company"> 
            </v-text-field> 
            <v-text-field  label="Email" outlined color="black" v-model="email">  
            </v-text-field>
            <v-select label="Access" outlined color="black" :items="options" v-model="access">
            </v-select>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="cancel" text>Clear</v-btn>
                <v-btn v-on:click="save" color="primary">Save</v-btn>
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
                firstName: "",
                lastName: "",
                company: "",
                email: "",
                access: "",
                menu: false,

            }
        },
        methods: {
            cancel: function () {
                this.firstName = "";
                this.lastName = "";
                this.company = "";
                this.email = "";
                this.access = "";
            },
            save: function () {
                var person = {
                    first: this.firstName,
                    last: this.lastName,
                    company: this.company,
                    email: this.email,
                    access: this. access
                }
                this.people.push(person)
            }
        }
    }
</script>

<style scoped>

</style>