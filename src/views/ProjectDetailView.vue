<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useMarkdown } from '../composables/useMarkdown';
import HomeButton from '../components/HomeButton.vue';
import Sidebar from '../components/Sidebar.vue';

const route = useRoute();
const { projects } = useProjects();

const project = computed(() => {
  const id = parseInt(route.params.id as string, 10);
  return projects.value.find(p => p.id === id);
});

const currentPage = computed(() => {
  const pageId = route.query.page as string || 'overview';
  return project.value?.pages.find(p => p.id === pageId);
});

const { content, isLoading, error } = useMarkdown(computed(() => currentPage.value?.path || ''));
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
          <div v-else v-html="content" class="markdown-body"></div>
        </div>
        <div v-else class="not-found">
          <h1>Project Not Found</h1>
          <router-link to="/">Return to Home</router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Global markdown styles */
.markdown-body {
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  padding-bottom: 2rem;
}

.markdown-body h1 {
  font-size: 2em;
  margin: 0.67em 0;
  font-weight: 600;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-body h2 {
  font-size: 1.5em;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-body h3 {
  font-size: 1.25em;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
  margin-bottom: 16px;
}

.markdown-body pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body ul {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body li {
  margin-top: 0.25em;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}
</style>

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