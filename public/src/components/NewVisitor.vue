<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
                <span class="mr-1 primary--text">New Vistor</span>
                <v-icon color="white">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-form ref="form">
            <v-card class="pa-4">
                <v-row>
                    <v-col cols="6">
                        <v-text-field  label="First Name" outlined color="accent" v-model="visitor.firstName"
                            :rules="visitor.firstNameRules"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Last Name" outlined color="accent" v-model="visitor.lastName"
                            :rules="visitor.lastNameRules"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <CompanySelect 
                            @update:company="visitor.company = $event"
                            v-bind:company.sync="visitor.company"
                            v-bind:parent="'newVisitor'"
                        >
                        </CompanySelect>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Email" outlined color="accent" v-model="visitor.email">  
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select label="Access" outlined color="accent" :items="accessOptions" v-model="visitor.access" 
                            v-on:focus="getOptions()" :rules="visitor.accessRules"
                            >
                         </v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="visitor.phoneRules" label="Phone" outlined color="accent" v-model="visitor.phone">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-checkbox color="accent" v-model="visitor.maySchedule" label="May Schedule Others">
                        </v-checkbox>
                    </v-col>
                    <v-col cols="6">
                        <v-checkbox color="accent" v-model="visitor.mayRemote" label="May Request Remote Hands">
                        </v-checkbox>
                    </v-col>
                </v-row>
        
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3" elevation="0" color="info" outlined v-on:click="clear()">
                        Clear
                    </v-btn>
                    <v-btn class="success mr-3" v-on:click="saveVisitor()"> 
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-menu>
</template>
<script>
import Parse from 'parse'
import CompanySelect from '../components/CompanySelect'
export default {
    data() {
        return {
            accessOptions: [],
            visitor: {
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
                company: null,
                companyRules: [
                    val => !!val || "Company is a required field"
                ],
                email: null,
                access: null,
                accessRules: [
                    v => !!v || "Access is a required field."
                ],
                phone: null,
                phoneRules: [ 
                    v => (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v)) || !v || "Invalid Phone Number."
                ],
                maySchedule: null,
                mayRemote: false,
            },
            menu: false,

        }
    },
    methods: {
        getOptions: function () {
            this.accessOptions = [];
            const user = Parse.User.current();
            this.accessOptions = user.get("options");
            console.log(user);
        },
        clear: function () {
            this.$refs.form.reset();
        },
        saveVisitor: async function () {
            if(this.$refs.form.validate() == true) {
                const Visitor = Parse.Object.extend("Visitor");
                let person = new Visitor();

                const compQuery = new Parse.Query(Parse.User);
                compQuery.equalTo("name", this.visitor.company);
                let comp = await compQuery.first();

                person.set("firstName", this.visitor.firstName);
                person.set("lastName", this.visitor.lastName);
                person.set("company", comp);
                person.set("email", this.visitor.email);
                person.set("access", this.visitor.access);
                person.set("phone", this.visitor.phone);
                person.set('maySchedule', this.visitor.maySchedule);
                person.set('mayRemote', this.visitor.mayRemote);

                
                await person.save()
                this.clear();
                this.menu = !this.menu;
            }
        }
    },
    components: {
        CompanySelect
    }
}
</script>

<style scoped>

</style>