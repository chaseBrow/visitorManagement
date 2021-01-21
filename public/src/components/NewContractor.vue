<template>
	<v-menu left v-model="menu" :close-on-content-click="false">
		<template v-slot:activator="{ on, attrs }">
			<v-btn class="mr-2 accent" v-bind="attrs" v-on="on">
				<span class="mr-1 primary--text">New Contractor</span>
				<v-icon color="white">mdi-account-plus</v-icon>
			</v-btn>
		</template>
		<v-form ref="form">
			<v-card class="pa-4">
				<v-row>
					<v-col>
						<v-text-field
							label="First Name"
							outlined
							color="accent"
							v-model="contractor.firstName"
							:rules="contractor.firstNameRules"
						>
						</v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							label="Last Name"
							outlined
							color="accent"
							v-model="contractor.lastName"
							:rules="contractor.lastNameRules"
						>
						</v-text-field>
					</v-col>
				</v-row>
                <v-row>
					<v-col>
						<v-text-field
							label="Email"
							outlined
							color="accent"
							v-model="contractor.email"
							:rules="contractor.emailRules"
						>
						</v-text-field>
					</v-col>
				</v-row>
                <v-row>
                    <v-textarea
						outlined
						color="accent"
						label="Notes"
						rows="6"
						v-model="contractor.notes"
                    >
					</v-textarea>
                </v-row>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						class="mr-3"
						elevation="0"
						color="info"
						outlined
						v-on:click="clear()"
					>
						Clear
					</v-btn>
					<v-btn class="success mr-3" v-on:click="saveContractor()">
						Submit
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-menu>
</template>
<script>

import Parse from "parse";
export default {
	data() {
		return {
			contractor: {
				notes: "Expected Date:\nExpected Time:\nContractor's Company:\nPurpose:\nCabinet:\nOther:",
				email: null,
				emailRules: [
					v => !!v || "Email is a required field."
				],
				firstName: null,
				firstNameRules: [
					v => !!v || "First Name is a required field.",
					v => /^[a-zA-Z]+$/.test(v) || "Invalid First Name"
				],
				lastName: null,
				lastNameRules: [
					v => !!v || "Last Name is a required field.",
					v => /^[a-zA-Z]+$/.test(v) || "Invalid Last Name."
				]
			},
			menu: false,
			record: null
		};
	},

	methods: {
		clear: function() {
			this.$refs.form.reset();
			this.contractor.notes = "Expected Date:\nExpected Time:\nContractor's Company:\nPurpose:\nCabinet:\nOther:";
		},
		saveContractor: async function() {
			if (this.$refs.form.validate() == true) {
				const Visitor = Parse.Object.extend("Visitor");
				let person = new Visitor();

				let comp = Parse.User.current();

				person.set("firstName", this.contractor.firstName);
				person.set("lastName", this.contractor.lastName);
				person.set("company", comp);
				person.set("access", "Contractor");
				person.set("email", this.contractor.email);
				person.set("notes", this.contractor.notes);
				await person.save();

				const Record = new Parse.Object.extend("Record");
				this.record = new Record();
				this.record.set("visitor", person);
				this.record.set("status", "Expected");
				await this.record.save();

				this.clear();
				this.menu = !this.menu;
			}
		},
	}
};
</script>

<style scoped></style>
