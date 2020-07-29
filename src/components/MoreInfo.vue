<template>
    <v-container class="ma-0 pa-0">
        <v-dialog v-model="dialog" width="80%" class="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="primary" v-on:click="getInfo()">
                    <v-icon dense class="pr-1">mdi-card-account-details-outline</v-icon>
                    <span>Info</span>
                </v-btn>
            </template>
            <v-form>
                <v-card class="pa-4">
                    <v-card-title>
                        Visitor Information
                    </v-card-title>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Last Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="company"
							>
							</v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="Email" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Access" outlined>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>
<script>
import Parse from 'parse';
export default {
    props: ['person'],
    data () {
        return {
            dialog: false,
            companyFinal: [],
			searchComp: null,
			company: '',
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
        getInfo: async function () {
            this.dialog = true;
        },
        cancel: function () {
            console.log(this.dialog);
            this.dialog = false;
        }

    }
    
}
</script>
<style scoped>

</style>