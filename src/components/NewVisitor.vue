<template>
    <v-menu left v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
                <span class="mr-1 white--text">New Vistor</span>
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
                        <v-autocomplete outlined label="Company" color="accent" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="visitor.company"
                        >
                        </v-autocomplete>  
                    </v-col>
                    <v-col cols="6">
                        <v-text-field  label="Email" outlined color="accent" v-model="visitor.email">  
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select label="Access" outlined color="accent" :items="options" v-model="visitor.access" v-on:focus="getOptions">
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
export default {
    data() {
        return {
            options: [],
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
            companyFinal: [],
            searchComp: null,
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
                if (val) {
                    let name = company.get("name").toLowerCase().includes(val.toLowerCase());
				    return name;
                }
                else return false;
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
            location.reload();
        }
    }
}
</script>

<style scoped>

</style>