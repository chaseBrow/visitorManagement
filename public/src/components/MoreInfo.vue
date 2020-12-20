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
                            <v-text-field color="accent" v-model="visitor.firstName" label="First Name" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" v-model="visitor.lastName" label="Last Name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <CompanySelect 
								@update:company="visitor.company = $event"
								v-bind:company.sync="visitor.company"
								v-bind:parent="'moreInfo'"
                                style="display: none"
                                :id="visitor.company"
							>
                            </CompanySelect>
                            <div  :id="visitor.company + 'text'">
                                <v-text-field color="accent" rounded readonly v-model="visitor.company" label="Company">
                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" label="Email" v-model="visitor.email">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <div :id="visitor.access + 'text'">
                                <v-text-field color="accent" rounded readonly v-model="visitor.access" label="Access">
                                </v-text-field>
                            </div>
                            <div style="display: none" :id="visitor.access">
                                <v-select outlined label="Access" :items="options" v-model="visitor.access" 
                                    v-on:focus="getOptions"
                                    :id="visitor.access + 'focus'"
                                    color="accent"
                                >
                                </v-select>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field color="accent" v-bind="{rounded: !edit, readonly: !edit, outlined: edit}" label="Phone" v-model="visitor.phone">
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
import CompanySelect from '../components/CompanySelect';
export default {
    props: ['person'],
    data () {
        return {
            delLoading: false,
            dialog: false,
            dialogDel: false,
            companyFinal: [],
			searchComp: null,
            visitor: {
                firstName: this.person.get('firstName'),
                lastName: this.person.get('lastName'),
                company: this.person.get('company').get('name'),
                email: this.person.get('email'),
                access: this.person.get('access'),
                phone: this.person.get('phone'),
                maySchedule: this.person.get('maySchedule'),
                mayRemote: this.person.get('mayRemote'),
            },
            options: [],
            edit: false,
        }
    },
    methods: {
        getOptions: function () {
            this.accessOptions = [];
			let user = Parse.User.current();
			this.accessOptions = user.get("options");
        },
        saveBtn: async function () {
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
        },
        cancelBtn: function () {
            let comp1, comp2, acc1, acc2, edit, save, cancel, del;

            comp1 = document.getElementById(this.visitor.company + 'text');
            comp1.style.display = 'inline';
            comp2 = document.getElementById(this.visitor.company);
            comp2.style.display= 'none';

            acc1 = document.getElementById(this.visitor.access + 'text');
            acc1.style.display = 'inline';
            acc2 = document.getElementById(this.visitor.access);
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

            comp1 = document.getElementById(this.visitor.company + 'text');
            comp1.style.display = 'none';
            comp2 = document.getElementById(this.visitor.company);
            comp2.style.display= 'inline';
            this.searchComp = this.visitor.company;

            acc1 = document.getElementById(this.visitor.access + 'text');
            acc1.style.display = 'none';
            acc2 = document.getElementById(this.visitor.access);
            acc2.style.display= 'inline';
            acc3 = document.getElementById(this.visitor.access + 'focus');
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
    },
    components: {
        CompanySelect,
    }
    
}
</script>
<style scoped>
</style>