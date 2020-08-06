<template>
  	<v-container>
    	<v-row>
			<v-col cols="8" class="blue" >
				<v-row>
					<v-col cols="8">
						<span style="font-size: 32px; font-weight: bold;">Account Information</span>
					</v-col>
					<v-col cols="4">
						<v-btn> Edit </v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="8">
						<v-text-field label="Username" solo flat>
						</v-text-field>
						<v-text-field label="Password">
						</v-text-field>
						<v-text-field label="Email">
						</v-text-field>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="4" class="red">
			</v-col>
    	</v-row>
		<v-row>
			<v-col cols="12" class="green">
			</v-col>
		</v-row>
  	</v-container>
</template>

<script>
  	export default {
  		components: {

		},
		methods: {

		}
  	};
</script>
<style scoped>

</style>
