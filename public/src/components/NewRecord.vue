<template>
	<v-container class="ma-0 pa-0">
		<v-btn v-if="statIcon == 'Expected'" fab x-small class="expected">
			<v-icon>mdi-clock-time-eight-outline</v-icon>
		</v-btn>
		<v-btn v-else-if="statIcon == 'Arrived'" fab x-small class="arrived">
			<v-icon>mdi-login</v-icon>
		</v-btn>
		<v-btn v-else-if="statIcon == 'Departed'" fab x-small class="departed">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" persistent width="300px" class="primary">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					class="mr-1 accent"
					v-on:click="newRecord()"
					style="padding: 0 16px 0 6px"
					:disabled="isRestricted()"
					dark
				>
					<v-icon dense class="pr-1">mdi-plus</v-icon>
					<span>Visit</span>
				</v-btn>
			</template>
			<v-form>
				<v-card class="pa-4">
					<v-card-title>
						Visit Log
					</v-card-title>
					<v-text-field
						:disabled="status !== 'Arrived'"
						label="Arrival"
						:value="arrivalTime"
						type="time"
					></v-text-field>

					<v-text-field
						:disabled="status !== 'Departed'"
						label="Departure"
						:value="departureTime"
						type="time"
					></v-text-field>

					<v-select
						v-model="select"
						:placeholder="status"
						label="Status"
						:items="options"
						v-on:change="visitStatus()"
					></v-select>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn v-on:click="cancel()" outlined color="info">Cancel</v-btn>
						<v-btn v-on:click="saveRecord()" color="accent">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
	</v-container>
</template>
<script>
import Parse from "parse";
export default {
	props: ["person"],
	data() {
		return {
			options: ["Arrived", "Expected"],
			select: null,
			dialog: false,
			record: null,
			status: "Absent",
			statIcon: "",
			arrivalTime: null,
			departureTime: null
		};
	},
	created() {
		this.newRecord();
	},
	methods: {
		isRestricted: function() {
			if(this.person.get('company').get('restricted')) {
				if(this.person.get('company').id == Parse.User.current().id) return false;
				else if(this.status != "Absent") return false;
				else return true;
			}
			else return false;
		},
		visitStatus: function() {
			this.status = this.select;
			if (this.status == "Arrived") {
				this.arrivalTime = this.toTime(this.getDate());
			} else if (this.status == "Departed") {
				this.departureTime = this.toTime(this.getDate());
			}
		},
		cancel: function() {
			this.select = null;
			this.dialog = false;

			if (this.record.get("status")) {
				this.status = this.record.get("status");
			} else this.status = "Absent";

			if (this.record.get("arrive")) {
				this.arrivalTime = this.toTime(this.record.get("arrive"));
			} else this.arrivalTime = null;

			if (this.record.get("depart")) {
				this.departureTime = this.toTime(this.record.get("depart"));
			} else this.departureTime = null;
		},
		newRecord: async function() {
			const Record = new Parse.Object.extend("Record");
			const recQueryArr = new Parse.Query(Record);
			recQueryArr.equalTo("visitor", this.person);
			recQueryArr.doesNotExist("arrive");

			const recQueryDep = new Parse.Query(Record);
			recQueryDep.equalTo("visitor", this.person);
			recQueryDep.doesNotExist("depart");

			let mainQuery = Parse.Query.or(recQueryArr, recQueryDep);

			let peep = await mainQuery.first();
			if (peep) {
				this.record = peep;
				this.status = this.record.get("status");
				if (this.record.get("arrive")) {
					this.arrivalTime = this.toTime(this.record.get("arrive"));
				}
				if (this.record.get("depart")) {
					this.departureTime = this.toTime(this.record.get("depart"));
				}
				if (this.status == "Arrived") this.options = ["Departed", "Delete"];
				if (this.status == "Departed") this.options = ["Arrived", "Expected"];
				if (this.status == "Expected") this.options = ["Arrived", "Delete"];
			} else {
				this.record = new Record();
				this.record.set("visitor", this.person);
			}
			this.getStatus();
		},
		saveRecord: async function() {
			if (this.status == "Arrived") {
				this.options = ["Departed", "Delete"];

				this.record.set("status", this.status);
				this.record.set("arrive", this.getDate());
				await this.record.save();
			} else if (this.status == "Departed") {
				this.options = ["Arrived", "Expected"];

				this.record.set("status", this.status);
				this.record.set("depart", this.getDate());
				await this.record.save();

				this.select = null;
				this.dialog = false;
				this.record = null;
				this.status = "Absent";
				this.arrivalTime = null;
				this.departureTime = null;

				if (this.person.get("access") == "Guest" || this.person.get('access') == "Contractor") {
					this.person.set("deleted", true);
					await this.person.save();
				}
			} else if (this.status == "Expected") {
				this.options = ["Arrived", "Delete"];

				this.record.set("status", this.status);
				this.record.set("visitor", this.person);
				await this.record.save();
			} else if (this.status == "Delete") {
				this.options = ["Arrived", "Expected"];
				await this.record.destroy();

				if (this.person.get("access") == "Guest" || this.person.get("access") == "Contractor") {
					this.person.set("deleted", true);
					await this.person.save();
				}
			}
			this.dialog = false;
			this.getStatus();
		},
		getDate: function() {
			let today = new Date();
			return today;
		},
		toTime: function(date) {
			if (date) {
				let time = date.toTimeString().split(" ")[0];
				time = time.slice(0, -3);
				return time;
			} else return null;
		},
		getStatus: async function() {
			if (this.status !== "Absent") {
				this.statIcon = this.status;
			} else {
				this.statIcon = await this.getDeparted(this.person);
			}
		},
		getDeparted: async function(person) {
			const Record = Parse.Object.extend("Record");
			const recQuery = new Parse.Query(Record);
			recQuery.greaterThan("depart", this.getYesterday());
			recQuery.descending("updatedAt");
			recQuery.equalTo("visitor", person);
			let item = await recQuery.first();
			if (item) return "Departed";
			else return "Absent";
		},
		getYesterday: function() {
			let date = new Date();
			let yesterday = date.setTime(date.getTime() - 86400000);
			return new Date(yesterday);
		}
	}
};
</script>

<style scoped>
.v-btn.expected {
	background-color: orange !important;
	position: relative;
	right: -12px;
	z-index: 1;
}
.v-btn.arrived {
	background-color: green !important;
	position: relative;
	right: -12px;
	z-index: 1;
}
.v-btn.departed {
	background-color: red !important;
	position: relative;
	right: -12px;
	z-index: 1;
}
</style>
