<template>
	<v-app-bar app dense class="secondary">
		<v-app-bar-nav-icon  v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
		<v-toolbar-title class="text-uppercase">
			<span class="font-weight-light" style="font-size: x-large"> Visitor</span>
			<span class="font-weight-bold" style="font-size: x-large">Management</span>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<VisitorInfo>
		</VisitorInfo>
		<v-btn class="primary">
			<span class="mr-1 black--text">Sign Out</span>
			<v-icon color="black">mdi-exit-to-app</v-icon>
		</v-btn>

		<v-navigation-drawer  v-model="drawer" class="secondary" app>
			
			<v-list>
				<v-list-item v-for="link in links" :key="link.text" :to="link.route" >
					<v-list-item-action>
						<v-icon class="white--text">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text" v-on:click="console.log('test')">
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

export default {
	components: {
		VisitorInfo
	},
	data() {
		return {
			drawer: false,
			links: [
				{ icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/Dashboard' },
				{ icon: 'mdi-folder-clock-outline', text: 'Visit History', route: '/RecordHistory' },
				{ icon: 'mdi-cog', text: 'Account Settings', route: '/Account' },
			]
		}
	},
	methods: {
	}
}
</script>
<style scoped>

</style>