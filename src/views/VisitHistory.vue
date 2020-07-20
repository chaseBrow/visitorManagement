<template>
    <v-container background fluid fill-height>
        <v-row class="mx-4" style="height: 100%">
            <v-form class="form">
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