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
                <v-btn v-on:click="clear" text>Clear</v-btn>
                <v-btn v-on:click="saveParse" color="primary">Save</v-btn>
            </v-card-actions>

        </v-card>





    </v-menu>
    

</template>
<script>
import Parse from 'parse'
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
        clear: function () {
            this.firstName = "";
            this.lastName = "";
            this.company = "";
            this.email = "";
            this.access = "";
        },
        saveParse: function () {
            let Visitor = Parse.Object.extend("Visitor");

            let person = new Visitor();

            person.set("firstName", this.firstName);
            person.set("lastName", this.lastName);
            person.set("company", this.company);
            person.set("email", this.email);
            person.set("access", this.access);

            
            person.save().then((person) => {
                console.log('New object created with objectId: ' + person.id);
            }, (error) => {
                console.log('Failed to create new object, with error code: ' + error.message);
            });
            this.clear();
            this.menu = !this.menu;
        }
    }
}
</script>

<style scoped>

</style>