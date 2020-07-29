<template>
    <v-container class="ma-0 pa-0">
        <v-dialog v-model="dialog" width="80%" class="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="primary" v-on:click="getInfo()">
                    <v-icon dense class="pr-1">mdi-card-account-details-outline</v-icon>
                    <span>Info</span>
                </v-btn>
            </template>
            <v-form>
                <v-card class="pa-4">
                    <v-card-title>
                        Visitor Information
                    </v-card-title>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Last Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete outlined label="Company" color="black" cache-items hide-no-data
								:items="companyFinal"
      							:search-input.sync="searchComp"
								v-model="company"
							>
							</v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="First Name" outlined>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    props: ['person'],
    data () {
        return {
            dialog: false,
            companyFinal: [],
			searchComp: null,
			company: '',
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