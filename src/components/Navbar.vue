<template>
	<nav>
		<v-toolbar flat app class="primary">
			<v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase">
				<span class="font-weight-light" style="font-size: x-large"> Visitor</span>
				<span class="font-weight-bold" style="font-size: x-large">Management</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn text>
				<span>New Vistor</span>
				<v-icon>mdi-account-plus</v-icon>
			</v-btn>
			<v-btn text >
				<span>Sign Out</span>
				<v-icon>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-toolbar>

		<v-navigation-drawer  v-model="drawer" class="secondary" temporary app>
			<v-list>
				<v-list-item v-for="link in links" :key="link.text" router :to="link.route">
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
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,
				links: [
					{ icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
					{ icon: 'mdi-calendar-check', text: 'Calendar', route: '/Calendar' },
					{ icon: 'mdi-clipboard-text', text: 'Engagements', route: '/Engagements' },
					{ icon: 'mdi-cog', text: 'Settings', route: '/Settings' },
				]
			}
		}

	}
</script>
<style scoped>

</style>