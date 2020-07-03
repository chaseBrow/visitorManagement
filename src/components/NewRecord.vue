<template>
    <v-dialog v-model="dialog" width="300px" class="primary">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mr-6 primary" style="padding: 0 16px 0 6px">
                <v-icon dense class="pr-1">mdi-plus</v-icon>
                <span>Visit</span>
            </v-btn>
        </template>
        




    </v-dialog>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>