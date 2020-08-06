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
						<v-text-field label="Username" rounded readonly background-color="secondary" v-model="user.username" style="font-size: 18px">
						</v-text-field>
						<v-text-field label="Password" rounded readonly background-color="secondary" v-model="user.password" style="font-size: 18px">
						</v-text-field>
						<v-text-field label="Email" rounded reasdonly background-color="secondary" v-model="user.email" style="font-size: 18px"> 
							<!-- add outlined and remove readonly -->
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
import Parse from 'parse'
  	export default {
		data () {
			return {
				user: {
					username: "testUser",
					passwordHid: this.passwordHide,
					password: null,
					email: null,
				},
			}
		},
		computed: {
			passwordHide: function () {
				let pass = "";
				for (let i = 1; i <= this.password.length; i += 1) {
					pass += "*";
				}
				console.log("hi")
				return pass;
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
				this.user.password = User.get('password');
				console.log(User.get('password'));
				this.user.email = User.get('email');
			}

		}
  	};
</script>
<style scoped>

</style>
