<template>
    <v-dialog v-model="dialog" persistent width="300px" class="primary">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-on:click="newRecord()" class="mr-6 primary" style="padding: 0 16px 0 6px">
                <v-icon dense class="pr-1">mdi-plus</v-icon>
                <span>Visit</span>
            </v-btn>
        </template>
        <v-form>
            <v-card class="pa-4">
                <v-card-title>
                    Visit Log
                </v-card-title>
                <v-text-field
                    :disabled="status !== 'Arrived'"
                    label="Arrival"
                    :value="arrivalTime"
                    type="time"
                    v-model="arrivalTime"
                ></v-text-field>
                
                <v-text-field
                    :disabled="status !== 'Departed'"
                    label="Departure"
                    :value="departureTime"
                    type="time"
                    v-model="departureTime"
                ></v-text-field>

                <v-select
                    v-model="select"
                    :placeholder="status"
                    label="Status"
                    :items="options"
                    v-on:change="visitStatus()"
                ></v-select>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-on:click="cancel()" text>Cancel</v-btn>
                    <v-btn v-on:click="saveRecord()" color="primary">Save</v-btn>
                </v-card-actions>

            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>
import Parse from 'parse'
export default {
    props: ['person'],
    data() {
        return {
            options: [
                "Arrived",
                "Expected",
            ],
            status: "Absent",
            select: null,
            dialog: false,
            departureTime: null,
            depTimeParse: null,
            arrivalTime: null,
            arrTimeParse: null,
            record: null,
        }
    },
    methods: {
        visitStatus: function () {
            this.status = this.select;
            const time = this.getDate();
            if (this.status == 'Arrived') {
                this.arrivalTime = this.toTime(time);
                this.arrTimeParse = time;
            }
            else if (this.status == 'Departed') {
                this.departureTime = this.toTime(time);
                this.depTimeParse = time;
            }
        },
        cancel: function () {
            if (this.record.get("status")) {
                this.status = this.record.get("status");
            }
            else this.status = "Absent";
            this.select = null;
            this.dialog = false;
            if (this.record.get("arrive")) {
                this.arrivalTime = this.toTime(this.record.get("arrive"));
            }
            else this.arrivalTime = null;
            this.arrTimeParse = null;
            if (this.record.get("depart")) {
                this.departureTime = this.toTime(this.record.get("depart"));
            }

            else this.departureTime = null;
            this.depTimeParse = null;
        },
        newRecord: async function () {
            const Record = new Parse.Object.extend('Record');
            const recQueryArr = new Parse.Query(Record);
            recQueryArr.equalTo("visitor", this.person);
            recQueryArr.doesNotExist("arrive");

            const recQueryDep = new Parse.Query(Record);
            recQueryDep.equalTo("visitor", this.person);
            recQueryDep.doesNotExist("depart");

            let mainQuery = Parse.Query.or(recQueryArr, recQueryDep);

            let peep = await mainQuery.first();
            if (peep)  {
                this.record = peep;
            }
            else {
                this.record = new Record();
            }
        },
        saveRecord: async function () {
            if (this.status == 'Arrived') {

                this.options.splice(0,2);
                this.options.push("Departed");
                this.options.push("Delete");

                this.record.set("status", this.status);
                this.record.set("arrive", this.arrTimeParse);
                this.record.set("visitor", this.person);
                await this.record.save();

            }
            else if (this.status == 'Departed') {

                this.options.splice(0,2);
                this.options.push("Arrived");
                this.options.push("Expected");

                this.record.set("status", this.status);
                this.record.set("depart", this.depTimeParse);
                await this.record.save();
            }
            else if (this.status == 'Expected') {

                this.options.splice(1,1);
                this.options.push("Delete");

                this.record.set("status", this.status);
                this.record.set("visitor", this.person);
                await this.record.save();
            }
            else if (this.status == 'Delete') {
                this.options = ["Arrived","Expected"];
                await this.record.destroy();
                this.cancel();
                this.record = null;
            }
            this.dialog = false;
        },
        getDate: function () {
            let today = new Date();
            return today;
        },
        toTime: function (date) {
            let time = date.toTimeString().split(' ')[0];
            time = time.slice(0, -3);
            return time;
        }
    }
}
</script>

<style scoped>
</style>