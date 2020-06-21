<template>
  <v-container fill-height>
    <v-row style="height: 100%">

      <!--  This is the Daily summary list    -->
      <v-col cols="12" md="4" style="border-radius: 10px" class="blue">
        <v-toolbar flat dark>
          <v-toolbar-title>Today's Summary</v-toolbar-title>
        </v-toolbar>

        <v-card

<!--        <v-list subheader two-line shaped elevation="24" style="max-height: 750px" class="overflow-y-auto">-->
<!--          <v-subheader>Upcoming</v-subheader>-->
<!--          <v-list-item class="listItem" v-for="engagement in engagements" :key="engagement.engagement" @click="test = !test">-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title class="font-weight-bold title">You have a {{engagement.engagement}} with {{engagement.who}}</v-list-item-title>-->
<!--              <v-list-item-subtitle class="font-weight-bold">@{{engagement.when}}</v-list-item-subtitle>-->
<!--            </v-list-item-content>-->
<!--            <v-list-item-action>-->
<!--              <v-icon>mdi-arrow-right</v-icon>-->
<!--            </v-list-item-action>-->
<!--          </v-list-item>-->
<!--          <v-subheader>Past</v-subheader>-->
<!--          <v-list-item class="listItem" v-for="engagement in engagements" :key="engagement.engagement" @click="test = !test">-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title class="font-weight-bold title">You have a {{engagement.engagement}} with {{engagement.who}}</v-list-item-title>-->
<!--              <v-list-item-subtitle class="font-weight-bold">@{{engagement.when}}</v-list-item-subtitle>-->
<!--            </v-list-item-content>-->
<!--            <v-list-item-action>-->
<!--              <v-icon>mdi-arrow-right</v-icon>-->
<!--            </v-list-item-action>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
      </v-col>

      <!--This is the Approve Engagement list      -->
      <v-col cols="12" md="8" class="red">
        <span> test 2 </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    test: false,
    engagements: [
      {
        engagement: 'Lunch meeting',
        who: 'Jonny Rose',
        when: '11:30am',
        where: 'Groton Town House',
        completed: false
      },
      {
        engagement: 'Dinner meeting',
        who: 'Alexis Rose',
        when: '4:00pm',
        where: 'Bdubs',
        completed: false
      },
      {
        engagement: 'Rose drugs',
        who: 'David Rose',
        when: '1:00pm',
        where: 'Groton Town House',
        completed: false
      },
      {
        engagement: 'Concer',
        who: 'Moria Rose',
        when: '9:00pm',
        where: 'Syndey Opera House',
        completed: false
      },
      {
        engagement: 'Lunch meeting',
        who: 'Jonny Rose',
        when: '11:30am',
        where: 'Groton Town House',
        completed: false
      },
      {
        engagement: 'Dinner meeting',
        who: 'Alexis Rose',
        when: '4:00pm',
        where: 'Bdubs',
        completed: false
      },
      {
        engagement: 'Rose drugs',
        who: 'David Rose',
        when: '1:00pm',
        where: 'Groton Town House',
        completed: false
      },
      {
        engagement: 'Concer',
        who: 'Moria Rose',
        when: '9:00pm',
        where: 'Syndey Opera House',
        completed: false
      },
    ]
  }),
}

</script>

<style scoped>

.listItem:hover {
  background:lightgray;
}
</style>
