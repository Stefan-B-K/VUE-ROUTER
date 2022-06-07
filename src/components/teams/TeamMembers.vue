<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for='member in members'
        :key='member.id'
        :user='member'>
      </user-item>
    </ul>
    <router-link to='/teams/t2'>Go to Team2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['teams', 'users'],
  components: {
    UserItem
  },
  props: ['teamID'],
  data () {
    return {
      teamName: '',
      members: []
    };
  },
  methods: {
    loadTeamMembers (teamID) {
      const selectedTeam = this.teams.find(team => team.id === teamID);
      const membersIDs = selectedTeam.members;
      this.members = [];
      for (const memberID of membersIDs) {
        const selectedUser = this.users.find(user => user.id === memberID);
        this.members.push(selectedUser);
      }
      this.teamName = selectedTeam.name;
    }
  },
  created () {
    // this.loadTeamMembers(this.$route)
    this.loadTeamMembers(this.teamID);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    next()
  },
  watch: {
    // $route (newRoute) {
    teamID (newID) {
      // if (newRoute.path.indexOf('/teams/t') > -1)  this.loadTeamMembers(newRoute)
      this.loadTeamMembers(newID);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>