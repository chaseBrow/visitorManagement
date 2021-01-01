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
            <v-form ref="form">
                <v-card class="pa-4">
                    <v-card-title>
                        Visitor Information
                        <v-spacer></v-spacer>
                        <div :id="person.id + 'btnEdit'">
                            <v-btn class="accent" v-on:click="editBtn()" 
                                :disabled="ctr"
                            >
                                Edit
                            </v-btn>
                        </div>
                        <div :id="person.id + 'btnSave'" style="display: none">
                            <v-btn class="success mr-3" v-on:click="saveBtn()"> 
                                Save
                            </v-btn>
                        </div>
                        <div :id="person.id + 'btnCancel'" style="display: none">
                            <v-btn class="mr-3" elevation="0" color="info" outlined v-on:click="cancelBtn()">
                                Cancel
                            </v-btn>
                        </div>
                        <div :id="person.id + 'btnDelete'" style="display: none">
                            <v-btn class="warning" v-on:click="deleteBtn()">
                                Delete
                            </v-btn>
                        </div>
                    </v-card-title>
                    
                    <v-row>
                        <v-col cols="4">
                            <v-text-field color="accent" v-model="visitor.firstName" label="First Name" 
                                v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" :rules="visitor.firstNameRules"
                                >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-model="visitor.lastName" label="Last Name"
                                v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" :rules="visitor.lastNameRules"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <CompanySelect 
								@update:company="visitor.company = $event"
								v-bind:company.sync="visitor.company"
								v-bind:parent="'moreInfo'"
                                style="display: none"
                                :id="person.id + 'comp'"
							>
                            </CompanySelect>
                            <div  :id="person.id + 'compText'">
                                <v-text-field color="accent" rounded readonly v-model="visitor.company" label="Company">
                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" 
                            label="Email" v-model="visitor.email" :rules="visitor.emailRules">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div :id="person.id + 'accText'">
                                <v-text-field color="accent" rounded readonly v-model="visitor.access" label="Access">
                                </v-text-field>
                            </div>
                            <div style="display: none" :id="person.id + 'acc'">
                                <v-select outlined label="Access" :items="accessOptions" v-model="visitor.access" 
                                    v-on:focus="getOptions()"
                                    :id="person.id + 'accFocus'"
                                    color="accent"
                                >
                                </v-select>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" 
                                label="Phone" :rules="visitor.phoneRules" v-model="visitor.phone">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex justify-space-around">
                        <v-checkbox v-bind="{readonly: !edit}" color="accent" v-model="visitor.maySchedule" label="May Schedule Others">
                        </v-checkbox>
                        <v-checkbox color="accent" v-bind="{readonly: !edit}" v-model="visitor.mayRemote" label="May Request Remote Hands">
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
                    <v-btn class="mr-6 mb-6" color="info" outlined v-on:click="cancelDel()">
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
import CompanySelect from '../components/CompanySelect';
export default {
    props: ['person'],
    data () {
        return {
            delLoading: false,
            dialog: false,
            dialogDel: false,
            visitor: {
                firstName: this.person.get('firstName'),
                firstNameRules: [
                    v => !!v || "First Name is a required field.",
                    v => (/^[a-zA-Z]+$/.test(v)) || "Invalid First Name"
                ],
                lastName: this.person.get('lastName'),
                lastNameRules: [
                    v => !!v || "Last Name is a required field.",
                    v => (/^[a-zA-Z]+$/.test(v)) || "Invalid Last Name."
                ],
                company: this.person.get('company').get('name'),
                email: this.person.get('email'),
                emailRules: [
                    v => !!v || "Email is a required field."
                ],
                access: this.person.get('access'),
                phone: this.person.get('phone'),
                phoneRules: [ 
                    v => (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v)) || !v || "Invalid Phone Number."
                ],
                maySchedule: this.person.get('maySchedule'),
                mayRemote: this.person.get('mayRemote'),
            },
            accessOptions: [],
            edit: false, 
        }
    },
    computed: {
        ctr: function () {
            const curUser = Parse.User.current();
            const comp = this.person.get("company");
            return this.person.get('company').get("name") == "Contractor" && curUser.id != comp.get('parentCompany').id;
        }
    },
    // watch: {
    //     company: function(val) {
    //         if(val) {
    //             const curUser = Parse.User.current();
    //             const comp = this.person.get("company");
    //             if(this.visitor.company == "Contractor" && curUser != comp.get("parent")){
    //                 let edit = document.getElementById(this.person.id + 'btnEdit');
    //                 edit.style.display = 'none';
    //             }
    //         }
    //     }
    // },
    methods: {
        getOptions: function () {
            this.accessOptions = [];
			let user = Parse.User.current();
			this.accessOptions = user.get("options");
        },
        saveBtn: async function () {
            if (this.$refs.form.validate()) {
                this.person.set('firstName', this.visitor.firstName);
                this.person.set('lastName', this.visitor.lastName);
                this.person.set('email', this.visitor.email);
                this.person.set('access', this.visitor.access);
                this.person.set('phone', this.visitor.phone);
                this.person.set('maySchedule', this.visitor.maySchedule);
                this.person.set('mayRemote', this.visitor.mayRemote);

                let Companies = new Parse.Query(Parse.User);
                Companies.equalTo('name', this.visitor.company);
                let comp = await Companies.first()
                this.person.set('company', comp);
                
                await this.person.save();
                this.cancelBtn();
            }
        },
        cancelBtn: function () {
            this.visitor.firstName = this.person.get('firstName');
            this.visitor.lastName = this.person.get('lastName');
            this.visitor.company = this.person.get('company').get('name');
            this.visitor.email = this.person.get('email');
            this.visitor.access = this.person.get('access');
            this.visitor.phone = this.person.get('phone');
            this.visitor.maySchedule = this.person.get('maySchedule');
            this.visitor.mayRemote = this.person.get('mayRemote');

            let comp1, comp2, acc1, acc2, edit, save, cancel, del;

            comp1 = document.getElementById(this.person.id + 'compText');
            comp1.style.display = 'inline';
            comp2 = document.getElementById(this.person.id + "comp");
            comp2.style.display= 'none';

            acc1 = document.getElementById(this.person.id + 'accText');
            acc1.style.display = 'inline';
            acc2 = document.getElementById(this.person.id + "acc");
            acc2.style.display= 'none';

            edit = document.getElementById(this.person.id + 'btnEdit');
            edit.style.display = 'inline';

            save = document.getElementById(this.person.id + 'btnSave');
            save.style.display = 'none';

            cancel = document.getElementById(this.person.id + 'btnCancel');
            cancel.style.display = 'none';

            del = document.getElementById(this.person.id + 'btnDelete');
            del.style.display = 'none';
            this.edit = false;
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
        cancelDel: function () {
            this.dialogDel = false;
        },
        deleteBtn: function () {
            this.dialogDel = true;
        },
        editBtn: function () {
            this.edit = true;
            let comp1, comp2, acc1, acc2, acc3, edit, save, cancel, del;

            comp1 = document.getElementById(this.person.id + 'compText');
            comp1.style.display = 'none';
            comp2 = document.getElementById(this.person.id + "comp");
            comp2.style.display= 'inline';

            acc1 = document.getElementById(this.person.id + 'accText');
            acc1.style.display = 'none';
            acc2 = document.getElementById(this.person.id + "acc");
            acc2.style.display= 'inline';
            acc3 = document.getElementById(this.person.id + 'accFocus');
            acc3.focus();
            acc3.blur();

            edit = document.getElementById(this.person.id + 'btnEdit');
            edit.style.display = 'none';

            save = document.getElementById(this.person.id + 'btnSave');
            save.style.display = 'inline';

            cancel = document.getElementById(this.person.id + 'btnCancel');
            cancel.style.display = 'inline';

            del = document.getElementById(this.person.id + 'btnDelete');
            del.style.display = 'inline';
        },
    },
    components: {
        CompanySelect,
    }
    
}
</script>
<style scoped>
</style>