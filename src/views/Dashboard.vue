<template>
	<v-container fluid fill-height background>
		<v-row class="mx-4" style="height: 100%">
			<v-form style="border-radius: 10px 10px 0px 0px; height: auto; width: 100%" class="primary">
				<v-container class="align-start">	
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
							<v-text-field  label="Company" outlined color="black"
								v-model="filterTerms.company"
								v-on:input="filter"
							>
							</v-text-field>
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
						<v-col cols="2">
							<v-btn x-large>
								<span> Today's Visitor </span>
								<v-icon class="pl-2">mdi-magnify</v-icon>
							</v-btn>
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
					</v-toolbar>
				<v-list dense>
					<v-list-item v-for="person in filteredPeople" :key="person.email">

						<input type="text" style="width: 10%" readonly :value="person.get('firstName')" :id="person.get('email') + person.get('firstName')">
						<input type="text" style="width: 10%" readonly :value="person.get('lastName')" :id="person.get('email') + person.get('lastName')">
						<input type="text" style="width: 10%" readonly :value="person.get('company')" :id="person.get('email') + person.get('company')">
						<input type="text" style="width: 25%" readonly :value="person.get('email')" :id="person.get('email')">
						<input type="text" style="width: 10%" readonly :value="person.get('access')" :id="person.get('email') + person.get('access')">
						<v-spacer></v-spacer>

						<NewRecord v-bind:person="person" :v-if="hideVisit(person)">
						</NewRecord> 
						<v-btn class="primary" :id="person.get('email') + 'edit'" v-on:click="editVisitor(person)">
							<span>Edit</span>
							<v-icon dense class="pl-1">mdi-pencil</v-icon>
						</v-btn>
						<v-btn class="green" fab small :id="person.get('email') + 'save'" v-on:click="save(this)" hidden>
							<v-icon dense>mdi-content-save</v-icon>
						</v-btn>
						<v-btn class="grey mx-1" fab small :id="person.get('email') + 'cancel'" v-on:click="cancel(this)" hidden>
							<v-icon dense>mdi-cancel</v-icon>
						</v-btn>
						<v-btn class="red" :id="person.get('email') + 'delete'" v-on:click="cancel(this)" hidden>
							<span>Delete</span>
							<v-icon dense class="pl-1">mdi-delete-forever</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>

	</v-container>
</template>

<script>
import Parse from "parse"
import NewRecord from "../components/NewRecord"
export default {
	data() {
		return {
			clientID: "upZS6tm7Pw",
			filterTerms: {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				access: '',
			},
			options: [],
			filteredPeople: [
				
			],
		}
	},
	computed: {
		hideVisit: function (person) {
			let id = document.getElementById(person.get("email") + "edit");
			// if ( === "none") {
			// 	return false
			// }
			console.log(id.hasAttribute("hidden"));
			return true;
		},
	},
	methods: {
		
		save: function () {

		},
		cancel: function () {

		},
		editVisitor: function (person) {
			
			let edit = document.getElementById(person.get("email") + "edit");
			edit.setAttribute("hidden", true);

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
			const Options = Parse.Object.extend("Client");
			const queryOptions = new Parse.Query(Options);

			queryOptions.equalTo("objectId", this.clientID);
			const client = await queryOptions.first();
			this.options = client.get("options");
		},

		filter: function () {
			const Visitors = Parse.Object.extend("Visitor");
			const queryVisitor = new Parse.Query(Visitors);

			// console.log(this.clientID);
			// queryVisitor.equalTo("client", this.clientID);
			queryVisitor.limit(20);
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