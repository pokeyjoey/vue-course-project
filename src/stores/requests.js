import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useCoachesStore } from './coaches';

export const useRequestsStore = defineStore('requests', () => {
  const _requests = ref([]);
  const coachesStore = useCoachesStore();
  let loadedFromStorage = false;

  const requests = computed(() => {
    return _requests.value.filter((r) => r.coachId == coachesStore.userId);
  });

  const hasRequests = computed(() => {
    return requests.value.length > 0;
  });

  const addRequest = async (request) => {
    const newRequest = {
      email: request.email,
      message: request.message,
    };

    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/requests/${request.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send request.');
    }

    _requests.value.push({
      id: result.name,
      coachId: request.coachId,
      ...newRequest,
    });
  };

  const loadRequests = async () => {
    if (loadedFromStorage) {
      return;
    }

    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/requests/${coachesStore.userId}.json`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load requests.');
    }

    const storedRequests = Object.entries(result);
    _requests.value = storedRequests.map(([id, request]) => ({
      id,
      coachId: coachesStore.userId,
      ...request,
    }));
    loadedFromStorage = true;
  };

  return { requests, addRequest, loadRequests, hasRequests };
});
