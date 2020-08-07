<template>
    <v-container class="ma-0 pa-0">
        <v-dialog v-model="dialog" width="80%" class="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="accent">
                    <v-icon dense class="pr-1">mdi-card-account-details-outline</v-icon>
                    <span>Info</span>
                </v-btn>
            </template>
            <v-form>
                <v-card class="pa-4">
                    <v-card-title>
                        Visitor Information
                        <v-spacer></v-spacer>
                        <v-btn class="accent" v-on:click="editBtn()">
                            Edit
                        </v-btn>
                        <v-btn class="success"> 
                            Save
                        </v-btn>
                        <v-btn class="info">
                            Cancel
                        </v-btn>
                        <v-btn class="warning">
                            Delete
                        </v-btn>
                    </v-card-title>
                    
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="user.firstName" label="First Name" v-bind="{rounded: edit, readonly: edit, outlined: !edit}">
                            </v-text-field>
                            <!-- remove rounded and readonly add outlined -->
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-bind="{rounded: edit, readonly: edit, outlined: !edit}" v-model="user.lastName" label="Last Name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div  :id="user.company + 'text'">
                                <v-text-field rounded readonly v-model="user.company" label="Company">
                                </v-text-field>
                            </div>
                            <div :id="user.company" style="display:none">
                                <v-autocomplete v-bind="{outlined: !edit}" label="Company" color="black" cache-items hide-no-data
                                    :items="companyFinal"
                                    :search-input.sync="searchComp"
                                    v-model="user.company"
                                >
							</v-autocomplete>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-bind="{rounded: edit, readonly: edit, outlined: !edit}" label="Email" v-model="user.email">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div :id="user.access + 'text'">
                                <v-text-field rounded readonly v-model="user.access" label="Access">
                                </v-text-field>
                            </div>
                            <div style="display: none" :id="user.access">
                                <v-select outlined label="Access" :items="options" v-model="user.access" 
                                    v-on:focus="getOptions"
                                >
                                </v-select>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-bind="{rounded: edit, readonly: edit, outlined: !edit}" label="Phone" v-model="user.phone">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex justify-space-around">
                        <v-checkbox v-bind="{readonly: edit}" v-model="user.maySchedule" label="May Schedule Others">
                        </v-checkbox>
                        <v-checkbox v-bind="{readonly: edit}" v-model="user.mayRemote" label="May Request Remote Hands">
                        </v-checkbox>
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
                company: null,
                email: null,
                access: null,
                phone: null,
                maySchedule: null,
                mayRemote: null,
            },
            options: [],
            access: null,
            edit: true,
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
        this.user.company = comp.get('name');
        this.user.email = this.person.get('email');
        this.user.access = this.person.get('access');
        this.user.phone = this.person.get('phone');
        this.user.maySchedule = this.person.get('maySchedule');
        this.user.mayRemote = this.person.get('mayRemote');
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
        save: function () {

        },
        cancel: function () {
            console.log(this.dialog);
            this.dialog = false;
        },
        delete: function () {

        },
        editBtn: function () {
            this.edit = false;
            let comp1, comp2, acc1, acc2;
            comp1 = document.getElementById(this.user.company + 'text');
            comp1.style.display = 'none';
            comp2 = document.getElementById(this.user.company);
            comp2.style.display= 'inline';
            acc1 = document.getElementById(this.user.access + 'text');
            acc1.style.display = 'none';
            acc2 = document.getElementById(this.user.access);
            acc2.style.display= 'inline';

        },
    }
    
}
</script>
<style scoped>
</style>