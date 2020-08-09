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
							<v-autocomplete outlined label="Company" color="accent" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="filterTerms.company"
								v-on:input="filterPeople()"
							>
							</v-autocomplete>
						</v-col>
						<v-col cols="3" class="pb-0">
							<v-text-field label="Email" outlined color="accent"
								v-model="filterTerms.email"
								v-on:input="filterPeople()"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2" class="pb-0">
							 <v-select label="Access" outlined color="accent" :items="options" v-model="filterTerms.access" 
							 v-on:focus="getOptions" v-on:change="filterPeople()"
							>
							</v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-form>


			<v-col cols="12" class="primary" style="border-radius: 0px 0px 10px 10px; height: fit-content">
				<v-toolbar class="secondary">
					<span class="white--text" style="width: 10%;">First Name</span>
					<span class="white--text" style="width: 10%">Last Name</span>
					<span class="white--text" style="width: 10%">Company</span>
					<span class="white--text" style="width: 25%">Email</span>
					<span class="white--text" style="width: 10%">Access</span>
					<v-spacer></v-spacer>
					<v-btn class="accent white--text" v-on:click="recentVisitors()"> 
						Recent Visitors
					</v-btn>
				</v-toolbar>

				<v-list dense class="data secondary">
					<v-list-item v-for="person in filteredPeople" :key="person.email">
						<span class="white--text" style="width: 10%">{{ person.get('firstName') }}</span>
                    	<span class="white--text" style="width: 10%">{{ person.get('lastName') }}</span>
                        <span class="white--text" style="width: 10%; font-size: 0.95rem">{{ getCompanyName(person) }}</span>
						<span class="white--text" style="width: 25%; font-size: 0.9rem">{{ person.get('email') }}</span>
                        <span class="white--text" style="width: 10%; font-size: 0.9rem">{{ person.get('access') }}</span>
                        
						<v-spacer></v-spacer>
						<div :id="person.get('email') + 'visit'" :key="person.get('email') + 'visit'">
							<NewRecord v-bind:person="person">
							</NewRecord> 
						</div>
						<div :id="person.get('email') + 'info'" :key="person.get('email') + 'info'" class="pa-0">
							<MoreInfo v-bind:person="person" v-on:reload="getVisitors()">
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
export default {
	data() {
		return {
			recVisitors: null,


			filteredPeople: [],
			companyFinal: [],
			searchComp: null,
			activeCompanies: [],
			visitors: [],
			filterTerms: {
				firstName: '',
				lastName: '',
				email: '',
				access: '',
				company: '',
			},
			options: [],
		}
	},
	watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
	},
	async beforeMount(){
		await this.getCompanies();
		this.getVisitors();
    },
	methods: {
		getCompanyName: function (person) {
			let comp = person.get("company");
			let name = comp.get("name");
			return name;
		},
		getCompanies: async function () {
			const user = Parse.User.current();
			const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			let companyList = await Users.find();
			
			companyList.push(user);
			this.activeCompanies = companyList;
		},
		searchCompanies: async function (val) {
			let test = this.activeCompanies.filter(company => {
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
		recentVisitors: async function () {
			this.filterTerms.firstName = '';
			this.filterTerms.lastName = '';
			this.filterTerms.email = '';
			this.filterTerms.access = '';
			this.filterTerms.company = '';


			const Record = Parse.Object.extend("Record");
			const recQuery = new Parse.Query(Record);


			recQuery.greaterThan("updatedAt", this.getDate());
			recQuery.descending("createdAt");
			recQuery.include("visitor");
			
			let vis = await recQuery.find();
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
		getDate: function () {
			let date = new Date();
			let yesterday = date.setTime(date.getTime() - 86400000);
			return new Date(yesterday);
		},
		getOptions: function () {
            const user = Parse.User.current();
            this.options = user.get("options");
		},
		getVisitors: async function () {
			const Visitors = Parse.Object.extend("Visitor");
			const queryVisitor = new Parse.Query(Visitors);
			
			queryVisitor.notEqualTo("deleted", true);
			queryVisitor.include(["company.name"]);
			queryVisitor.containedIn('company', this.activeCompanies);
			this.visitors = await queryVisitor.find();
			this.filterPeople();
		},
		filterPeople: function (visitors=this.visitors) {
			this.filteredPeople = visitors.filter((visitor) => {
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
		MoreInfo
	}
}
</script>

<style scoped>
.text-field {
	background-color: lightcoral;
	color: greenyellow;
	border-color: greenyellow;
	outline-color: hotpink;
	flood-color: indigo;
}

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