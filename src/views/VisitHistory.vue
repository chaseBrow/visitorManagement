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
                </v-container>
            </v-form>
            <v-col class="secondary" style="border-radius:0px 0px 10px 10px; width: 100%; height: 80%">
                <v-toolbar class="primary">
                    <v-btn v-on:click="getRecords()"> Get Records </v-btn>
                </v-toolbar>
                <v-list>
                    <v-list-item v-for="record in records" :key="record.email + record.arrive">
                        <v-row>
                            <v-col cols="1">{{ record.firstName }}</v-col>
                            <v-col cols="1">{{ record.lastName }}</v-col>
                            <v-col cols="2">{{ record.company }}</v-col>
                            <!-- <v-col cols="2">{{ record.access }}</v-col> -->
                            <v-col cols="3">{{ record.email }}</v-col>
                            <v-col cols="2">{{ record.arrive }}</v-col>
                            <v-col cols="2">{{ record.depart }}</v-col> 
                            <!-- mm/dd/yy HH:mm -->
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
            records: []
        }
    },
    methods: {
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
            
            if (hour <= 12) {
                dayTime = "am";
                hour = '0' + hour;
            }
            else {
                dayTime = "pm";
                hour = '0' + (hour - 12);
            }

            let formattedDate = month.slice(-2) + "/" + day + "/" + year + " - " + hour.slice(-2) + ":" + minute.slice(-2) + " " + dayTime;
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
</style>