<script setup lang="ts">
import { ref } from 'vue';
import ProjectTile from './ProjectTile.vue';
import ProjectModal from './ProjectModal.vue';
import { useProjects } from '../composables/useProjects';
import type { Project } from '../types';

const selectedProject = ref<Project | null>(null);
const { projects } = useProjects();

const openModal = (project: Project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};
</script>

<template>
<div class="project-grid">
  <ProjectTile 
    v-for="project in projects" 
    :key="project.id" 
    :project="project" 
    @click="openModal(project)"
  />
</div>
<ProjectModal 
  v-if="selectedProject" 
  :project="selectedProject" 
  @close="closeModal"
/>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-auto-rows: 20vw;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  line-height: 0;
  font-size: 0;
  gap: 0;
}

@media (max-width: 1200px) {
  .project-grid {
    grid-template-columns: repeat(4, 25vw);
    grid-auto-rows: 25vw;
  }
}

@media (max-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(3, 33.333vw);
    grid-auto-rows: 33.333vw;
  }
}

@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: repeat(2, 50vw);
    grid-auto-rows: 50vw;
  }
}
</style>