<script setup lang="ts">
</script>

<template>
  <router-link to="/" class="home-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    Home
  </router-link>
</template>

<style scoped>
.home-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: #495057;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
}

.home-button:hover {
  color: #212529;
}

.home-button svg {
  width: 20px;
  height: 20px;
}
</style>