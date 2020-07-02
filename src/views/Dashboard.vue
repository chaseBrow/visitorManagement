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
							{{ person.get("firstName") }}
			            </v-col>
						<v-col class="listItem" cols="2">
							{{ person.get("lastName") }}
			            </v-col>
						<v-col class="listItem" cols="2">
                            {{ person.get("company") }}
			            </v-col>
						<v-col class="listItem" cols="3">
                            {{ person.get("email") }}
			            </v-col>
						<v-col class="listItem" cols="2">
                            {{ person.get("access") }}
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
	methods: {
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
			queryVisitor.find().then((visitors) => {
				console.log(visitors);
				this.filteredPeople = visitors.filter(this.filterPeople);
			},
			(error) =>	{ 
				console.log("there was an error:" + error.message)
			});
		},

		filterPeople: function (visitor) {
			console.log(visitor);
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