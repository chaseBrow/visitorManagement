<template>
    <v-container background fluid fill-height>
        <v-row class="mx-4" style="height: 100%">
            <v-form class="form" style="height: auto">
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
            <v-col class="blue" style="border-radius:0px 0px 10px 10px; width: 100%; height: 80%">
                <v-toolbar class="orange">
                    
                </v-toolbar>
                <v-list>
                    <v-list-item v-for="record in records" :key="record">
                        <v-list-item-content>
                            {{ record }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                records: [
                    "test 1",
                    "test 2",
                    "test 3"
                ]
            }
        },
        methods: {

        },
    };
</script>
<style scoped>
.v-form.form {
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    height: 20%;
    background-color: red;
}
</style>