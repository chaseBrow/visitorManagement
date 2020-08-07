<template>
  	<v-container>
    	<v-row>
			<v-col cols="6" class="secondary" >
				<v-row>
					<span style="padding: 0px 0px 0px 20px; font-size: 32px; font-weight: bold;">Account Information</span>
					<v-spacer></v-spacer>
					<div id="edit">
						<v-btn class="mr-6 mt-2 accent" v-on:click="editBtn()">
							Edit
						</v-btn>
					</div>
					<div id="save" style="display: none">
						<v-btn class="mr-3 mt-2 success" v-on:click="saveBtn()">
							Save
						</v-btn>
					</div>
					<div style="display: none" id="cancel"> 
						<v-btn class="mr-3 mt-2 info" v-on:click="cancelBtn()">
							Cancel
						</v-btn>
					</div>
				</v-row>
				<div>
					<v-text-field label="Username" v-bind="{readonly: !edit, rounded: !edit, outlined: edit}" 
						background-color="secondary" v-model="user.username" style="font-size: 18px"
					> 
					</v-text-field>
					<v-text-field label="Email" v-bind="{readonly: !edit, rounded: !edit, outlined: edit}" 
						background-color="secondary" v-model="user.email" style="font-size: 18px"
					> 
					</v-text-field>
				</div>
				<v-row>
					<v-btn class="ml-6 accent">
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

		<v-dialog v-model="dialog" persistent width="400px">
			<v-card>
				<v-card-title>
					Enter Password
				</v-card-title>
				<v-text-field type="password" v-bind="{error: error}" :error-messages="errorMsg" class="mx-5" outlined label="password" v-model="user.password">
				</v-text-field>
				<div class="d-flex justify-center">
					<v-btn class="success mb-5" v-on:click="submitBtn()">
						Submit
					</v-btn>
				</div>
			</v-card>
		</v-dialog>


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
					password: null,
				},
				edit: false,
				dialog: false,
				error: false,
				errorMsg: null,
			}
		},
		beforeMount () {
			this.getUser();
		},
		methods: {
			submitBtn: async function () {
				await Parse.User.logIn(this.user.username, this.user.password).then((user) => {
					user.set('username', this.user.username);
					user.set('email', this.user.email);
				}, (error) => {
					this.error = true;
					this.errorMsg = error.message;
				});
			},
			editBtn: function () {
				this.edit = true;
				let edit, save, cancel;
				
				edit = document.getElementById('edit');
				edit.style.display = 'none';	

				save = document.getElementById('save');
				save.style.display = 'inline';
				
				cancel = document.getElementById('cancel');
				cancel.style.display = 'inline';

				// this.user.password = 
			},
			saveBtn: function () {
				this.dialog = true;

				this.edit = false;

				let edit, save, cancel;

				edit = document.getElementById('edit');
				edit.style.display = 'inline';

				save = document.getElementById('save');
				save.style.display = 'none';

				cancel = document.getElementById('cancel');
				cancel.style.display = 'none';
			},
			cancelBtn: function () {
				this.edit = false;

				let edit, save, cancel;

				edit = document.getElementById('edit');
				edit.style.display = 'inline';

				save = document.getElementById('save');
				save.style.display = 'none';

				cancel = document.getElementById('cancel');
				cancel.style.display = 'none';

				this.getUser();
			},
			getUser: function () {
				let User = Parse.User.current();
				this.user.username = User.get('username');
				this.user.email = User.get('email');
				
			}

		}
  	};
</script>
<style scoped>

</style>
