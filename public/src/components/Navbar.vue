<template>
	<nav>
		<v-app-bar app dense class="secondary">
			<v-app-bar-nav-icon
				v-on:click="drawer = !drawer"
				color="white"
			></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase">
				<span
					class="font-weight-light"
					style="font-size: x-large; color: white"
				>
					Visitor</span
				>
				<span class="font-weight-bold" style="font-size: x-large; color: white"
					>Mgmt</span
				>
				<span class="text-lowercase" style="font-size: x-large; color: white"
					>x</span
				>
				<span class="font-weight-bold" style="font-size: x-large; color: white"
					>AU</span
				>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<NewContractor v-if="['home'].indexOf($route.name) <= -1"> </NewContractor>
			<NewGuest v-if="['home'].indexOf($route.name) <= -1"> </NewGuest>
			<NewVisitor v-if="['home'].indexOf($route.name) <= -1"> </NewVisitor>
			<v-btn
				class="accent"
				v-if="['home'].indexOf($route.name) <= -1"
				v-on:click="logOut()"
			>
				<span class="mr-1 primary--text">Sign Out</span>
				<v-icon color="white">mdi-exit-to-app</v-icon>
			</v-btn>
			<!-- <Login v-if="['home'].indexOf($route.name) == 0"> </Login> -->
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" class="secondary" app fixed temporary>
			<v-list>
				<v-list-item v-for="link in links" :key="link.text" :to="link.route">
					<v-list-item-action>
						<v-icon class="primary--text">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="primary--text">
							{{ link.text }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
// import Login from "./Login";
import NewVisitor from "./NewVisitor";
import Parse from "parse";
import NewGuest from "./NewGuest";
import NewContractor from "./NewContractor";
export default {
	components: {
		NewVisitor,
		NewGuest,
		NewContractor
	},
	data() {
		return {
			drawer: false,
			links: [
				{ icon: "mdi-view-dashboard", text: "Dashboard", route: "/Dashboard" },
				{
					icon: "mdi-folder-clock-outline",
					text: "Visit History",
					route: "/VisitHistory"
				},
				// { icon: "mdi-cog", text: "Account Settings", route: "/Account" }
			]
		};
	},
	methods: {
		logOut: async function() {
			await Parse.User.logOut();
			this.$router.push("/");
		}
	}
};
</script>
<style scoped>
.v-list-item:hover {
	background-color: #2A6EBB;
}
</style>
