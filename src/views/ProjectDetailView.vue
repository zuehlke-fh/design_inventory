<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useMarkdown } from '../composables/useMarkdown';
import HomeButton from '../components/HomeButton.vue';
import Sidebar from '../components/Sidebar.vue';

const props = defineProps<{
  id: number;
  page: string;
}>();

const route = useRoute();
const router = useRouter();
const { projects } = useProjects();

const project = computed(() => {
  return projects.value.find(p => p.id === props.id);
});

const currentPage = computed(() => {
  return project.value?.pages.find(p => p.id === props.page);
});

const { content, isLoading, error, reload } = useMarkdown(computed(() => currentPage.value?.path || ''));

// Watch for route changes to reload content
watch(
  () => route.fullPath,
  () => {
    if (currentPage.value?.path) {
      reload();
    }
  }
);
</script>

<template>
  <div class="project-detail-page">
    <HomeButton />
    <div class="content-wrapper">
      <Sidebar />
      <main class="main-content">
        <div v-if="project" class="markdown-content">
          <div v-if="isLoading" class="loading">Loading...</div>
          <div v-else-if="error" class="error">
            Failed to load content: {{ error.message }}
          </div>
          <div v-else-if="content" v-html="content" class="markdown-body"></div>
          <div v-else class="not-found">
            <h1>Content Not Found</h1>
            <p>The requested page could not be found.</p>
            <router-link :to="{ name: 'project-detail', params: { id: project.id } }">
              Return to Project Overview
            </router-link>
          </div>
        </div>
        <div v-else class="not-found">
          <h1>Project Not Found</h1>
          <router-link to="/">Return to Home</router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
}

.content-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  overflow-y: auto;
  height: 100vh;
  box-sizing: border-box;
}

.markdown-content {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 3rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}

.not-found {
  text-align: center;
  padding: 4rem;
}

.not-found a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #E6E6FA;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
}

.not-found a:hover {
  background: #D8D8FF;
}
</style>