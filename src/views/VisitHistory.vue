<template>
    <v-container background fluid fill-height>
        <v-row class="mx-4" style="height: 100%">
            <v-form class="form primary" style="height: auto">
                <v-container>
                    <v-row class="align-start">
                        <v-col cols="4" class="py-0">
                            <v-text-field label="First Name" outlined color="black">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Last Name" outlined color="black">
                            </v-text-field>
                        </v-col>
                        <v-col cols="2" class="py-0">
                            <v-text-field label="Start Date" outlined color="black">
                            </v-text-field>
                        </v-col>
                        <v-col cols="2" class="py-0">
                            <v-text-field label="End Date" outlined color="black">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="aling-center">
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Company" outlined color="black">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Access" outlined color="black">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-text-field label="Email" outlined color="black">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn v-on:click="getRecords()"> Get Records </v-btn>
                </v-container>
            </v-form>
            <v-col class="secondary" style="border-radius:0px 0px 10px 10px; width: 100%; height: 80%">
                <v-toolbar class="primary">
                    <div style="width: 10%">
                        <v-btn class="sort" v-on:click="sortBy(0)" elevation="0" tile>
                            <span>First Name</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                    <div style="width: 15%">
                        <v-btn class="sort" v-on:click="sortBy(1)">
                            <span>Last Name</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                    <div style="width: 20%">
                        <v-btn class="sort" v-on:click="sortBy(2)">
                            <span>Company</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                    <div style="width: 25%">
                        <v-btn class="sort" v-on:click="sortBy(3)">
                            <span>Email</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                    <div style="width: 15%">
                        <v-btn class="sort" v-on:click="sortBy(4)">
                            <span>Arrive</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                    <div style="width: 15%">
                        <v-btn class="sort" v-on:click="sortBy(5)">
                            <span>Depart</span>
                            <v-row>
                                <v-icon class="up">mdi-menu-up</v-icon>
                            </v-row>
                            <v-row>
                                <v-icon class="down">mdi-menu-down</v-icon>
                            </v-row>
                        </v-btn>
                    </div>
                </v-toolbar>
                <v-list style="padding: 16px">
                    <v-list-item v-for="record in records" :key="record.email + record.arrive">
                        <v-row>
                            <span style="width: 10%">{{ record.firstName }}</span>
                            <span style="width: 15%">{{ record.lastName }}</span>
                            <span style="width: 20%">{{ record.company }}</span>
                            <span style="width: 25%">{{ record.email }}</span>
                            <span style="width: 15%">{{ record.arrive }}</span>
                            <span style="width: 15%">{{ record.depart }}</span> 
                        </v-row>
                    </v-list-item>
                </v-list>
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
            sort: 0,
        }
    },
    methods: {
        sortBy: function (sortBtn) {
            this.sort += 1
            let sort = this.sort

            switch (sortBtn) {
                case 0: {
                    console.log("btn 0");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }
                case 1: {
                    console.log("btn 1");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }  
                case 2:{
                    console.log("btn 2");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }
                case 3: {
                    console.log("btn 3");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }
                case 4: {
                    console.log("btn 4");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }
                case 5: {
                    console.log("btn 5");
                    if ((sort % 3) == 0) {
                        console.log("no sort");
                    }
                    else if ((sort % 3) == 1) {
                        console.log("sort1")
                    }
                    else {
                        console.log("sort2")
                    }
                    break;
                }
            }
        },
        getRecords: async function () {
            this.records = []
            const Record = Parse.Object.extend("Record");
            const recordQuery = new Parse.Query(Record);
            recordQuery.exists("depart");
            recordQuery.descending('depart');
            recordQuery.include(['visitor.company']);
            let list = await recordQuery.find();

            

            list.forEach((item) => {
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

                this.records.push(record);
            });
               
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
        }
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
}
.v-icon.down {
    position: relative;
    top: 5px;
    left: 10px;
}
</style>