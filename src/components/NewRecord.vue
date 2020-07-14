<template>
    <v-dialog v-model="dialog" width="300px" class="primary">
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
                    <v-btn v-on:click="cancel" text>Cancel</v-btn>
                    <v-btn v-on:click="saveRecord" color="primary">Save</v-btn>
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
                "Departed"
            ],
            status: "Absent",
            select: null,
            dialog: false,
            departureTime: null,
            arrivalTime: null,
            record: null,
        }
    },
    methods: {
        visitStatus: function () {
            this.status = this.select;
            if (this.status == 'Arrived') {
                this.arrivalTime = this.getDate();
            }
            else if (this.status == 'Departed') {
                this.departureTime = this.getDate();
            }
            // else if (this.status == 'Expected') {

            // }
            // else if (this.status == 'Delete') {

            // }
        },
        cancel: function () {
            this.dialog = false;
        },
        newRecord: function () {
            if (this.record == null) {
                const Record = new Parse.Object.extend('Record');
                this.record = new Record();
            }
            
        },
        saveRecord: async function () {
            if (this.status == 'Arrived') {

                this.options.splice(0,2);
                this.options.push("Delete");

                this.record.set("arrive", this.arrivalTime);
            }
            else if (this.status == 'Departed') {

                this.options.splice(2,1);
                this.options.push("Delete");

                this.record.set("depart", this.departureTime);
                this.record.set("visitor", this.person);
                await this.record.save();
            }
            else if (this.status == 'Expected') {

                this.options.splice(1,1);
                this.options.push("Delete");
            }
            else if (this.status == 'Delete') {
                this.options = ["Arrived","Expected","Departed"];
                this.status = "Absent";
                this.select = null;
                this.dialog = false;
                this.departureTime = null;
                this.arrivalTime = null;
                this.record = null;
            }
            this.cancel();
        },
        getDate: function () {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            return time;
        }
    }
}
</script>

<style scoped>
</style>