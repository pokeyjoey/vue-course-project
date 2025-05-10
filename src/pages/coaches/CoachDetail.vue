<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ coach.rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in coach.areas"
          :key="area"
          :title="area"
        ></base-badge>
        <p>{{ coach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import { useCoachesStore } from '../../stores/coaches';
import { useRoute } from 'vue-router';
const props = defineProps(['id']);
const store = useCoachesStore();
const coach = ref(store.getCoach(props.id));
const route = useRoute();

const contactLink = computed(() => {
  return `${route.path}/contact`;
});

const fullName = computed(
  () => `${coach.value.firstName} ${coach.value.lastName}`
);
</script>

<style></style>
