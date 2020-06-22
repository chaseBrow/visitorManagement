<template>
	<v-container fluid fill-height background>
		<v-row class="mx-4" style="height: 100%">
			<v-col cols="12" class="primary" style="border-radius: 10px 10px 0px 0px; height: auto">
				<v-form>
					<v-text-field label="First Name" outlined color="black"></v-text-field>
				</v-form>
			</v-col>
			<v-col cols="12" class="secondary" style="border-radius: 0px 0px 10px 10px; height: auto">

			</v-col>	
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