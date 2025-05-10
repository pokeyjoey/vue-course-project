<template>
  <base-card>
    <h2>Register as a coach now!</h2>
    <coach-form @add-coach="addCoach"></coach-form>
  </base-card>
</template>

<script setup>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { useCoachesStore } from '../../stores/coaches.js';
import { useRouter } from 'vue-router';

const store = useCoachesStore();
const router = useRouter();

const addCoach = (coach) => {
  store.addCoach({
    firstName: coach.firstName,
    lastName: coach.lastName,
    rate: coach.rate,
    description: coach.description,
    areas: coach.areas,
  });

  router.replace('/coaches');
};
</script>

<style></style>
