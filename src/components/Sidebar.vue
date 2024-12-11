<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useMarkdown } from '../composables/useMarkdown';
import type { ProjectPage } from '../types';

const route = useRoute();
const { projects } = useProjects();

const currentProject = computed(() => {
  const id = parseInt(route.params.id as string, 10);
  return projects.value.find(p => p.id === id);
});

const currentPage = computed(() => {
  const pageId = route.query.page as string || 'overview';
  return currentProject.value?.pages.find(p => p.id === pageId);
});

const pageHeadings = ref(new Map());

const { headings } = useMarkdown(computed(() => currentPage.value?.path || ''));

const navigationItems = computed(() => {
  if (!currentProject.value) return [];
  
  return currentProject.value.pages.map(page => ({
    ...page,
    children: page.id === currentPage.value?.id ? headings.value : []
  }));
});

function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <nav class="sidebar">
    <div class="nav-items">
      <!-- Project title -->
      <div class="project-title">
        {{ currentProject?.title }}
      </div>

      <!-- Navigation items -->
      <div class="nav-section">
        <template v-for="page in navigationItems" :key="page.id">
          <router-link 
            :to="{ 
              path: currentProject?.detailUrl || '/', 
              query: { page: page.id }
            }"
            class="nav-link"
            :class="{ 'active': currentPage?.id === page.id }"
          >
            {{ page.title }}
          </router-link>
          
          <template v-if="page.children && page.children.length > 0">
            <div 
              v-for="heading in page.children"
              :key="heading.id"
              class="nav-link heading"
              :class="{ 
                'heading-2': heading.level === 2, 
                'heading-3': heading.level === 3 
              }"
              @click="scrollToHeading(heading.id)"
            >
              {{ heading.text }}
            </div>
          </template>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #E6E6FA;
  border-right: 1px solid #D8D8FF;
  padding: 5rem 0 2rem;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
}

.project-title {
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #D8D8FF;
  margin-bottom: 1rem;
  white-space: normal;
  line-height: 1.4;
}

.nav-items {
  display: flex;
  flex-direction: column;
}

.nav-section {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
}

.nav-link:hover {
  color: #000;
}

.nav-link.active {
  color: #000;
  font-weight: 500;
}

.nav-link.child {
  padding-left: 2.5rem;
}

.nav-link.heading {
  padding-left: 2.5rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
}

.nav-link.heading:hover {
  color: #000;
}

.nav-link.heading-2 {
  padding-left: 2.5rem;
}

.nav-link.heading-3 {
  padding-left: 3rem;
}
</style>