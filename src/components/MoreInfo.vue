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
                            <v-text-field rounded readonly v-model="user.firstName" label="First Name">
                            </v-text-field>
                            <!-- remove rounded and readonly add outlined -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field rounded readonly v-model="user.lastName" label="Last Name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field rounded readonly v-model="user.company" label="Company">
                            </v-text-field>
                            <v-autocomplete outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="user.company"
                                style="visibility: hidden"
							>
							</v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field rounded readonly label="Email" v-model="user.email">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field rounded readonly v-model="user.lastName" label="Access">
                            </v-text-field>
                            <v-select outlined label="Access" :items="options" v-model="user.access" 
                                v-on:focus="getOptions"
                                style="visibility: hidden"
                            >
                            </v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field rounded readonly label="Phone" v-model="user.phone">
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
            user: {
                firstName: null,
                lastName: null,
                company: "test",
                email: null,
                access: null,
                phone: null,
            },
            options: [],
            access: null,
        }
    },
    watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
    },
    beforeMount () {
        let comp = this.person.get('company');
        this.user.firstName = this.person.get('firstName');
        this.user.lastName = this.person.get('lastName');
        //this.user.company = comp.get('name');
        this.user.email = this.person.get('email');
        this.user.access = this.person.get('access');
        this.user.phone = this.person.get('phone');
        console.log(comp)
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