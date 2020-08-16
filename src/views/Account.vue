<template>
  	<v-container background fill-height fluid>
    	<v-row class="mx-4 d-flex justify-center primary" style="height: 35%">
			<v-col cols="6" class="primary" style="height: 100%">
				<v-row>
					<span style="padding: 0px 0px 0px 20px; font-size: 32px; font-weight: bold;">Account Information</span>
					<span style="width: 20%"></span>
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
						v-model="user.tempName" style="font-size: 18px"
					> 
					</v-text-field>
					<v-text-field label="Email" v-bind="{readonly: !edit, rounded: !edit, outlined: edit}" 
						 v-model="user.tempEmail" style="font-size: 18px"
					> 
					</v-text-field>
				</div>
				<v-row>
					<v-btn class="ml-6 accent" v-on:click="resetPassword(user.email)">
						Reset Password
					</v-btn>
				</v-row>
			</v-col>
			<v-col cols="4" class="primary" style="height: 100%">
				<v-toolbar class="secondary" style="font-weight: bold; height: 30%">
					<v-toolbar-title class="primary--text"> 
						Access Options
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn fab x-small class="accent mr-3" v-on:click="addAccessOption()">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-toolbar>
				<v-list class="access secondary" style="height: 70%; border-radius: 0">
					<v-list-item v-for="option in accessOptions" :key="option" style="border-radius: 0">
						<span class="primary--text">{{ option }}</span>
						<v-spacer> </v-spacer>
						<v-btn fab x-small class="accent" v-on:click="deleteAccessOption(option)">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-col>
    	</v-row>
		<v-row class="mx-4" style="height: 65%">
			<v-col cols="12" class="primary" style="height: 100%">
				<v-toolbar class="secondary primary--text" style="height: 13%">
					<div style="width: 25%">
						Client Name
					</div>
					<div style="width: 25%">
						Client Username
					</div>
					<div style="width: 25%">
						Email
					</div>
					<v-spacer>
					</v-spacer>
					<v-btn fab x-small class="accent mr-3" v-on:click="addClient()">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
					<!-- <div style="width: 25%">
						Password
					</div> -->
				</v-toolbar>
				<v-list class="client secondary" style="border-radius: 0; height: 87%">
					<v-list-item v-for="client in clients" :key="client.username">
						<span class="primary--text" style="width: 25%"> {{ client.get('name') }}</span>
						<span class="primary--text" style="width: 25%"> {{ client.get('username') }}</span>
						<span class="primary--text" style="width: 25%"> {{"null"}} </span>
						<v-spacer></v-spacer>
						<v-btn class="accent">Reset Password</v-btn>
						<v-btn fab x-small class="accent ml-5" v-on:click="deleteClient(client)">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>

		<v-dialog v-model="dialog" persistent width="400px">
			<v-card>
				<v-card-title>
					Enter Password
				</v-card-title>
				<v-text-field type="password" v-bind="{error: error}" :error-messages="errorMsg" class="mx-5" outlined label="password" v-model="user.tempPassword">
				</v-text-field>
				<div class="d-flex justify-space-around">
					<v-btn class="success mb-5" v-on:click="submitBtn()">
						Submit
					</v-btn>
					<v-btn class="accent mb-5" v-bind="{loading: cancelLoading}" v-on:click="submitCancel()">
						Cancel
					</v-btn>
				</div>
			</v-card>
		</v-dialog>

		<v-dialog v-model="accessDialog" persistent width="400px">
			<v-card>
				<v-card-title>
					Enter Access Name
				</v-card-title>
				<v-text-field class="mx-5" outlined label="Name" v-model="newAccessOption">
				</v-text-field>
				<div class="d-flex justify-space-around">
					<v-btn class="success mb-5" v-on:click="submitAccessBtn()">
						Submit
					</v-btn>
					<v-btn class="accent mb-5" v-on:click="cancelAccessBtn()">
						Cancel
					</v-btn>
				</div>
			</v-card>
		</v-dialog>

		<v-dialog v-model="clientDialog" persistent width="400px">
			<v-card>
				<v-card-title>
					Enter Client Information
				</v-card-title>
				<v-text-field class="mx-5" outlined label="Name" v-model="newClient.name">
				</v-text-field>
				<v-text-field class="mx-5" outlined label="Username" v-model="newClient.username">
				</v-text-field>
				<v-text-field class="mx-5" outlined label="Email" v-model="newClient.email">
				</v-text-field>
				<!-- backend job for sending email to client -->
				<div class="d-flex justify-space-around">
					<v-btn class="success mb-5" v-on:click="submitClientBtn()">
						Submit
					</v-btn>
					<v-btn class="accent mb-5" v-on:click="cancelClientBtn()">
						Cancel
					</v-btn>
				</div>
			</v-card>
		</v-dialog>



		
		<v-alert class="alert" dismissible type="error" prominent v-model="resPassErr">
			An error occurred while resetting password.<br/> Please contact support.
		</v-alert>
		<v-alert class="alert" dismissible type="success" prominent v-model="resPassSuc">
			An email has been sent to the account's inbox.
		</v-alert>
  	</v-container>
</template>

<script>
import Parse from 'parse'
  	export default {
		data () {
			return {
				user: {
					tempName: null,
					username: "testUser",
					tempEmail: null,
					email: null,
					tempPassword: null,
					password: null,
				},
				newClient: {
					name: null,
					username: null,
					email: null,
				},
				clients: [],
				edit: false,
				dialog: false,
				accessDialog: false,
				clientDialog: false,
				error: false,
				errorMsg: null,
				accessOptions: [],
				newAccessOption: null,
				cancelLoading: false,
				resPassErr: false,
				resPassSuc: false,
			}
		},
		beforeMount () {
			this.getUser();
			this.getAccessOptions();
			this.getClients();
		},
		methods: {
			getClients: async function () {
				const Clients = new Parse.Query(Parse.User);
				Clients.equalTo('parentCompany', Parse.User.current());
				// Clients.notEqualTo('deleted', true);
				this.clients = await Clients.find();
				console.log(this.clients);
			},
			getUser: function () {
				let User = Parse.User.current();
				this.user.tempName = User.get('username');
				this.user.username = User.get('username');
				this.user.tempEmail = User.get('email');
				this.user.email = User.get('email');
			},
			getAccessOptions: async function () {
				let user = Parse.User.current();
				this.accessOptions = user.get("options");
			},
			resetPassword: function (email) {
				Parse.User.requestPasswordReset(email).then(() => {
					this.resPassSuc = true;
				}, (error) => {
					console.log(error);
					this.resPassErr = true;
				});
				//this is also a backend job
			},
			deleteClient: async function (client) {
				console.log(client);
				//this is a backend job
			},
			addClient: async function () {
				if (!this.user.password){
					this.dialog = true;
					this.$once('password-correct', function () {
						this.clientDialog = true;
					});
				}
				else{
					this.clientDialog = true;
					this.$once('access-name', function () {
						new Parse.Object("client");
					});
					
					this.getClients();
				}
			},
			submitClientBtn: function () {
				this.$emit("new-client");
				this.clientDialog = false;
				console.log("submit");
			},
			cancelClientBtn: function () {
				this.clientDialog = false;
				console.log("cancel");
			},
			submitAccessBtn: function () {
				this.$emit("access-name");
			},
			cancelAccessBtn: function () {
				this.newAccessOption = null;
				this.accessDialog = false;
			},
			addAccessOption: function () {
				if (!this.user.password){
					this.dialog = true;
					this.$once('password-correct', function () {
						Parse.User.logIn(this.user.username, this.user.password).then((user) => {
							this.accessDialog = true;
							this.$once('access-name', function () {
								if (this.newAccessOption) {
									this.accessOptions.push(this.newAccessOption);
									user.set('options', this.accessOptions);
									user.save();
								}
								this.cancelAccessBtn();
							});
							this.getAccessOptions();
						});
					});
				}
				else{
					Parse.User.logIn(this.user.username, this.user.password).then((user) => {
						this.accessDialog = true;
						this.$once('access-name', function () {
							if (this.newAccessOption) {
								this.accessOptions.push(this.newAccessOption);
								user.set('options', this.accessOptions);
								user.save();
							}								
							this.cancelAccessBtn();
						});
						
						this.getAccessOptions();
					});
				}
			},
			deleteAccessOption: async function (optionName) {
				if (!this.user.password){
					this.dialog = true;
					this.$once('password-correct', function () {
						Parse.User.logIn(this.user.username, this.user.password).then((user) => {
							let val = this.accessOptions.indexOf(optionName);
							if (val !== -1) {
								this.accessOptions.splice(val, 1);
								user.set('options', this.accessOptions);
								user.save();
							}
							this.getAccessOptions();
						});
					});
				}
				else{
					Parse.User.logIn(this.user.username, this.user.password).then((user) => {
						this.accessOptions.splice(this.accessOptions.indexOf(optionName), 1)
						user.set('options', this.accessOptions);
						user.save();
						this.getAccessOptions();
					});
				}
			},
			submitBtn: async function () {
				await Parse.User.logIn(this.user.username, this.user.tempPassword).then(() => {
					this.user.password = this.user.tempPassword;
					this.$emit('password-correct');
					this.dialog = false;
				}, (error) => {
					this.error = true;
					this.errorMsg = error.message;
				});
			},
			submitCancel: function () {
				this.user.tempName = this.user.username;
				this.user.tempEmail = this.user.email;
				this.user.tempPassword = null;
				this.error = false;
				this.errorMsg = null;
				this.dialog = false;
				this.cancelLoading = true;
				location.reload();
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
			},
			saveBtn: async function () {
				this.error = false;
				this.errorMsg = null;
				this.user.tempPassword = null;

				if (!this.user.password) {
					this.dialog = true;
					this.$once('password-correct', function () {
						Parse.User.logIn(this.user.username, this.user.password).then((user) => {
						
							user.set('username', this.user.tempName);
							user.set('email', this.user.tempEmail);
							user.save();
							this.getUser();
						});
					});
				}
				else {
					Parse.User.logIn(this.user.username, this.user.password).then((user) => {
						user.set('username', this.user.tempName);
						user.set('email', this.user.tempEmail);
						user.save();
						this.getUser();
					});
				}
				
				

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
		}
  	};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
	background: black;
}
::-webkit-scrollbar-thumb {
	background: #9e1f63;
	border-radius: 8px;
}
.v-list.access {
	overflow-y: scroll;
}
.v-list.client {
	overflow-y: scroll;
}
.v-list-item:hover {
	background: #454545;
} 
.alert {
	position: fixed;
	width: 500px;
	top: 8%;
	left: 50%;
	margin-left: -250px;
}
</style>
