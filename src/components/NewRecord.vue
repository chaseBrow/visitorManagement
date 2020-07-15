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
                this.arrivalTime = time[0];
                this.arrTimeParse = time[1];
            }
            else if (this.status == 'Departed') {
                this.departureTime = time[0];
                this.depTimeParse = time[1];
            }
        },
        cancel: function () {
            this.status = "Absent";
            this.select = null;
            this.dialog = false;
            this.arrivalTime = null;
            this.arrTimeParse = null;
            this.departureTime = null;
            this.depTimeParse = null;
        },
        newRecord: async function () {
            const Record = new Parse.Object.extend('Record');
            const recQuery = new Parse.Query(Record);
            recQuery.equalTo("visitor", this.person);
            let peep = await recQuery.first();
            if (peep !== null)  {
                this.record = peep;
            }
            else {
                this.record = new Record();
            }
            console.log(this.record);
            console.log(this.person);
        },
        saveRecord: async function () {
            if (this.status == 'Arrived') {

                this.options.splice(0,2);
                this.options.push("Departed");
                this.options.push("Delete");

                this.record.set("arrive", this.arrTimeParse);
                this.record.set("visitor", this.person);
                await this.record.save();

            }
            else if (this.status == 'Departed') {

                this.options.splice(0,2);
                this.options.push("Arrived");
                this.options.push("Expected");

                
                this.record.set("depart", this.depTimeParse);
                await this.record.save();
                this.cancel();
            }
            else if (this.status == 'Expected') {

                this.options.splice(1,1);
                this.options.push("Delete");

                this.record.set("visitor", this.person);
                await this.record.save();
            }
            else if (this.status == 'Delete') {
                this.options = ["Arrived","Expected"];
                await this.record.destroy();
                this.record = null;
                this.cancel();
            }
            this.dialog = false;
        },
        getDate: function () {
            let today = new Date();
            let time = today.toTimeString().split(' ')[0];
            let final = [time.slice(0, -3), today];
            return final;
        },
    }
}
</script>

<style scoped>
</style>