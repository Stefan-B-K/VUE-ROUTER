<template>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :user="user">

    </user-item>
  </ul>
  <button @click="saveChanges">Save Changes</button>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['users'],
  data () {
    return {
      changesSaved: false              // dummy
    };
  },
  methods: {
    saveChanges () {
      this.changesSaved = true;      //  dummy
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from);
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log(to, from);
    if (this.changesSaved) next();
    else {
      const userChoice = confirm('Are you sure? Changes not saved!');
      next(userChoice);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>