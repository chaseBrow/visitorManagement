<template>
    <v-container class="ma-0 pa-0">
        <v-autocomplete outlined label="Company" color="accent" cache-items hide-no-data
            :items="filteredCompanies"
            v-model="selected"
            :search-input.sync="filter"
            v-on:keyup="searchCompanies()"
            v-on:input="$emit('selected', selected)"
        >
        <!-- v-on input needs to emit data -->
        </v-autocomplete>
    </v-container>
</template>
<script>
import Parse from 'parse'
export default {
    data() {
        return {
            filter: "",
            selected: "",
            companies: [],
            filteredCompanies: []
        }
    },
    async created() {
		const Users = new Parse.Query(Parse.User);
		let liveUsers = await Users.subscribe();

		liveUsers.on('open', () => {
			console.log('open companies made')
			this.getCompanies();
		});

		liveUsers.on('delete', () => {
			this.getCompanies();
		});

		liveUsers.on('create', () => {
			this.getCompanies();
		});

		liveUsers.on('update', () => {
			this.getCompanies();
        });
        this.getCompanies();  
    },
    methods: {
		getCompanies: async function () {
			const user = Parse.User.current();
            const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			this.companies = await Users.find();
			
            this.companies.push(user);
		},
		searchCompanies: async function () {
            console.log("filtering1: " + this.filter);
			let test = this.companies.filter(company => {
				if (this.filter) {
                    console.log("filtering2: ");
                    console.log(company.get("name"));
                    let name = company.get("name").toLowerCase().includes(this.filter.toLowerCase());
				    return name;
                }
                else return false;
			});
			this.filteredCompanies = [];
			test.forEach( e =>{
                console.log(e);
				this.filteredCompanies.push(e.get("name"));
            })
            // console.log(this.filteredCompanies)
		},
    }
}
</script>

<style scoped>

</style>