<template>
	<v-app-bar app dense class="secondary">
		<v-app-bar-nav-icon  v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
		<v-toolbar-title class="text-uppercase">
			<span class="font-weight-light" style="font-size: x-large"> Visitor</span>
			<span class="font-weight-bold" style="font-size: x-large">Management</span>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<VisitorInfo v-if="['home'].indexOf($route.name) <= -1">
		</VisitorInfo>
		<v-btn class="primary" v-if="['home'].indexOf($route.name) <= -1" v-on:click="logOut()">
			<span class="mr-1 black--text">Sign Out</span>
			<v-icon color="black">mdi-exit-to-app</v-icon>
		</v-btn>
		<v-btn class="primary" v-if="['home'].indexOf($route.name) == 0" v-on:click="login()">
			<span class="mr-1 black--text">Login</span>
			<v-icon color="black">mdi-exit-to-app</v-icon>
		</v-btn>

		<v-navigation-drawer  v-model="drawer" class="secondary" app temporary>
			
			<v-list>
				<v-list-item v-for="link in links" :key="link.text" :to="link.route" >
					<v-list-item-action>
						<v-icon class="white--text">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text">
							{{ link.text }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-app-bar>
</template>

<script>
import VisitorInfo from "./VisitorInfo"
import Parse from "parse"

export default {
	components: {
		VisitorInfo
	},
	data() {
		return {
			drawer: false,
			loggedIn: false,
			user: null,
			links: [
				{ icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/Dashboard' },
				{ icon: 'mdi-folder-clock-outline', text: 'Visit History', route: '/RecordHistory' },
				{ icon: 'mdi-cog', text: 'Account Settings', route: '/Account' },
			]
		}
	},
	methods: {
		logOut: async function () {
			await Parse.User.logOut();
			this.$router.push('/');
		},
		login: async function () {
			await Parse.User.logIn(this.username, this.password);
			this.$router.push("dashboard");
        }
	}
}
</script>
<style scoped>

</style>