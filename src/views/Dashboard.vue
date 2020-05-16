<template>
  <v-container style="height: 100%">
    <v-row style="height: 100%">
      <v-col cols="12" md="4" lg="4" xl="4" class="blue" >
        <v-sheet class="red ml-2">
          <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary" type="week"
          style="margin: 5%; padding-top: 5%"></v-calendar>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="8" lg="8" xl="8" class="red">
        <span> test 2 </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    today: '2019-01-08',
    events: [
      {
        name: 'Weekly Meeting',
        start: '2019-01-07 09:00',
        end: '2019-01-07 10:00',
      },
      {
        name: 'Thomas\' Birthday',
        start: '2019-01-10',
      },
      {
        name: 'Mash Potatoes',
        start: '2019-01-09 12:30',
        end: '2019-01-09 15:30',
      },
    ],
  }),
  mounted() {
    this.$refs.calendar.scrollToTime('08:00')
  }
}
</script>
<style scoped>

</style>
