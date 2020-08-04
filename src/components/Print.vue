<template>
  	<v-container>
    	<v-btn id='printButton' v-on:click="printBtn()">Print</v-btn>
  	</v-container>
</template>

<script>
  	export default {
        props: ['firstName', 'lastName', 'company'],
		methods: {
            printBtn: function () {
            }
		}
  	};
</script>
<style scoped>

</style>
