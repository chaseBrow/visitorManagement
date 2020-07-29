<template>
    <v-container class="ma-0 pa-0">
        <v-dialog :v-model="test" width="300px" class="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="primary">
                    <v-icon dense class="pr-1">mdi-card-account-details-outline</v-icon>
                    <span>More Info</span>
                </v-btn>
            </template>
            <v-form>
                <v-card>
                    <v-card-title> This is some info TEST
                    </v-card-title>
                    <v-card-actions>
                        <v-btn v-on:click="cancel()">
                            Cancel
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    date () {
        return {
            dialog: false,
            test: false,
        }
    },
    methods: {
        cancel: function () {
            this.dialog = false;
            console.log(this.dialog);
        }

    }
    
}
</script>
<style scoped>

</style>