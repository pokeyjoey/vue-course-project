<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="firstName.val" />
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastName.val" />
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
      ></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !rate.valid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.val" />
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['add-coach']);

const firstName = ref({ val: '', valid: true });
const lastName = ref({ val: '', valid: true });
const description = ref({ val: '', valid: true });
const rate = ref({ val: '', valid: true });
const areas = ref({ val: [], valid: true });

const validateForm = () => {
  let formIsValid = true;

  // reset validity each time we check
  [firstName, lastName, description, rate, areas].forEach((field) => {
    field.value.valid = true;
  });

  // any empty fields ?
  [firstName, lastName, description, rate].forEach((field) => {
    if (field.value.val === '') {
      formIsValid = field.value.valid = false;
    }
  });

  if (rate.value.val < 0) {
    formIsValid = rate.value.valid = false;
  }

  if (areas.value.val.length === 0) {
    formIsValid = areas.value.valid = false;
  }

  return formIsValid;
};

const submitForm = () => {
  const isValid = validateForm();

  if (isValid) {
    const formData = {
      firstName: firstName.value.val,
      lastName: lastName.value.val,
      description: description.value.val,
      rate: rate.value.val,
      areas: areas.value.val,
    };
    emit('add-coach', formData);
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
