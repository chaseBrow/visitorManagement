<template>
    <v-menu>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2 primary" v-bind="attrs" v-on="on">
                <span class="mr-1 black--text">New Vistor</span>
                <v-icon color="black">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-row>
            <v-col cols="12" class="primary">
            </v-col>
        </v-row>





    </v-menu>

</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>