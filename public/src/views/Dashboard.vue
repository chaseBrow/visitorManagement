<!-- 
	Author: Chase Brown & Chad Brown
	Created On: 07/26/2020
	Updated By: Chad Brown & Chase Brown
	Updated On: 08/17/2020
	Description: This where the user can edit child clients and manage access options aswell as change personal info.
-->
<template>
	<v-container fluid fill-height background>
		<v-row class="mx-4" style="height: fit-content">
			<v-form class="primary form">
				<v-container>	
					<v-row class="align-start">
						<v-col cols="2" class="pb-0">
							<v-text-field label="First Name" outlined color="accent"
								v-model="filterTerms.firstName"
								v-on:input="filterPeople()"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2" class="pb-0" >
							<v-text-field  label="Last Name" outlined color="accent"
								v-model="filterTerms.lastName"
								v-on:input="filterPeople()"
							>
							</v-text-field>
						</v-col>
						<v-col cols="3" class="pb-0">
							<CompanySelect 
								@update:company="filterTerms.company = $event, filterPeople()"
								v-bind:company.sync="filterTerms.company"
							>
							</CompanySelect>
						</v-col>
						<v-col cols="3" class="pb-0">
							<v-text-field label="Email" outlined color="accent"
								v-model="filterTerms.email"
								v-on:input="filterPeople()"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2" class="pb-0">
							<v-select label="Access" outlined color="accent" :items="accessOptions" v-model="filterTerms.access" 
								v-on:focus="getOptions()" v-on:change="filterPeople()"
							>
							</v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-form>


			<v-col cols="12" class="primary" style="border-radius: 0px 0px 10px 10px; height: fit-content">
				<v-toolbar class="secondary">
					<span class="primary--text" style="width: 10%;">First Name</span>
					<span class="primary--text" style="width: 10%">Last Name</span>
					<span class="primary--text" style="width: 10%">Company</span>
					<span class="primary--text" style="width: 25%">Email</span>
					<span class="primary--text" style="width: 10%">Access</span>
					<v-spacer></v-spacer>
					<v-btn class="accent primary--text" v-on:click="recentVisitors()"> 
						Recent Visitors
					</v-btn>
				</v-toolbar>

				<v-list dense class="data secondary">
					<v-list-item v-for="person in filteredPeople" :key="person.email">
						<span class="primary--text" style="width: 10%">{{ person.get('firstName') }}</span>
                    	<span class="primary--text" style="width: 10%">{{ person.get('lastName') }}</span>
                        <span class="primary--text" style="width: 10%; font-size: 0.95rem">{{ getCompanyName(person) }}</span>
						<span class="primary--text" style="width: 25%; font-size: 0.9rem">{{ person.get('email') }}</span>
                        <span class="primary--text" style="width: 10%; font-size: 0.9rem">{{ person.get('access') }}</span>
                        
						<v-spacer></v-spacer>
						<div :id="person.get('email') + 'visit'" :key="person.get('email') + 'visit'">
							<NewRecord v-bind:person="person">
							</NewRecord> 
						</div>
						<div :id="person.get('email') + 'info'" :key="person.get('email') + 'info'" class="pa-0">
							<MoreInfo v-bind:person="person"> 
							</MoreInfo>
						</div>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Parse from "parse"
import NewRecord from "../components/NewRecord"
import MoreInfo from "../components/MoreInfo"
import CompanySelect from "../components/CompanySelect"
export default {
	data() {
		return {
			recVisitors: null,
			filteredPeople: [],
			visitors: [],
			filterTerms: {
				firstName: '',
				lastName: '',
				email: '',
				access: '',
				company: '',
			},
			accessOptions: [],
		}
	},
	async created(){
		const Visitors = Parse.Object.extend("Visitor");
		const queryVisitor = new Parse.Query(Visitors);

		let liveVisitor = await queryVisitor.subscribe();

		liveVisitor.on('open', () => {
			console.log('open visitors made');
			this.updateMade();
		});

		liveVisitor.on('delete', () => {
			this.updateMade();
		});

		liveVisitor.on('create', () => {
			this.updateMade();
		});

		liveVisitor.on('update', () => {
			this.updateMade();
		});
    },
	methods: {
		getCompanyName: function (person) {
			let comp = person.get("company");
			let name = comp.get("name");
			return name;
		},
		recentVisitors: async function () {
			this.filterTerms.firstName = '';
			this.filterTerms.lastName = '';
			this.filterTerms.email = '';
			this.filterTerms.access = '';
			this.filterTerms.company = '';

			const Record = Parse.Object.extend("Record");
			const recentQuery = new Parse.Query(Record).greaterThan("depart", this.getYesterday());
			
			const statusQuery = new Parse.Query(Record).notEqualTo("status", "Departed");

			const mainQuery = Parse.Query.or(recentQuery, statusQuery);

			mainQuery.descending("createdAt");
			mainQuery.include("visitor");
			
			let vis = await mainQuery.find();
			let test = vis.map(item => {
				return item.get("visitor");
			});
			let ids = test.map(item => {
				return item.id;
			});
			ids = new Set(ids);
			ids = [...ids];
			this.filteredPeople = test.filter((item) => {
				let index = ids.indexOf(item.id);
				if (index !== -1) {
					ids.splice(index, 1);
					return true;
				}
				else return false;
			});
		},
		getYesterday: function () {
			let date = new Date();
			let yesterday = date.setTime(date.getTime() - 86400000);
			return new Date(yesterday);
		},
		getOptions: async function () {
			this.accessOptions = [];
			let user = Parse.User.current();
			this.accessOptions = user.get("options");
		},
		updateMade: async function () {
			let children = []

			const user = Parse.User.current();

			const contractor = new Parse.Query(Parse.User);
			contractor.equalTo('name', 'Contractor');

			const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			const mainQuery = Parse.Query.or(Users, contractor);

			children = await mainQuery.find();
			children.push(user);

			const Visitors = Parse.Object.extend("Visitor");
			const queryVisitor = new Parse.Query(Visitors);

			queryVisitor.notEqualTo("deleted", true);
			queryVisitor.include(["company.name"]);
			queryVisitor.containedIn('company', children);
			this.visitors = await queryVisitor.find();
			this.filterPeople();
		},
		filterPeople: function () {
			this.filteredPeople = this.visitors.filter((visitor) => {
				let first = true, last = true,comp = true, email = true, access = true;
				if (visitor.get("firstName") && this.filterTerms.firstName) {
					first = visitor.get("firstName").toLowerCase().includes(this.filterTerms.firstName.toLowerCase());
				}
				if (visitor.get("lastName") && this.filterTerms.lastName) {
					last = visitor.get("lastName").toLowerCase().includes(this.filterTerms.lastName.toLowerCase());
				}
				let val = visitor.get("company");
				if (this.filterTerms.company) {
					comp = val.get("name").includes(this.filterTerms.company);
				}
				if (visitor.get("email") && this.filterTerms.email) {
					email = visitor.get("email").toLowerCase().includes(this.filterTerms.email.toLowerCase());
				}
				if (visitor.get("access") && this.filterTerms.access) {
					access = visitor.get("access").toLowerCase().includes(this.filterTerms.access.toLowerCase());
				}
				if (first == true && last == true && comp == true && email == true && access == true) {
					return true;
				}
				else {
					return false;
				}
			});
		},
	},
	components: {
		NewRecord,
		MoreInfo,
		CompanySelect
	}
}
</script>

<style scoped>
.v-list-item:hover {
	background: #454545;
} 
.v-list.data {
  border-radius: 0px;
  overflow-y: auto;
  height: 450px;
}

textarea:focus, input:focus{
    outline: none;
}
.form {
	border-radius: 10px 10px 0px 0px; 
	height: fit-content; 
	width: 100%;
}

</style>