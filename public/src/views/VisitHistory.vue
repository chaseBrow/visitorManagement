/* eslint-disable */
<!-- Author: Chad Brown & Chase Brown
Created On: 05/23/1618
Updated By: Chad Brown & Chase Brown
Updated On: 08/03/2020
Description: Visit History Page
-->
<template>
	<v-container background fluid fill-height>
		<v-row class="mx-4" style="height: 100%">
			<v-form class="form primary">
				<v-row>
					<v-col cols="4">
						<div style="margin: 10px">
							<v-text-field
								label="First Name"
								outlined
								color="accent"
								v-model="filterTerms.firstName"
								v-on:input="filterRecords()"
							>
							</v-text-field>
							<v-text-field
								label="Last Name"
								outlined
								color="accent"
								v-model="filterTerms.lastName"
								v-on:input="filterRecords()"
							>
							</v-text-field>
						</div>
					</v-col>
					<v-col cols="4">
						<div style="margin: 10px">
							<CompanySelect
								@update:company="(filterTerms.company = $event), filterRecords()"
								v-bind:company.sync="filterTerms.company"
								v-bind:parent="'dashboard'"
							>
							</CompanySelect>
							<v-text-field
								label="Email"
								outlined
								color="accent"
								v-model="filterTerms.email"
								v-on:input="filterRecords()"
							>
							</v-text-field>
						</div>
					</v-col>
					<v-col cols="4">
						<v-card class="date" height="90%">
							<v-row class="date2">
								<v-btn class="accent" v-on:click="daysAgo(30)">
									30 days
								</v-btn>
								<v-btn class="accent" v-on:click="daysAgo(90)">
									90 days
								</v-btn>
								<v-btn class="accent" v-on:click="daysAgo(0)">
									Year to Date
								</v-btn>
							</v-row>
							<v-row class="date2">
								<v-menu
									v-model="startMenu"
									transition="scale-transition"
									offset-y
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="filterTerms.start"
											label="Start Date"
											v-bind="attrs"
											readonly
											v-on="on"
											outlined
											clearable
											v-on:input="filterRecords()"
											color="accent"
											style="max-width: 40%"
										>
										</v-text-field>
									</template>
									<v-date-picker
										v-model="filterTerms.start"
										no-title
										scrollable
										v-on:input="filterRecords()"
									>
									</v-date-picker>
								</v-menu>
								<v-menu
									v-model="endMenu"
									transition="scale-transition"
									offset-y
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="filterTerms.end"
											label="End Date"
											v-bind="attrs"
											readonly
											v-on="on"
											outlined
											clearable
											v-on:input="filterRecords()"
											color="accent"
											style="max-width: 40%"
										>
										</v-text-field>
									</template>
									<v-date-picker
										v-model="filterTerms.end"
										no-title
										scrollable
										v-on:input="filterRecords()"
									>
									</v-date-picker>
								</v-menu>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-form>
			<v-col
				class="primary"
				style="border-radius:0px 0px 10px 10px; width: 100%; height: 80%"
			>
				<v-toolbar class="secondary">
					<div style="width: 10%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(0)"
							elevation="0"
						>
							<span>First Name</span>
							<v-row>
								<v-icon class="up" id="asc0">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des0">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
					<div style="width: 15%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(1)"
							elevation="0"
						>
							<span>Last Name</span>
							<v-row>
								<v-icon class="up" id="asc1">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des1">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
					<div style="width: 20%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(2)"
							elevation="0"
						>
							<span>Company</span>
							<v-row>
								<v-icon class="up" id="asc2">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des2">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
					<div style="width: 25%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(3)"
							elevation="0"
						>
							<span>Email</span>
							<v-row>
								<v-icon class="up" id="asc3">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des3">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
					<div style="width: 15%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(4)"
							elevation="0"
						>
							<span>Arrive</span>
							<v-row>
								<v-icon class="up" id="asc4">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des4">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
					<div style="width: 15%">
						<v-btn
							class="sort secondary text--white"
							v-on:click="sortBy(5)"
							elevation="0"
						>
							<span>Depart</span>
							<v-row>
								<v-icon class="up" id="asc5">mdi-menu-up</v-icon>
							</v-row>
							<v-row>
								<v-icon class="down" id="des5">mdi-menu-down</v-icon>
							</v-row>
						</v-btn>
					</div>
				</v-toolbar>
				<v-list style="padding: 16px" class="secondary">
					<v-list-item
						v-for="record in recordsDisplay"
						:key="record.id"
						style="padding: 0px"
						:class="changeClass(record.access)"
					>
						<v-row style="padding: 0px 16px 0px 16px">
							<span class="primary--text" style="width: 10%">{{
								record.firstName
							}}</span>
							<span class="primary--text" style="width: 15%">{{
								record.lastName
							}}</span>
							<span class="primary--text" style="width: 20%">{{
								record.company
							}}</span>
							<span class="primary--text" style="width: 25%">{{
								record.email
							}}</span>
							<span class="primary--text" style="width: 15%">{{
								record.arrive
							}}</span>
							<span class="primary--text" style="width: 15%">{{
								record.depart
							}}</span>
						</v-row>
					</v-list-item>
					<v-btn
						color="accent"
						v-on:click="exportToCSV()"
						class="floater"
					>
						Export
					</v-btn>
				</v-list>
				<v-pagination
					color="accent"
					dark
					:length="pages"
					total-visible="5"
					v-model="currentPage"
					v-on:input="displayRecords()"
				>
				</v-pagination>
				
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Parse from "parse";
import CompanySelect from "../components/CompanySelect.vue";
export default {
	components: {
		CompanySelect,
	},
	data() {
		return {
			objRecords: [],
			records: [],
			recordsFinal: [],
			recordsDisplay: [],
			sort: 0,
			lastBtn: null,
			filterTerms: {
				firstName: null,
				lastName: null,
				company: null,
				email: null,
				start: null,
				end: null
			},
			currentPage: 1,
			pages: null,
			startMenu: false,
			endMenu: false
		};
	},
	beforeMount() {
		this.getRecords();
	},
	methods: {
		exportToCSV: function(){
			let rows = [];
			rows.push(["First Name", "Last Name", "Company", "Email", "Phone Number", 
				"Access", "May Request Remote Hands", "May Schedule Others", "Arrival", "Departure"]);

			this.recordsFinal.forEach((record) => {
				let row = [];
				
				row.push(record.firstName);
				row.push(record.lastName);
				row.push(record.company);
				row.push(record.email);
				row.push(record.phone);
				row.push(record.access);
				row.push(record.mayRemote);
				row.push(record.maySchedule);
				row.push(record.arrive);
				row.push(record.depart);
				
				rows.push(row);
			})

			let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");	

			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "visitRecords.csv");
			document.body.appendChild(link);

			link.click();
		},
		changeClass: function(access) {
			if(access == "Guest" || access == "Contractor") return 'guestCont';
			else return null;
		},
		daysAgo: function(days) {
			let date = new Date();
			date.setTime(date.getTime() - 86400000 * days);

			let year = date.getFullYear();
			let month = "0" + (date.getMonth() + 1);
			let day = "0" + date.getDate();

			if (days == 0) {
				month = "01";
				day = "01";
			}

			this.filterTerms.start = year + "-" + month.slice(-2) + "-" + day.slice(-2);
			this.filterRecords();
		},
		formatDateInputs: function(inputtedDate) {
			const [month, day, year] = inputtedDate.substring(0,10).split("/");
			return `${year}-${month}-${day}`;
		},
		displayRecords: function() {
			this.recordsDisplay = this.recordsFinal.slice(
				20 * (this.currentPage - 1),
				20 * this.currentPage
			);
		},
		calcPages: function() {
			this.pages = Math.ceil(this.recordsFinal.length / 20);
			this.displayRecords();
		},
		filterRecords: function() {
			this.recordsFinal = this.objRecords.filter(item => {
				let first = true,
					last = true,
					comp = true,
					email = true,
					date = true;
				if (this.filterTerms.firstName) {
					first = item.firstName
						.toLowerCase()
						.includes(this.filterTerms.firstName.toLowerCase());
				}
				if (this.filterTerms.lastName) {
					last = item.lastName
						.toLowerCase()
						.includes(this.filterTerms.lastName.toLowerCase());
				}
				if (this.filterTerms.company) {
					comp = item.company
						.toLowerCase()
						.includes(this.filterTerms.company.toLowerCase());
				}
				if (this.filterTerms.email) {
					email = item.email
						.toLowerCase()
						.includes(this.filterTerms.email.toLowerCase());
				}

				if (this.filterTerms.start && this.filterTerms.end) {
					date = new Date(this.formatDateInputs(item.depart)) <= new Date(this.filterTerms.end) && new Date(this.formatDateInputs(item.depart)) >= new Date(this.filterTerms.start);
				} else if (this.filterTerms.start) {
					date = new Date(this.formatDateInputs(item.depart)) >= new Date(this.filterTerms.start);
				} else if (this.filterTerms.end) {
					date = new Date(this.formatDateInputs(item.depart)) <= new Date(this.filterTerms.end);
				}

				if (first == true && last == true && email == true && comp == true && date == true) {
					return true;
				} else return false;
			});
			this.calcPages();
		},
		sortBy: async function(sortBtn) {
			if (this.sort == 0 && this.lastBtn == null) {
				this.sort = 1;
				this.sortSwitch(sortBtn);
			} else if (sortBtn !== this.lastBtn) {
				this.sort = 1;
				await this.reformatOldSwitch();
				this.sortSwitch(sortBtn);
			} else {
				this.sort += 1;
				this.sortSwitch(sortBtn);
			}
			this.lastBtn = sortBtn;
		},
		reformatOldSwitch: async function() {
			let asc = await document.getElementById("asc" + this.lastBtn);
			let des = await document.getElementById("des" + this.lastBtn);
			asc.style.color = "grey";
			des.style.color = "grey";
		},
		sortSwitch: function(sortBtn) {
			switch (sortBtn) {
			case 0: {
				let asc = document.getElementById("asc0");
				let des = document.getElementById("des0");

				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "firstName", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "firstName", "asc");
				}
				break;
			}
			case 1: {
				let asc = document.getElementById("asc1");
				let des = document.getElementById("des1");

				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "lastName", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "lastName", "asc");
				}
				break;
			}
			case 2: {
				let asc = document.getElementById("asc2");
				let des = document.getElementById("des2");
				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "company", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "company", "asc");
				}
				break;
			}
			case 3: {
				let asc = document.getElementById("asc3");
				let des = document.getElementById("des3");
				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "email", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "email", "asc");
				}
				break;
			}
			case 4: {
				let asc = document.getElementById("asc4");
				let des = document.getElementById("des4");
				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "arrive", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "arrive", "asc");
				}
				break;
			}
			case 5: {
				let asc = document.getElementById("asc5");
				let des = document.getElementById("des5");
				if (this.sort % 3 == 0) {
					asc.style.color = "grey";
					des.style.color = "grey";
					this.sortRecords();
				} else if (this.sort % 3 == 1) {
					asc.style.color = "grey";
					des.style.color = "#2A6EBB";
					this.sortRecords(undefined, "depart", "des");
				} else {
					asc.style.color = "#2A6EBB";
					des.style.color = "grey";
					this.sortRecords(undefined, "depart", "asc");
				}
				break;
			}
			}
		},
		sortRecords: async function(list = this.records, sortBy = "company", sortType = "des") {
			switch (sortBy) {
			case "firstName": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let visitorx = list[x].get("visitor");
					let visitory = list[x - y].get("visitor");

					while (visitorx.get("firstName").toLowerCase() < visitory.get("firstName").toLowerCase()) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							visitory = list[x - y].get("visitor");
						} 
						else break;
					}
				}
				break;
			}
			case "lastName": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let visitorx = list[x].get("visitor");
					let visitory = list[x - y].get("visitor");

					while (visitorx.get("lastName").toLowerCase() < visitory.get("lastName").toLowerCase()) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							visitory = list[x - y].get("visitor");
						} 
						else break;
					}
				}
				break;
			}
			case "company": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let visitorx = list[x].get("visitor");
					let visitory = list[x - y].get("visitor");
					let companyx = visitorx.get("company");
					let companyy = visitory.get("company");

					while (companyx.get("name").toLowerCase() < companyy.get("name").toLowerCase()) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							visitory = list[x - y].get("visitor");
							companyy = visitory.get("company");
						} else break;
					}
				}
				break;
			}
			case "email": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let visitorx = list[x].get("visitor");
					let visitory = list[x - y].get("visitor");

					while (visitorx.get("email").toLowerCase() < visitory.get("email").toLowerCase()) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							visitory = list[x - y].get("visitor");
						} else break;
					}
				}
				break;
			}
			case "arrive": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let arrivex = list[x].get("arrive");
					let arrivey = list[x - y].get("arrive");

					while (arrivex > arrivey) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							arrivey = list[x - y].get("arrive");
						} else break;
					}
				}
				break;
			}
			case "depart": {
				for (let x = 1; x < list.length; x++) {
					let y = 1;
					let departx = list[x].get("depart");
					let departy = list[x - y].get("depart");

					while (departx > departy) {
						let temp = list[x - y];
						list[x - y] = list[x - y + 1];
						list[x - y + 1] = temp;
						if (x - y !== 0) {
							y++;
							departy = list[x - y].get("depart");
						} else break;
					}
				}
				break;
			}
			}
			if (sortType == "asc") {
				list.reverse();
			}
			this.objRecords = [];
			list.forEach(item => {
				let record = {
					firstName: null,
					lastName: null,
					email: null,
					company: null,
					access: null,
					arrive: null,
					depart: null
				};


				let visitor = item.get("visitor");
				let company = visitor.get("company");

				record.company = company.get("name");
				record.arrive = this.formatDate(item.get("arrive"));
				record.depart = this.formatDate(item.get("depart"));
				record.firstName = visitor.get("firstName");
				record.lastName = visitor.get("lastName");
				record.email = visitor.get("email");
				record.access = visitor.get("access");
				record.mayRemote = visitor.get("mayRemote");
				record.maySchedule = visitor.get("maySchedule");
				record.phone = visitor.get("phone");

				this.objRecords.push(record);
			});
			this.filterRecords();
		},
		getRecords: async function() {
			this.records = [];
			const Record = Parse.Object.extend("Record");
			const recordQuery = new Parse.Query(Record);

			recordQuery.exists("depart");
			recordQuery.include(["visitor.company"]);

			this.records = await recordQuery.find();
			this.sortRecords();
		},
		formatDate: function(date) {
			let month = "0" + (date.getMonth() + 1);
			let day = "0" + date.getDate();
			let year = date.getFullYear();
			let hour = date.getHours();
			let minute = "0" + date.getMinutes();
			let dayTime;

			if (hour < 12) {
				dayTime = "am";
				hour = "0" + hour;
			} else if (hour == 12) {
				dayTime = "pm";
				hour = "0" + hour;
			} else if (hour == 24) {
				dayTime = "am";
				hour = "0" + (hour - 12);
			} else {
				dayTime = "pm";
				hour = "0" + (hour - 12);
			}

			let formattedDate =
				month.slice(-2) +
				"/" +
				day.slice(-2) +
				"/" +
				year +
				" - " +
				hour.slice(-2) +
				":" +
				minute.slice(-2) +
				dayTime;
			return formattedDate;
		}
	}
};
</script>
<style scoped>
.v-btn.floater {
	position: absolute;
	right: 50px;
	top: 250px;
}
.v-list-item.guestCont {
    background: #a0d0eb8e;
}
.date {
	background: #a0d0eb8e;
	border-radius: 8px;
	padding: 10px;
}
.date2 {
	justify-content: space-around;
	height: 45%;
}
.v-form.form {
	border-radius: 10px 10px 0px 0px;
	width: 100%;
	height: fit-content;
	/* padding: 0px 20px 0px 20px; */
}
.v-btn.sort {
	margin: 0px;
	padding: 10px 20px 10px 5px;
}
.v-icon.up {
	position: relative;
	top: -5px;
	left: 10px;
	color: grey;
}
.v-icon.down {
	position: relative;
	top: 5px;
	left: 10px;
	color: grey;
}
.v-list {
	height: 70%;
	overflow-y: scroll;
	border-radius: 0px;
}
.v-list-item:hover {
 	background: #454545;
}
</style>
