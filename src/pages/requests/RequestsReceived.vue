<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="store.hasRequests">
          <request-item
            v-for="request in store.requests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          >
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { useRequestsStore } from '../../stores/requests';
import RequestItem from '../../components/requests/RequestItem.vue';
import { onMounted, ref } from 'vue';
const store = useRequestsStore();
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  isLoading.value = true;

  try {
    await store.loadRequests();
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
  } finally {
    isLoading.value = false;
  }
});

const handleError = () => {
  error.value = null;
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
