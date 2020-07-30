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
                            <v-text-field readonly lass="visitor" label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field readonly class="visitor" label="Last Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete readonly outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="company"
							>
							</v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field readonly label="Email" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-select readonly label="Access" outlined :items="options" v-model="access" v-on:focus="getOptions">
                            </v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field readonly label="Phone" outlined>
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
            options: [],
            access: null,
        }
    },
    watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
	},
    methods: {
        getOptions: function () {
            const user = Parse.User.current();
            this.options = user.get("options");
        },
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
            let fields = [];
            fields = await document.getElementsByClassName('visitor');
            
            for (let field of fields) {
                console.log(field);
            }
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