<template>
    <v-dialog v-model="dialog" width="300px" class="primary" v-if="hidden">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mr-6 primary" v-if="hidden" style="padding: 0 16px 0 6px">
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
                    :disabled="arrive"
                    label="Arrival"
                    value="12:30:00"
                    type="time"
                ></v-text-field>
                
                <v-text-field
                    :disabled="depart"
                    label="Departure"
                    value="12:30:00"
                    type="time"
                ></v-text-field>

                <v-select
                    v-model="select"
                    placeholder="Absent"
                    label="Status"
                    :items="options"
                    v-on:change="visitStatus"
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
export default {
    props: ['person'],
    data() {
        return {
            options: [
                "Arrived",
                "Departed",
                "Expected",
            ],
            arrive: true,
            depart: true,
            select: "",
            dialog: false
        }
    },
    methods: {
        visitStatus: function() {
            console.log(this.select);
            if (this.select == "Arrived" || this.select == "Expected") {
                this.arrive = false;
            }
            if (this.select == "Departed") {
                this.depart = false;
            }
        },
        cancel: function() {
            this.dialog = false;
            console.log("clear");
        },
        saveRecord: function() {
            console.log("save");
            console.log(this.person)
        }
    }
}
</script>

<style scoped>
</style>