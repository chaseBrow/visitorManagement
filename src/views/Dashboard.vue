<template>
	<v-container fluid fill-height background>
		<v-row class="mx-4" style="height: 100%">
			<v-form style="border-radius: 10px 10px 0px 0px; height: auto; width: 100%" class="primary">
				<v-container>	
					<v-row>
						<v-col cols="2">
							<v-text-field  label="First Name" outlined color="black"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-text-field  label="Last Name" outlined color="black"></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-text-field  label="Company" outlined color="black"></v-text-field>
						</v-col>
						<v-col cols="3">
							<v-text-field label="Email" outlined color="black"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
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