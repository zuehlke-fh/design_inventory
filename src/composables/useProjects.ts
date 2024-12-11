import { ref } from 'vue';
import type { Project } from '../types/project';
import { projects as projectsData } from '../data/projects';

export function useProjects() {
  const projects = ref<Project[]>(projectsData);

  return {
    projects
  };
}