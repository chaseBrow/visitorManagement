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
    props: 
        [
            "selectedtest"
        ],
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
            console.log("open companies made");
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
    computed: {
        selectedCompany: function () {
            console.log("test");
            console.log(this.selectedtest);
            return this.selectedtest;
        } 
    },
    methods: {
		getCompanies: async function () {
			const user = Parse.User.current();
            const Users = new Parse.Query(Parse.User);
			Users.equalTo("parentCompany", user);

			this.companies = await Users.find();
			
            this.companies.push(user);
            this.searchCompanies();
		},
		searchCompanies: async function () {
            let temp = [];
			temp = this.companies.filter(company => {
                if(this.filter && company.get("name").toLowerCase().includes(this.filter.toLowerCase())) {
                    return true;
                }
                else {
                    return true;
                }
			});
            this.filteredCompanies = []
			temp.forEach( e =>{
				this.filteredCompanies.push(e.get("name"));
            })
		},
    }
}
</script>

<style scoped>

</style>