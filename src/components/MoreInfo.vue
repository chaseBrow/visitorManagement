<template>
    <v-container class="ma-0 pa-0">
        <v-dialog v-model="dialog" width="300px" class="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="primary" v-on:click="getInfo()">
                    <v-icon dense class="pr-1">mdi-card-account-details-outline</v-icon>
                    <span>Info</span>
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
    data () {
        return {
            dialog: false,
            test: false,
        }
    },
    methods: {
        getInfo: async function () {
            this.dialog = true;
        },
        cancel: function () {
            console.log(this.dialog);
            this.dialog = false;
        }

    }
    
}
</script>
<style scoped>

</style>