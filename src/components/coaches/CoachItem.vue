<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in coach.areas"
        :key="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="contactLink" mode="outline">Contact</base-button>
      <base-button link :to="detailLink">View Details</base-button>
    </div>
  </li>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['coach']);
const route = useRoute();

const fullName = computed(() => {
  return `${props.coach.firstName} ${props.coach.lastName}`;
});

const detailLink = computed(() => {
  return `${route.path}/${props.coach.id}`;
});
const contactLink = computed(() => {
  return `${route.path}/${props.coach.id}/contact`;
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
