<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
                <span class="mr-1 primary--text">New Vistor</span>
                <v-icon color="white">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-form>
            <v-card class="pa-4">
                <v-row>
                    <v-col cols="6">
                        <v-text-field  label="First Name" outlined color="accent" v-model="visitor.firstName">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Last Name" outlined color="accent" v-model="visitor.lastName">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <CompanySelect @update:company="visitor.company = $event">
                        </CompanySelect>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Email" outlined color="accent" v-model="visitor.email">  
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select label="Access" outlined color="accent" :items="accessOptions" v-model="visitor.access" v-on:focus="getOptions()">
                         </v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Phone" outlined color="accent" v-model="visitor.phone">
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
                lastName: null,
                company: null,
                email: null,
                access: null,
                phone: null,
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
            this.visitor.firstName = null;
            this.visitor.lastName = null;
            this.visitor.company = null;
            this.visitor.email = null;
            this.visitor.access = null;
            this.visitor.phone = null;
            this.visitor.maySchedule = null;
            this.visitor.mayRemote = false;
        },
        saveVisitor: async function () {
            const Visitor = Parse.Object.extend("Visitor");
            let person = new Visitor();

            const compQuery = new Parse.Query(Parse.User);
            console.log("the company we are looking for is " + this.visitor.company);
            compQuery.equalTo("name", this.visitor.company);
            let comp = await compQuery.first();
            console.log("setting company to " + comp);

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
            // location.reload();
        }
    },
    components: {
        CompanySelect
    }
}
</script>

<style scoped>

</style>