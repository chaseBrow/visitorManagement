<template>
    <v-container class="ma-0 pa-0">
        <v-dialog v-bind="{persistent: edit}" v-model="dialog" width="80%" class="primary"
            @click:outside="$emit('reload')"
        >
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
                        <div id="edit">
                            <v-btn class="accent" v-on:click="editBtn()">
                                Edit
                            </v-btn>
                        </div>
                        <div id="save" style="display: none">
                            <v-btn class="success mr-3" v-on:click="saveBtn()"> 
                                Save
                            </v-btn>
                        </div>
                        <div id="cancel" style="display: none">
                            <v-btn class="mr-3" elevation="0" color="info" outlined v-on:click="cancelBtn()">
                                Cancel
                            </v-btn>
                        </div>
                        <div id="delete" style="display: none">
                            <v-btn class="warning" v-on:click="deleteBtn()">
                                Delete
                            </v-btn>
                        </div>
                    </v-card-title>
                    
                    <v-row>
                        <v-col cols="4">
                            <v-text-field color="accent" v-model="user.firstName" label="First Name" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" v-model="user.lastName" label="Last Name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div  :id="user.company + 'text'">
                                <v-text-field color="accent" rounded readonly v-model="user.company" label="Company">
                                </v-text-field>
                            </div>
                            <div :id="user.company" style="display:none">
                                <v-autocomplete v-bind="{outlined: edit}" label="Company" color="accent" cache-items hide-no-data
                                    :items="companyFinal"
                                    :search-input.sync="searchComp"
                                    v-model="user.company"
                                    :id="user.company + 'focus'"

                                >
							</v-autocomplete>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" label="Email" v-model="user.email">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div :id="user.access + 'text'">
                                <v-text-field color="accent" rounded readonly v-model="user.access" label="Access">
                                </v-text-field>
                            </div>
                            <div style="display: none" :id="user.access">
                                <v-select outlined label="Access" :items="options" v-model="user.access" 
                                    v-on:focus="getOptions"
                                    :id="user.access + 'focus'"
                                    color="accent"
                                >
                                </v-select>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" label="Phone" v-model="user.phone">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex justify-space-around">
                        <v-checkbox v-bind="{readonly: !edit}" color="accent" v-model="user.maySchedule" label="May Schedule Others">
                        </v-checkbox>
                        <v-checkbox color="accent" v-bind="{readonly: !edit}" v-model="user.mayRemote" label="May Request Remote Hands">
                        </v-checkbox>
                    </v-row>
                </v-card>
            </v-form>
        </v-dialog>
        <v-dialog width="400px" v-model="dialogDel">
            <v-card>
                <v-card-title>
                    Confirm Delete 
                </v-card-title>
                <v-card-text>
                    You will no longer be able to add visit records for this visitor.  All previous visits will still be avaliable on the Visit History tab.
                </v-card-text>
                <div class="d-flex justify-center">
                    <v-btn class="mr-6 mb-6" color="info" outlined>
                        Cancel
                    </v-btn>
                    <v-btn class="warning mb-6" v-on:click="confirmDel()" v-bind="{loading: delLoading}">
                        Delete
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Parse from 'parse';
export default {
    props: ['person'],
    data () {
        return {
            delLoading: false,
            dialog: false,
            dialogDel: false,
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
            edit: false,
        }
    },
    watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
    },
    beforeMount () {
        this.reset();
    },
    methods: {
        reset: function () {
            let comp = this.person.get('company');
            this.user.firstName = this.person.get('firstName');
            this.user.lastName = this.person.get('lastName');
            this.user.company = comp.get('name');
            this.user.email = this.person.get('email');
            this.user.access = this.person.get('access');
            this.user.phone = this.person.get('phone');
            this.user.maySchedule = this.person.get('maySchedule');
            this.user.mayRemote = this.person.get('mayRemote');
            this.edit = false;
            
            const curUser = Parse.User.current();
            if(this.user.company == "Contractor" && curUser != comp.get("parent")){
                let edit = document.getElementById('edit');
                edit.style.display = 'none';
            }


        },
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
        saveBtn: async function () {
            this.person.set('firstName', this.user.firstName);
            this.person.set('lastName', this.user.lastName);
            this.person.set('email', this.user.email);
            this.person.set('access', this.user.access);
            this.person.set('phone', this.user.phone);
            this.person.set('maySchedule', this.user.maySchedule);
            this.person.set('mayRemote', this.user.mayRemote);

            let Companies = new Parse.Query(Parse.User);
            Companies.equalTo('name', this.user.company);
            let comp = await Companies.first()
            this.person.set('company', comp);
            
            
            await this.person.save();
            this.cancelBtn();
        },
        cancelBtn: function () {
            let comp1, comp2, acc1, acc2, edit, save, cancel, del;

            comp1 = document.getElementById(this.user.company + 'text');
            comp1.style.display = 'inline';
            comp2 = document.getElementById(this.user.company);
            comp2.style.display= 'none';

            acc1 = document.getElementById(this.user.access + 'text');
            acc1.style.display = 'inline';
            acc2 = document.getElementById(this.user.access);
            acc2.style.display= 'none';

            edit = document.getElementById('edit');
            edit.style.display = 'inline';

            save = document.getElementById('save');
            save.style.display = 'none';

            cancel = document.getElementById('cancel');
            cancel.style.display = 'none';

            del = document.getElementById('delete');
            del.style.display = 'none';
            this.reset();
        },
        confirmDel: async function () {
            this.person.set('deleted', true);
            this.delLoading = true;
            this.person.save().then(() => {
                this.delLoading = false;
            });
            this.dialogDel = false;
            this.cancelBtn();
            this.dialog = false;
            this.$emit('reload');
        },
        deleteBtn: function () {
            this.dialogDel = true;
        },
        editBtn: function () {
            this.edit = true;
            let comp1, comp2, acc1, acc2, acc3, edit, save, cancel, del;

            comp1 = document.getElementById(this.user.company + 'text');
            comp1.style.display = 'none';
            comp2 = document.getElementById(this.user.company);
            comp2.style.display= 'inline';
            this.searchComp = this.user.company;

            acc1 = document.getElementById(this.user.access + 'text');
            acc1.style.display = 'none';
            acc2 = document.getElementById(this.user.access);
            acc2.style.display= 'inline';
            acc3 = document.getElementById(this.user.access + 'focus');
            acc3.focus();
            acc3.blur();

            edit = document.getElementById('edit');
            edit.style.display = 'none';

            save = document.getElementById('save');
            save.style.display = 'inline';

            cancel = document.getElementById('cancel');
            cancel.style.display = 'inline';

            del = document.getElementById('delete');
            del.style.display = 'inline';
        },
    }
    
}
</script>
<style scoped>
</style>