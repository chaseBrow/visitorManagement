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
            lastBtn: null
        }
    },
    methods: {
        sortBy: function (sortBtn) {
            if (sortBtn == this.lastBtn){
                this.sort += 1
                this.sortSwitch(sortBtn)
            }
            else{
                this.sort = 1
                this.sortSwitch(sortBtn)
            }
            this.lastBtn = sortBtn;
        },
        sortSwitch: function (sortBtn) {
            let sort = this.sort

            switch (sortBtn) {
                case 0: {
                    let asc = document.getElementById('asc0');
                    let des = document.getElementById('des0');

                    if ((sort % 3) == 0) {
                        asc.style.color = "grey";
                        des.style.color = "grey";
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "grey";
                        des.style.color = "black";
                        this.getRecords("firstName", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "grey";
                        this.getRecords("firstName", "asc");
                    }
                    break;
                }
                case 1: {
                    let asc = document.getElementById('asc1');
                    let des = document.getElementById('des1');

                    if ((sort % 3) == 0) {
                        asc.style.color = "white";
                        des.style.color = "white";
                        this.getRecords();
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "white";
                        des.style.color = "black";
                        this.getRecords("lastName", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "white";
                        this.getRecords("lastName", "asc");
                    }
                    break;
                }  
                case 2:{
                    let asc = document.getElementById('asc2');
                    let des = document.getElementById('des2');
                    if ((sort % 3) == 0) {
                        asc.style.color = "white";
                        des.style.color = "white";
                        this.getRecords();
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "white";
                        des.style.color = "black";
                        this.getRecords("company", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "white";
                        this.getRecords("company", "asc");
                    }
                    break;
                }
                case 3: {
                    let asc = document.getElementById('asc3');
                    let des = document.getElementById('des3');
                    if ((sort % 3) == 0) {
                        asc.style.color = "white";
                        des.style.color = "white";
                        this.getRecords();
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "white";
                        des.style.color = "black";
                        this.getRecords("email", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "white";
                        this.getRecords("email", "asc");
                    }
                    break;
                }
                case 4: {
                    let asc = document.getElementById('asc4');
                    let des = document.getElementById('des4');
                    if ((sort % 3) == 0) {
                        asc.style.color = "white";
                        des.style.color = "white";
                        this.getRecords("d");
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "white";
                        des.style.color = "black";
                        this.getRecords("arrive", "des");
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "white";
                        this.getRecords("arrive", "asc");
                    }
                    break;
                }
                case 5: {
                    let asc = document.getElementById('asc5');
                    let des = document.getElementById('des5');
                    if ((sort % 3) == 0) {
                        asc.style.color = "white";
                        des.style.color = "white";
                        this.getRecords();
                    }
                    else if ((sort % 3) == 1) {
                        asc.style.color = "white";
                        des.style.color = "black";
                        this.getRecords('depart', 'des');
                    }
                    else {
                        asc.style.color = "black";
                        des.style.color = "white";
                        this.getRecords('depart', 'asc');
                    }
                    break;
                }
            }
        },
        getRecords: async function (sortBy='depart', sortType='des') {
            this.records = []
            const Record = Parse.Object.extend("Record");
            const recordQuery = new Parse.Query(Record);
            console.log('sorting')
            recordQuery.exists("depart");

            // if (sortType == "des"){
            //     console.log("sorting des");
            //     recordQuery.descending(sortBy);
            // }
            // else {
            //     console.log("sorting asc");
            //     recordQuery.ascending(sortBy);
            // }
            console.log(sortType);
            recordQuery.ascending(sortBy);

            recordQuery.include(['visitor.company']);
            let list = await recordQuery.find();
            console.log(list);

            

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
    color: grey;
}
.v-icon.down {
    position: relative;
    top: 5px;
    left: 10px;
    color: grey;
}
</style>