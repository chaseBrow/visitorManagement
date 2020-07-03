<template>
    <v-dialog v-model="dialog" width="300px" class="primary">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mr-6 primary" style="padding: 0 16px 0 6px">
                <v-icon dense class="pr-1">mdi-plus</v-icon>
                <span>Visit</span>
            </v-btn>
        </template>
        <v-form>
            <v-card>
                <v-card-title>
                    Visit Log
                </v-card-title>
                    <v-text-field
                     label="Visit"
                     value="12:30:00"
                     type="time"
                     suffix="EST"
                    ></v-text-field>
                    
                    <v-text-field
                    label="Visit"
                    value="12:30:00"
                    type="time"
                    suffix="EST"
                    ></v-text-field>

                    <v-select
                    label="Status"
                    :items="options"

                    ></v-select>



                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-on:click="clear" text>Clear</v-btn>
                    <v-btn v-on:click="saveParse" color="primary">Save</v-btn>
                </v-card-actions>

            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            options: [
                "Arrived",
                "Departed",
                "Expected",
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>