<template>
  	<v-container>
    	<v-row>
			<v-col cols="8" class="secondary" >
				<v-row>
					<span style="padding: 0px 0px 0px 20px; font-size: 32px; font-weight: bold;">Account Information</span>
				</v-row>
				<v-row>
					<v-col cols="2" class="d-flex justify-end px-0">
						<v-btn> 	
							Edit
						</v-btn>
					</v-col>
					<v-col cols="8">
						<v-text-field label="Username" rounded reasdonly background-color="secondary" v-model="user.username" style="font-size: 18px"> 
							<!-- add outlined and remove readonly -->
						</v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="2" class="d-flex justify-end px-0">
						<v-btn> 	
							Edit
						</v-btn>
					</v-col>
					<v-col cols="8">
						<v-text-field label="Email" rounded reasdonly background-color="secondary" v-model="user.email" style="font-size: 18px"> 
							<!-- add outlined and remove readonly -->
						</v-text-field>
					</v-col>
				</v-row>
				<v-row class="ml-6">
					<v-btn>
						Reset Password
					</v-btn>
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
import Parse from 'parse'
  	export default {
		data () {
			return {
				user: {
					username: "testUser",
					email: null,
				},
			}
		},
  		components: {

		},
		beforeMount () {
			this.getUser();
		},
		methods: {
			getUser: function () {
				let User = Parse.User.current();
				this.user.usernmae = User.get('username');
				this.user.email = User.get('email');
			}

		}
  	};
</script>
<style scoped>

</style>
