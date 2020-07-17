<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 primary" v-bind="attrs" v-on="on">
                <span class="mr-1 black--text">New Vistor</span>
                <v-icon color="black">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-form>
            <v-card class="secondary pa-4"> 
                <v-text-field  label="First Name" outlined color="black" v-model="firstName">
                </v-text-field>
                <v-text-field  label="Last Name" outlined color="black" v-model="lastName">
                </v-text-field>
                <v-autocomplete outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="company"
				>
				</v-autocomplete>    
                <v-text-field  label="Email" outlined color="black" v-model="email">  
                </v-text-field>
                <v-select label="Access" outlined color="black" :items="options" v-model="access" v-on:focus="getOptions">
                </v-select>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-on:click="clear" text>Clear</v-btn>
                    <v-btn v-on:click="saveVisitor" color="primary">Save</v-btn>
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
            options: [],
            firstName: null,
            lastName: null,
            companyFinal: [],
            searchComp: null,
            company: null,
            email: null,
            access: null,
            menu: false,

        }
    },
    watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
	},
    methods: {
        searchCompanies: async function (val) {
			const user = Parse.User.current();
			const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

            let companyList = await Users.find();
            companyList.push(user);
			
			let test = companyList.filter(company => {
				let name = company.get("name").toLowerCase().includes(val.toLowerCase());
				return name;
			});
			this.companyFinal = [];
			test.forEach( e =>{
				this.companyFinal.push(e.get("name"));
			})
		},
        getOptions: function () {
            const user = Parse.User.current();
            this.options = user.get("options");
        },
        clear: function () {
            this.firstName = null;
            this.lastName = null;
            this.company = null;
            this.email = null;
            this.access = null;
            this.clientID = null;
        },
        saveVisitor: function () {
            const Visitor = Parse.Object.extend("Visitor");

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