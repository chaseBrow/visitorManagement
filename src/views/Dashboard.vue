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
						<v-col class="listItem" cols="1">
							First Name
			            </v-col>
						<v-col class="listItem" cols="2">
							Last Name
			            </v-col>
						<v-col class="listItem" cols="2">
                            Company
			            </v-col>
						<v-col class="listItem" cols="3">
                            Email
			            </v-col>
						<v-col class="listItem" cols="2">
                            Access
			            </v-col>
					</v-toolbar>
				<v-list dense>
					<v-list-item v-for="person in filteredPeople" :key="person.email">
						<v-col class="listItem" cols="1" >
							{{ person.firstName }}
			            </v-col>
						<v-col class="listItem" cols="2">
							{{ person.lastName }}
			            </v-col>
						<v-col class="listItem" cols="2">
                            {{ person.company }}
			            </v-col>
						<v-col class="listItem" cols="3">
                            {{ person.email }}
			            </v-col>
						<v-col class="listItem" cols="2">
                            {{ person.access }}
			            </v-col>
						<v-btn class="mr-6 primary" style="padding: 0 16px 0 6px">
							<v-icon dense class="pr-1">mdi-plus</v-icon>
							<span>Visit</span>
						</v-btn>
						<v-btn class="primary" >
							<span>Edit</span>
							<v-icon dense class="pl-1">mdi-pencil</v-icon>
						</v-btn>



						
					</v-list-item>
				</v-list>
			</v-col>




		</v-row>
	</v-container>
</template>

<script>
import Parse from "parse"
export default {
	data() {
		return {
			filterTerms: {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				access: '',
			},
			options: [
				'Data Suite 1',
				'Escort Required',
				'Contractor',
			],
			filteredPeople: [
				
			],
			people: [
				{
					firstName: 'Chase',
					lastName: "Brown",
					company: "Aunalytics",
					email: "CT-Chase.brown@aunalytics.company",
					access: "Data Suite 1"
				},
				{
					firstName: 'Brandon',
					lastName: "Harrington",
					company: "Apple",
					email: "brandon.harrington@betheluniversity.edu",
					access: "Contractor"
				},
				{
					firstName: 'Ava',
					lastName: "Brown",
					company: "Chickfila",
					email: "lemayava@outlook.com",
					access: "Data Suite 1"
				},
				{
					firstName: 'Joe',
					lastName: "Smith",
					company: "Aunalytics",
					email: "joe.smith@aunalytics.company",
					access: "Data Suite 1"
				},
			]
		}
	},
	methods: {
		filter: function () {
			let Visitors = Parse.Object.extend("Visitor");
			let queryVisitor = new Parse.Query(Visitors);
			queryVisitor.get().then((person) => {
				console.log(person);
				
			},
			(error) => {
				console.log("No person was retrieved" + error);
			});
			
			// this.filteredPeople = visitors.filter(this.filterPeople);
		},

		// filterPeople: function (visitor) {
		// 	// let vistor = Parse.Object.extend("Vistor");

		// 	let first = visitor.firstName.toLowerCase().includes(this.filterTerms.firstName.toLowerCase());
		// 	let last = visitor.lastName.toLowerCase().includes(this.filterTerms.lastName.toLowerCase());
		// 	let company = visitor.company.toLowerCase().includes(this.filterTerms.company.toLowerCase());
		// 	let email = vistior.email.toLowerCase().includes(this.filterTerms.email.toLowerCase());
		// 	let access = vistior.access.toLowerCase().includes(this.filterTerms.access.toLowerCase());
		// 	if (first == true && last == true && company == true && email == true && access == true) {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// },
	}
}

</script>

<style scoped>
.v-list-item:hover {
	background:lightgray;
}

.v-list-item {
	overflow-wrap: break-word;
}
.v-list {
  border-radius: 0px;
  overflow-y: auto;
  height: 450px;
}
.col.listItem {
	padding: 0px;
}

</style>