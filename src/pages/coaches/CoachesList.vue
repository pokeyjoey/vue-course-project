<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :coach="coach"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCoachesStore } from '../../stores/coaches';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const store = useCoachesStore();

const error = ref(null);
const isLoading = ref(false);
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

onMounted(() => {
  loadCoaches();
});

const loadCoaches = async (forceLoad = false) => {
  isLoading.value = true;

  try {
    await store.loadCoaches(forceLoad);
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
  } finally {
    isLoading.value = false;
  }
};

const filteredCoaches = computed(() => {
  // keynames for selected areas
  const desired = Object.keys(activeFilters.value).filter(
    (k) => activeFilters.value[k]
  );

  // return coaches where any of their areas match the desired areas
  return store.coaches.filter((coach) => {
    return desired.some((k) => coach.areas.includes(k));
  });
});

const hasCoaches = computed(() => {
  return !isLoading.value && store.hasCoaches;
});

const isCoach = computed(() => {
  return store.isCoach();
});

const setFilters = (filters) => {
  activeFilters.value = filters;
};

const handleError = () => {
  error.value = null;
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
