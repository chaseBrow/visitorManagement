<template>
	<v-container fill-height primary>
		<v-row style="height: 35%">
			<v-col cols="12" class="blue"></v-col>	
			<v-col cols="12" class="green"></v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
data: () => ({
test: false,
engagements: [
	{
engagement: 'Lunch meeting',
who: 'Jonny Rose',
when: '11:30am',
where: 'Groton Town House',
completed: false
	},
]
}),
}

</script>

<style scoped>

.listItem:hover {
background:lightgray;
}
</style>