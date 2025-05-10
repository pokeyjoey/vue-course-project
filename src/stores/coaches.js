import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCoachesStore = defineStore('coaches', () => {
  const coaches = ref([]);
  const userId = ref('c3');
  let loadedFromStorage = false;

  const hasCoaches = computed(() => coaches.value.length > 0);

  const isCoach = () => {
    return coaches.value.some((coach) => coach.id == userId.value);
  };

  const getCoach = (id) => {
    return coaches.value.find((coach) => coach.id == id) || {};
  };

  const addCoach = async (coach) => {
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/coaches/${userId.value}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coach),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Failed to store new coach.');
    }

    coaches.value.push({ id: userId.value, ...coach });
  };

  const loadCoaches = async (forceLoad = false) => {
    if (loadedFromStorage && !forceLoad) {
      return;
    }

    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/coaches.json`
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load coaches.');
    }

    const storedCoaches = Object.entries(result);
    coaches.value = storedCoaches.map(([id, coach]) => ({ id, ...coach }));
    loadedFromStorage = true;
  };

  return {
    coaches,
    hasCoaches,
    addCoach,
    getCoach,
    loadCoaches,
    isCoach,
    userId,
  };
});
