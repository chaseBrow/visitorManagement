<template>
	<v-container fluid fill-height background>
		<v-row class="mx-4" style="height: 100%">
			<v-form style="border-radius: 10px 10px 0px 0px; height: auto; width: 100%" class="primary">
				<v-container>	
					<v-row class="align-start">
						<v-col cols="2">
							<v-text-field  label="First Name" outlined color="black" 
								v-model="filterTerms.firstName"
								v-on:input="filter"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2">
							<v-text-field  label="Last Name" outlined color="black" 
								v-model="filterTerms.lastName"
								v-on:input="filter"
							>
							</v-text-field>
						</v-col>
						<v-col cols="3">
							<!-- <v-text-field  label="Company" outlined color="black"
								v-model="filterTerms.company"
								v-on:input="filter"
							>
							</v-text-field> -->

							<v-autocomplete outlined label="Company" color="black" cache-items
								:loading="loading"
								:items="companyFinal"
      							:search-input.sync="filterTerms.company"
							>
							</v-autocomplete>

						</v-col>
						<v-col cols="3">
							<v-text-field label="Email" outlined color="black"
								v-model="filterTerms.email"
								v-on:input="filter"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2">
							 <v-select label="Access" outlined color="black" :items="options"
								v-model="filterTerms.access"
								v-on:focus="getOptions"
								v-on:change="filter"
							>
							</v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-form>


			<v-col cols="12" class="secondary" style="border-radius: 0px 0px 10px 10px; height: auto">
				<v-toolbar class="primary">
						<span style="width: 10%">First Name</span>
						<span style="width: 10%">Last Name</span>
						<span style="width: 10%">Company</span>
						<span style="width: 25%">Email</span>
						<span style="width: 10%">Access</span>
						<v-spacer></v-spacer>
						<v-btn class="secondary black--text" v-on:click="recentVisitors()"> 
							Recent Visitors
						</v-btn>
					</v-toolbar>
				<v-list dense>
					<v-list-item v-for="person in filteredPeople" :key="person.email">

						<input type="text" style="width: 10%" readonly :value="person.get('firstName')" :id="person.get('email') + person.get('firstName')">
						<input type="text" style="width: 10%" readonly :value="person.get('lastName')" :id="person.get('email') + person.get('lastName')">
						<input type="text" style="width: 10%" readonly :value="person.get('company')" :id="person.get('email') + person.get('company')">
						<input type="text" style="width: 25%" readonly :value="person.get('email')" :id="person.get('email')">
						<input type="text" style="width: 10%" readonly :value="person.get('access')" :id="person.get('email') + person.get('access')">
						<v-spacer></v-spacer>
						<div :id="person.get('email') + 'visit'">
							<NewRecord v-bind:person="person">
							</NewRecord> 
						</div>
						<v-btn class="primary" :id="person.get('email') + 'edit'" v-on:click="editVisitor(person)">
							<span>Edit</span>
							<v-icon dense class="pl-1">mdi-pencil</v-icon>
						</v-btn>
						<v-btn class="green" fab small :id="person.get('email') + 'save'" v-on:click="save(person)" hidden>
							<v-icon dense>mdi-content-save</v-icon>
						</v-btn>
						<v-btn class="grey mx-1" fab small :id="person.get('email') + 'cancel'" v-on:click="cancel(person)" hidden>
							<v-icon dense>mdi-cancel</v-icon>
						</v-btn>
						<v-btn class="red" :id="person.get('email') + 'delete'" v-on:click="delStart(person)" hidden>
							<span>Delete</span>
							<v-icon dense class="pl-1">mdi-delete-forever</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
		<v-dialog v-model="confirmDelete">
			<v-card>
				<v-card-title>Confirm Delete</v-card-title>
				<v-card-text>The visitor and their records will remain on the database, but no longer will appear in visitor searches </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="grey" v-on:click="confirmDelete = !confirmDelete">
						Cancel
					</v-btn>
					<v-btn color="red" v-on:click="del()">
						Delete
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import Parse from "parse"
import NewRecord from "../components/NewRecord"
export default {
	data() {
		return {
			loading: false,
			person: null,
			confirmDelete: false,
			filterTerms: {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				access: '',
			},
			options: [],
			filteredPeople: [],
			companylist: [],
			companyFinal: [],
			searchComp: null,
		}
	},
	watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
	},
	methods: {
		searchCompanies: async function (val) {
			this.loading = true;
			const user = Parse.User.current();
			const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			Users.find().then((companies) => {
				this.companylist = companies.filter((company) => {
					return company.get("name").toLowerCase().includes(val.toLowerCase());
				});
			},
			(error) =>	{ 
				console.log("there was an error:" + error.message)
			});
			
			this.companylist.forEach(company => {
				this.companyFinal.push(company.get("name"));
			});
			this.loading = false;
			console.log(this.companylist);
		},
		recentVisitors: async function () {
			this.filteredPeople = null;

			const Record = Parse.Object.extend("Record");
			const recQuery = new Parse.Query(Record);
			recQuery.greaterThan("arrive", this.getDate());
			recQuery.include(["Visitor.firstName"]);
			
			let test = await recQuery.find();
			console.log(test[0]);
			
		},
		getDate: function () {
			let date = new Date();
			let yesterday = date.setTime(date.getTime() - 86400000);
			return new Date(yesterday);
		},
		save: async function (person) {
			this.cancel(person);

			person.set("firstName", document.getElementById(person.get('email') + person.get('firstName')).value);
			person.set("lastName", document.getElementById(person.get('email') + person.get('lastName')).value);
			person.set("company", document.getElementById(person.get('email') + person.get('company')).value);
			person.set("email", document.getElementById(person.get('email')).value);
			person.set("access", document.getElementById(person.get('email') + person.get('access')).value);
			
			await person.save();

			this.filter();
		},
		cancel: function (person) {
			let edit = document.getElementById(person.get("email") + "edit");
			edit.removeAttribute("hidden");

			let visit = document.getElementById(person.get("email") + "visit");
			visit.removeAttribute("hidden");

			let del = document.getElementById(person.get("email") + "delete");
			del.setAttribute("hidden", true);

			let can = document.getElementById(person.get("email") + "cancel");
			can.setAttribute("hidden", true);

			let save = document.getElementById(person.get("email") + "save");
			save.setAttribute("hidden", true);
			
			let firstName = document.getElementById(person.get("email") + person.get("firstName"));
			firstName.setAttribute("readonly", true);
			firstName.style.outline = null;
			firstName.style.paddingLeft = null;
			firstName.style.marginRight = null;

			let lastName = document.getElementById(person.get("email") + person.get("lastName"));
			lastName.setAttribute("readonly", true);
			lastName.style.outline = null;
			lastName.style.paddingLeft = null;
			lastName.style.marginRight = null;

			let company = document.getElementById(person.get("email") + person.get("company"));
			company.setAttribute("readonly", true);
			company.style.outline = null;
			company.style.paddingLeft = null;
			company.style.marginRight = null;

			let email = document.getElementById(person.get("email"));
			email.setAttribute("readonly", true);
			email.style.outline = null;
			email.style.paddingLeft = null;
			email.style.marginRight = null;

			let access = document.getElementById(person.get("email") + person.get("access"));
			access.setAttribute("readonly", true);
			access.style.outline = null;
			access.style.paddingLeft = null;
			access.style.marginRight = null;
		},
		del: function () {
			this.person.set("deleted", true);
			this.person.save();
			this.confirmDelete = !this.confirmDelete;
		},
		delStart: function (person) {
			this.person = person;
			this.confirmDelete = !this.confirmDelete;
		},
		editVisitor: function (person) {
			
			let edit = document.getElementById(person.get("email") + "edit");
			edit.setAttribute("hidden", true);

			let visit = document.getElementById(person.get("email") + "visit");
			visit.setAttribute("hidden", true);

			let del = document.getElementById(person.get("email") + "delete");
			del.removeAttribute("hidden");

			let can = document.getElementById(person.get("email") + "cancel");
			can.removeAttribute("hidden");

			let save = document.getElementById(person.get("email") + "save");
			save.removeAttribute("hidden");
			
			let firstName = document.getElementById(person.get("email") + person.get("firstName"));
			firstName.removeAttribute("readonly");
			firstName.style.outline = "thin solid black";
			firstName.style.paddingLeft = "2px";
			firstName.style.marginRight = "8px";

			let lastName = document.getElementById(person.get("email") + person.get("lastName"));
			lastName.removeAttribute("readonly");
			lastName.style.outline = "thin solid black";
			lastName.style.paddingLeft = "2px";
			lastName.style.marginRight = "8px";

			let company = document.getElementById(person.get("email") + person.get("company"));
			company.removeAttribute("readonly");
			company.style.outline = "thin solid black";
			company.style.paddingLeft = "2px";
			company.style.marginRight = "8px";

			let email = document.getElementById(person.get("email"));
			email.removeAttribute("readonly");
			email.style.outline = "thin solid black";
			email.style.paddingLeft = "2px";
			email.style.marginRight = "8px";

			let access = document.getElementById(person.get("email") + person.get("access"));
			access.removeAttribute("readonly");
			access.style.outline = "thin solid black";
			access.style.paddingLeft = "2px";
			access.style.marginRight = "8px";
		},
		getOptions: async function () {
			let opt = await process.env.VUE_APP_ACCESS_OPTIONS;
			this.options = opt.split(',');
		},
		filter: function () {
			const Visitors = Parse.Object.extend("Visitor");
			const queryVisitor = new Parse.Query(Visitors);

			queryVisitor.limit(20);
			queryVisitor.notEqualTo("deleted", true);
			queryVisitor.find().then((visitors) => {
				this.filteredPeople = visitors.filter(this.filterPeople);
			},
			(error) =>	{ 
				console.log("there was an error:" + error.message)
			});
		},

		filterPeople: function (visitor) {
			let first = visitor.get("firstName").toLowerCase().includes(this.filterTerms.firstName.toLowerCase());
			let last = visitor.get("lastName").toLowerCase().includes(this.filterTerms.lastName.toLowerCase());
			let company = visitor.get("company").toLowerCase().includes(this.filterTerms.company.toLowerCase());
			let email = visitor.get("email").toLowerCase().includes(this.filterTerms.email.toLowerCase());
			let access = visitor.get("access").toLowerCase().includes(this.filterTerms.access.toLowerCase());
			if (first == true && last == true && company == true && email == true && access == true) {
				return true;
			}
			else {
				return false;
			}
		},
	},
	components: {
		NewRecord
	}
}
</script>

<style scoped>

.v-list-item:hover {
	background:lightgray;
}

.v-list {
  border-radius: 0px;
  overflow-y: auto;
  height: 450px;
}

textarea:focus, input:focus{
    outline: none;
}
</style>