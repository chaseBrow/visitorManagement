<template>
	<v-dialog>
		<template v-slot:activator="{ on, attrs }">
			<v-btn class="accent" v-bind="attrs" v-on="on" v-on:click="login()">
				<span class="mr-1 primary--text">Login</span>
				<v-icon color="white">mdi-exit-to-app</v-icon>
			</v-btn>
		</template>
		<v-form> </v-form>
	</v-dialog>
</template>
<script>
import Parse from "parse";

export default {
	data() {
		return {};
	},
	methods: {
		logOut: async function() {
			await Parse.User.logOut();
			this.$router.push("/");
		}
	}
};
</script>
<style scoped></style>
