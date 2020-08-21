<template>
    <v-container fluid fill-height class="pa-0">
		<v-row class="top">
		</v-row>
		<v-row>
		</v-row>


        <!-- <v-card class="elevation-12">
			<v-toolbar color="primary" dark flat>
				<v-toolbar-title>
					Login form
				</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-form>
					<v-text-field
						v-model="username"
						label="Username"
						prepend-icon="mdi-account"
						type="text"
					></v-text-field>

					<v-text-field
						v-model="password"
						label="Password"
						prepend-icon="mdi-lock"
						type="password"
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" v-on:click="login()">Login</v-btn>
			</v-card-actions>
		</v-card> -->
    </v-container>
</template>
<script>
import Parse from "parse"
export default {
    data() {
        return {
		   password: "",
		   username: "",
        }
	},
	
    methods: {
        login: async function () {
			await Parse.User.logIn(this.username, this.password);
			this.$router.push("dashboard");
        }
    }
}
</script>

<style scoped>
.top {
	height: 100%;
	width: 100%;
	background: linear-gradient(225deg, rgba(93,18,58,1) 0%, rgba(158,31,99,0.59) 100%);
}
</style>