<template>
  	<v-container>
    	<v-row>
			<v-col cols="8" class="secondary" >
				<v-row>
					<v-col cols="9">
						<span style="font-size: 32px; font-weight: bold;">Account Information</span>
					</v-col>
					<v-col cols="3" class="d-flex align-center justify-center" >
						<v-btn style="font-size: 18px;"> Edit Profile</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="8">
						<v-text-field label="Username" rounded readonly background-color="secondary" v-model="testUser">
						</v-text-field>
						<v-text-field label="Password" rounded readonly background-color="secondary" v-model="password">
						</v-text-field>
						<v-text-field label="Email" rounded readonly background-color="secondary" v-model="email">
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
		data () {
			return {
				testUser: "testUser",
				password: "******",
				email: "test@aunalytics.com"
			}
		},
  		components: {

		},
		methods: {

		}
  	};
</script>
<style scoped>

</style>
