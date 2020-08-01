<template>
    <v-container background fluid fill-height>
        <v-row class="mx-4" style="height: 100%">
            <v-form class="form primary" style="height: auto">
                <v-container>
                    <v-row class="align-start">
                        <v-col cols="4" class="py-0">
                            <v-text-field label="First Name" outlined color="black" 
                                v-model="filterTerms.firstName"
                                v-on:input="filterRecords()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Last Name" outlined color="black" 
                                v-model="filterTerms.lastName"
                                v-on:input="filterRecords()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="2" class="py-0">
                            <v-text-field label="Start Date" outlined color="black" 
                                v-model="filterTerms.arrive"
                                v-on:input="filterRecords()"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="2" class="py-0">
                            <v-text-field label="End Date" outlined color="black" 
                                v-model="filterTerms.depart"
                                v-on:input="filterRecords()"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="aling-center">
                        <v-col cols="4" class="py-0">
                            <v-autocomplete outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="filterTerms.company"
								v-on:change="filterRecords()"
							>
							</v-autocomplete>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Email" outlined color="black" 
                                v-model="filterTerms.email"
                                v-on:input="filterRecords()"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-col class="secondary" style="border-radius:0px 0px 10px 10px; width: 100%; height: 80%">
                <v-toolbar class="primary">
                    <div style="width: 10%">
                        <v-btn class="sort primary" v-on:click="sortBy(0)" elevation="0">
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
                        <v-btn class="sort primary" v-on:click="sortBy(1)" elevation="0">
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
                        <v-btn class="sort primary" v-on:click="sortBy(2)" elevation="0">
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
                        <v-btn class="sort primary" v-on:click="sortBy(3)" elevation="0">
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
                        <v-btn class="sort primary" v-on:click="sortBy(4)" elevation="0">
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
                        <v-btn class="sort primary" v-on:click="sortBy(5)" elevation="0">
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
                <v-list style="padding: 16px">
                    <v-virtual-scroll :items="recordsDisplay">
                        <v-list-item v-for="record in recordsDisplay" :key="record.email + record.arrive">
                            <v-row>
                                <span style="width: 10%">{{ record.firstName }}</span>
                                <span style="width: 15%">{{ record.lastName }}</span>
                                <span style="width: 20%">{{ record.company }}</span>
                                <span style="width: 25%">{{ record.email }}</span>
                                <span style="width: 15%">{{ record.arrive }}</span>
                                <span style="width: 15%">{{ record.depart }}</span> 
                            </v-row>
                        </v-list-item>
                    </v-virtual-scroll>
                </v-list>
                <v-pagination :length="pages" v-model="currentPage" v-on:input="displayRecords()">
                </v-pagination>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Parse from 'parse'
export default {
    data () {
        return {
            records: [],
            recordsFinal: [],
            recordsDisplay: [],
            recordsSorted: [],
            sort: 0,
            lastBtn: null,
            filterTerms: {
                firstName: null,
                lastName: null,
                company: null,
                email: null,
                arrive: null,
                depart: null,
            },
            companyFinal: [],
            searchComp: null,
            currentPage: 1,
            pages: null,
        }
    },
    watch: {
		searchComp (val) {
			this.searchCompanies(val);
		}
	},
    beforeMount(){
        this.getRecords();
    },
    methods: {
        displayRecords: function () {
            this.recordsDisplay = this.recordsFinal.slice(20*(this.currentPage - 1), 20*this.currentPage);
        },
        calcPages: function () {
            this.pages = Math.ceil(this.recordsFinal.length / 20);
            this.displayRecords();
        },
        filterRecords: function () {
            let list = this.recordsSorted.filter((item) => {
                let first = true, last = true, comp = true, email = true;
                if (this.filterTerms.firstName) {
                    first =  item.firstName.toLowerCase().includes(this.filterTerms.firstName.toLowerCase());
                }
                if (this.filterTerms.lastName) {
                    console.log(this.filterTerms.lastName);
                    last = item.lastName.toLowerCase().includes(this.filterTerms.lastName.toLowerCase());
                }
                if (this.filterTerms.company) {
                    console.log(this.filterTerms.company);
                    comp = item.company.toLowerCase().includes(this.filterTerms.company.toLowerCase());
                }
                if (this.filterTerms.email) {
                    email = item.email.toLowerCase().includes(this.filterTerms.email.toLowerCase());
                }


                if (first == true && last == true && email == true && comp == true) {
                    return true;
                }
                else return false;
            });
            this.recordsFinal = list;
            this.calcPages();
        },
        sortBy: async function (sortBtn) {
            if (this.sort == 0 && this.lastBtn == null) {
                this.sort = 1;
                this.sortSwitch(sortBtn);
            }
            else if (sortBtn !== this.lastBtn) {
                this.sort = 1;
                await this.reformatOldSwitch();
                this.sortSwitch(sortBtn);
            }
            else {
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
        sortSwitch: function (sortBtn) {
            switch (sortBtn) {
                case 0: {
                    let asc = document.getElementById('asc0');
                    let des = document.getElementById('des0');

                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, "firstName", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, "firstName", "asc");
                    }
                    break;
                }
                case 1: {
                    let asc = document.getElementById('asc1');
                    let des = document.getElementById('des1');

                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, "lastName", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, "lastName", "asc");
                    }
                    break;
                }  
                case 2:{
                    let asc = document.getElementById('asc2');
                    let des = document.getElementById('des2');
                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, "company", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, "company", "asc");
                    }
                    break;
                }
                case 3: {
                    let asc = document.getElementById('asc3');
                    let des = document.getElementById('des3');
                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, "email", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, "email", "asc");
                    }
                    break;
                }
                case 4: {
                    let asc = document.getElementById('asc4');
                    let des = document.getElementById('des4');
                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, "arrive", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, "arrive", "asc");
                    }
                    break;
                }
                case 5: {
                    let asc = document.getElementById('asc5');
                    let des = document.getElementById('des5');
                    if ((this.sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                        this.sortRecords();
                    }
                    else if ((this.sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.sortRecords(undefined, 'depart', 'des');
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.sortRecords(undefined, 'depart', 'asc');
                    }
                    break;
                }
            }
        },
        sortRecords: async function (list=this.records, sortBy="company", sortType="des") {
            switch (sortBy) {
                case 'firstName': {
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let visitorx = await list[x].get('visitor');
                        let visitory = await list[x-y].get('visitor');
                        
                        while (visitorx.get('firstName').toLowerCase() < visitory.get('firstName').toLowerCase()) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                visitory = list[x-y].get('visitor');
                            }
                            else break;
                        }
                    }
                    break;
                }
                case 'lastName': {
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let visitorx = await list[x].get('visitor');
                        let visitory = await list[x-y].get('visitor');
                        
                        while (visitorx.get('lastName').toLowerCase() < visitory.get('lastName').toLowerCase()) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                visitory = list[x-y].get('visitor');
                            }
                            else break;
                        }
                    }
                    break;
                }
                case 'company': { 
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let visitorx = await list[x].get('visitor');
                        let visitory = await list[x-y].get('visitor');
                        let companyx = await visitorx.get('company');
                        let companyy = await visitory.get('company');
                        
                        while (companyx.get('name').toLowerCase() < companyy.get('name').toLowerCase()) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                visitory = list[x-y].get('visitor');
                                companyy = visitory.get('company');
                            }
                            else break;
                        }
                    }
                    break;
                }
                case 'email': {
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let visitorx = await list[x].get('visitor');
                        let visitory = await list[x-y].get('visitor');
                        
                        while (visitorx.get('email').toLowerCase() < visitory.get('email').toLowerCase()) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                visitory = list[x-y].get('visitor');
                            }
                            else break;
                        }
                    }
                    break;
                }
                case 'arrive': {
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let arrivex = await list[x].get('arrive');
                        let arrivey = await list[x-y].get('arrive');
                        
                        while (arrivex > arrivey) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                arrivey = list[x-y].get('arrive');
                            }
                            else break;
                        }
                    }
                    break;
                }
                case 'depart': {
                    for (let x = 1; x < list.length; x++) {
                        let y = 1;
                        let departx = await list[x].get('depart');
                        let departy = await list[x-y].get('depart');
                        
                        while (departx > departy) {
                            let temp = list[x-y];
                            list[x-y] = list[x-y+1];
                            list[x-y+1] = temp;
                            if (x - y !== 0) {
                                y++;
                                departy = list[x-y].get('depart');
                            }
                            else break;
                        }
                    }
                    break;
                }
            }
            if (sortType == "asc") {
                list.reverse();
            }
            this.records = list;
            this.recordsSorted = [];
            this.records.forEach((item) => {
                let record = {
                    firstName: null,
                    lastName: null,
                    email: null,
                    company: null,
                    access: null,
                    arrive: null,
                    depart: null,
                }

                let visitor = item.get("visitor");
                let company = visitor.get('company');
                
                record.company = company.get('name');
                record.arrive = this.formatDate(item.get("arrive"));
                record.depart = this.formatDate(item.get("depart"));
                record.firstName = visitor.get("firstName");
                record.lastName = visitor.get("lastName");
                record.email = visitor.get("email");
                record.access= visitor.get("access");

                this.recordsSorted.push(record);
            });
            this.filterRecords();
        },
        getRecords: async function () {
            this.records = []
            const Record = Parse.Object.extend("Record");
            const recordQuery = new Parse.Query(Record);

            recordQuery.exists("depart");

            recordQuery.include(['visitor.company']);
            this.records = await recordQuery.find();
            await this.sortRecords();
        },
        formatDate: function(date) {
            let month = '0' + (date.getMonth() + 1);
            let day = date.getDate();
            let year = date.getFullYear();
            let hour = date.getHours();
            let minute = '0' + date.getMinutes();
            let dayTime;
            
            if (hour < 12) {
                dayTime = "am";
                hour = '0' + hour;
            }
            else if (hour == 12) {
                dayTime = 'pm';
                hour = '0' + hour;
            }
            else if (hour == 24) {
                dayTime = "am";
                hour = '0' + (hour - 12);
            }
            else {
                dayTime = "pm";
                hour = '0' + (hour - 12);
            }

            let formattedDate = month.slice(-2) + "/" + day + "/" + year + " - " + hour.slice(-2) + ":" + minute.slice(-2) + dayTime;
            return formattedDate;
        },
        searchCompanies: async function (val) {
			const user = Parse.User.current();
			const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			let companyList = await Users.find();
			companyList.push(user);
			
			let test = companyList.filter((company) => {
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
    }
};
</script>
<style scoped>
.v-form.form {
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    height: 20%;
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
}
</style>